using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DocManager.Application.Contracts.Unity.Request;
using DocManager.Application.Helpers;
using DocManager.Application.Services;
using System;
using System.Threading.Tasks;

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


    }
}
