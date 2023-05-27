using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;
using DocManager.Application.Contracts.DocumentPartners.Request;

namespace DocManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DocumentPartnersController
    {
        private readonly DocumentPartnersService _documentPartnersService;
        public DocumentPartnersController(DocumentPartnersService repository)
        {
            this._documentPartnersService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] DocumentPartnersPostRequest request)
        {
            var response = await _documentPartnersService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] DocumentPartnersPutRequest request)
        {
            var response = await _documentPartnersService.PutAsync(request);
            return Utils.Convert(response);
        }

        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _documentPartnersService.DeleteAsync(id);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] DocumentPartnersGetFilterRequest request)
        {
            var response = await _documentPartnersService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _documentPartnersService.GetByIdAsync(id);
            return Utils.Convert(response);
        }
    }
}
