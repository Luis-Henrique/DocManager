using DocManager.Application.Contracts.GroupAutorization.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class GroupAutorizationController
    {
        private readonly GroupAutorizationService _groupAutorizationService;
        public GroupAutorizationController(GroupAutorizationService repository)
        {
            this._groupAutorizationService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] GroupAutorizationPostRequest request)
        {
            var response = await _groupAutorizationService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] GroupAutorizationPutRequest request)
        {
            var response = await _groupAutorizationService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _groupAutorizationService.DeleteAsync(id);
            return Utils.Convert(response);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _groupAutorizationService.GetAllAsync();
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _groupAutorizationService.GetByIdAsync(id);
            return Utils.Convert(response);
        }
    }
}
