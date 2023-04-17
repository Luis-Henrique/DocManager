using DocManager.Application.Contracts.Document.Request;
using DocManager.Application.Contracts.DocumentType.Request;
using DocManager.Application.Contracts.Product.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace SysManager.API.Admin.Controllers.v1
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DocumentController
    {
        private readonly DocumentService _documentService;
        public DocumentController(DocumentService repository)
        {
            this._documentService = repository;
        }

        [HttpPost("insert")]
        public async Task<IActionResult> Post([FromBody] DocumentPostRequest request)
        {
            var response = await _documentService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] DocumentPutRequest request)
        {
            var response = await _documentService.PutAsync(request);
            return Utils.Convert(response);
        }
        
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var response = await _documentService.DeleteAsync(id);
            return Utils.Convert(response);
        }

        [HttpGet("getbyfilter")]
        public async Task<IActionResult> GetByfilter([FromQuery] DocumentGetFilterRequest request)
        {
            var response = await _documentService.GetFilterAsync(request);
            return Utils.Convert(response);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var response = await _documentService.GetByIdAsync(id);
            return Utils.Convert(response);
        }
    }
}
