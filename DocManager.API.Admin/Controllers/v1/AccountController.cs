using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;

namespace DocManager.API.Admin.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AccountController
    {
        private readonly UserService _userService;
        public AccountController(UserService service)
        {
            this._userService = service;
        }

        [HttpPost("create-account")]
        public async Task<IActionResult> Post([FromBody] UserPostRequest request)
        {
            var response = await _userService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("recovery-account")]
        public async Task<IActionResult> Put([FromBody] UserPutRequest request)
        {
            var response = await _userService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromBody] UserPostLoginRequest request)
        {
            var response = await _userService.PostLoginAsync(request);
            return Utils.Convert(response);
        }
    }
}
