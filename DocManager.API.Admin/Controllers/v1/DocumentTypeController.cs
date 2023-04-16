﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Contracts.Unity.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;
using DocManager.Application.Contracts.Product.Request;

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
        
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] DocumentTypeDeleteRequest request)
        {
            var response = await _documentTypeService.DeleteAsync(request);
            return Utils.Convert(response);
        }
        
        [HttpGetbyId("getById")]
        public async Task<IActionResult> GetById([FromBody] DocumentGetByIdRequest request)
        {
            var response = await _documentService.GetByIdAsync(request);
            return Utils.Convert(response);
        }
    }
}
