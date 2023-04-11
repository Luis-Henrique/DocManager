using DocManager.Application.Contracts.Product.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        /*
        [HttpPost("getById")]
        public async Task<IActionResult> Post([FromBody] ProductPostRequest request)
        {
            var response = await _productService.PostAsync(request);
            return Utils.Convert(response);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Post([FromBody] ProductPostRequest request)
        {
            var response = await _productService.PostAsync(request);
            return Utils.Convert(response);
        }*/
    }
}
