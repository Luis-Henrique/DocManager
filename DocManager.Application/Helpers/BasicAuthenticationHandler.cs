using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Services;
using System;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace DocManager.Application.Helpers
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly UserService _userService;

        public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options,
           ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, UserService userService) : base(options, logger, encoder, clock)
        {
            this._userService = userService;
        }

        private bool ExpiredToken(string data)
        {
            if (data.Length < 14)
                return true;

            var year = data.Substring(0, 4);
            var month = data.Substring(4, 2);
            var day = data.Substring(6, 2);

            var hour = data.Substring(8, 2);
            var minutes = data.Substring(10, 2);
            var seconds = data.Substring(12, 2);

            var date = Convert.ToDateTime(year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds);
            if (DateTime.Now > date)
                return true;

            return false;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var endpoint = Context.GetEndpoint();

            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
                return AuthenticateResult.NoResult();

            if (!Request.Headers.ContainsKey("Authorization"))
                return AuthenticateResult.Fail("Missing Authorization Header");

            var user = new UserEntity();

            try
            {
                var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);

                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                var credentials = Encoding.UTF8.GetString(credentialBytes).Split(new[] { ':' }, 3);
                var username = credentials[0];
                var password = credentials[1];

                var authTokenBytes = Request.Headers["token"];
                var credentialToken = Convert.FromBase64String(authTokenBytes);
                var credentialsToken = Encoding.UTF8.GetString(credentialToken).Split(new[] { ':' }, 3);

                var tokenUserName = credentialsToken[0];
                var tokenPassWord = credentialsToken[1];
                var tokenExpired = credentialsToken[2];

                var isExpiredDate = ExpiredToken(tokenExpired);

                if (isExpiredDate)
                    return AuthenticateResult.Fail("Invalid or Expired Token");

                if (tokenUserName != username || tokenPassWord != password)
                    return AuthenticateResult.Fail("Invalid Username or Password");

                user = await _userService.Authenticate(username, password);
            }
            catch
            {
                return AuthenticateResult.Fail("Invalid Authorization Header");
            }

            if (user.Id == Guid.Empty || user == null)
                return AuthenticateResult.Fail("Invalid Username or Password");

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
            };

            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
