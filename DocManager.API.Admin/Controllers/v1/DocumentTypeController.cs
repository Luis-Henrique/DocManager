using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;
using DocManager.Application.Contracts.DocumentType.Request;

namespace DocManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DocumentTypeController
    {
        private readonly DocumentTypeService _documentTypeService;
        public DocumentTypeController(DocumentTypeService repository)
        {
            this._documentTypeService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] DocumentTypePostRequest request)
        {
            var response = await _documentTypeService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] DocumentTypePutRequest request)
        {
            var response = await _documentTypeService.PutAsync(request);
            return Utils.Convert(response);
        }
        
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _documentTypeService.DeleteAsync(id);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] DocumentTypeGetFilterRequest request)
        {
            var response = await _documentTypeService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _documentTypeService.GetByIdAsync(id);
            return Utils.Convert(response);
        }
    }
}
