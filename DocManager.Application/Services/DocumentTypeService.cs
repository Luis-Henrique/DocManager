﻿using DocManager.Application.Contracts.DocumentType.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Services
{
    public class DocumentTypeService
    {
        private readonly DocumentTypeRepository _documentTypeRepository;
        public DocumentTypeService(DocumentTypeRepository documentTypeRepository)
        {
            this._documentTypeRepository = documentTypeRepository;
        }
        public async Task<ResultData> PostAsync(DocumentTypePostRequest documentType)
        {
            var entity = new DocumentTypeEntity(documentType);
            return Utils.SuccessData(await _documentTypeRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(DocumentTypePutRequest documentType)
        {
            var entity = new DocumentTypeEntity(documentType);
            return Utils.SuccessData(await _documentTypeRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var response = await _documentTypeRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetByIdAsync(Guid id)
        {
            var response = await _documentTypeRepository.DocumentTypeGetByIdAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetFilterAsync(DocumentTypeGetFilterRequest document)
        {
            var response = await _documentTypeRepository.GetDocumentTypeByFiltersync(document);
            return Utils.SuccessData(response);
        }
    }
}
