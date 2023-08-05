using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using DocManager.Application.Data.MySql.Entities;
using Microsoft.AspNetCore.Identity;
using MySqlX.XDevAPI.Relational;

namespace DocManager.API.Admin.Controllers.v1
{
    [AllowAnonymous]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AccountController
    {
        private readonly UserService _userService;
        private readonly EmailService _emailService;
        private readonly IConfiguration _configuration;
        
        public AccountController(UserService service, EmailService emailService, IConfiguration configuration)
        {
            this._userService = service;
            this._emailService = emailService;
            this._configuration = configuration;
        }

        [HttpPost("create-account")]
        public async Task<IActionResult> Post([FromBody] UserPostRequest request)
        {
            var response = await _userService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromBody] UserPostLoginRequest request)
        {
            var response = await _userService.PostLoginAsync(request);
            return Utils.Convert(response);
        }

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _userService.GetByEmail(email);

            if (user == null)
            {
                return Utils.Convert(new ResultData(email, false));
            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ForgetPasswordToken = emailToken;
            user.ForgetPasswordExpiration = DateTime.Now.AddMinutes(15).ToString("yyyy-MM-dd HH:mm:ss");

            string from = _configuration["EmailSettings:From"];
            var emailEntity = new EmailEntity(email, "reset password", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailEntity);
            _userService.PutAsync(user);
            return Utils.Convert(new ResultData(user, true));
        }

        [HttpPut("reset-email")]
        public async Task<IActionResult> ResetPassword([FromBody] UserPutResetPasswordRequest request)
        {
            var newToken = request.EmailToken.Replace(" ", "+");
            var user = await _userService.GetByEmail(request.Email);

            if (user == null)
            {
                return Utils.Convert(new ResultData(request, false));
            }

            var tokenCode = user.ForgetPasswordToken;
            var emailTokenExpiry = DateTime.Parse(user.ForgetPasswordExpiration);

            if(tokenCode != newToken || emailTokenExpiry < DateTime.Now)
            {
                return Utils.Convert(new ResultData(request, false));
            }

            user.Password = request.NewPassword;

            _userService.PutPasswordAsync(user);
            _userService.ClearUserAsync(user);
            return Utils.Convert(new ResultData(request, true));
        }
    }
}
