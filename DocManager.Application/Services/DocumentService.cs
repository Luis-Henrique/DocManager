using DocManager.Application.Contracts.Product.Request;
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
    public class DocumentService
    {
        private readonly DocumentRepository _documentRepository;
        public DocumentService(DocumentRepository documentRepository)
        {
            this._documentRepository = documentRepository;
        }

        public async Task<ResultData> PostAsync(DocumentPostRequest document)
        {
            var entity = new DocumentEntity(document);
            return Utils.SuccessData(await _documentRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(DocumentPutRequest document)
        {
            var entity = new DocumentEntity(document);
            return Utils.SuccessData(await _documentRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var response = await _documentRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }

        /*
        public async Task<ResultData> GetAsync(Guid id)
        {
            var response = await _productRepository.GetProductByIdAsync(id);
            return Utils.SuccessData(response);
        }
        public Task PutAsync(DocumentPostRequest request)
        {
            throw new NotImplementedException();
        }/*
    }
}
