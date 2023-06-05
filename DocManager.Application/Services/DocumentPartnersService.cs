using DocManager.Application.Contracts.DocumentPartners.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Validators;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Services
{
    public class DocumentPartnersService
    {
        private readonly DocumentPartnersRepository _documentPartnersRepository;
        public DocumentPartnersService(DocumentPartnersRepository documentPartnersRepository)
        {
            this._documentPartnersRepository = documentPartnersRepository;
        }
        public async Task<ResultData> PostAsync(DocumentPartnersPostRequest documentPartners)
        {
            var validator = new DocumentPartnersPostRequestValidator(_documentPartnersRepository);
            var validationResult = validator.Validate(documentPartners);

            if (!validationResult.IsValid)
            {
                return Utils.ErrorData(validationResult.Errors.ToErrorList());
            }

            var entity = new DocumentPartnersEntity(documentPartners);
            return Utils.SuccessData(await _documentPartnersRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(DocumentPartnersPutRequest documentPartners)
        {
            var validator = new DocumentPartnersPutRequestValidator(_documentPartnersRepository);
            var validationResult = validator.Validate(documentPartners);

            if (!validationResult.IsValid)
            {
                return Utils.ErrorData(validationResult.Errors.ToErrorList());
            }

            var entity = new DocumentPartnersEntity(documentPartners);
            return Utils.SuccessData(await _documentPartnersRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var response = await _documentPartnersRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetByIdAsync(Guid id)
        {
            var response = await _documentPartnersRepository.DocumentPartnersGetByIdAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetFilterAsync(DocumentPartnersGetFilterRequest document)
        {
            var response = await _documentPartnersRepository.GetDocumentPartnersByFiltersync(document);
            return Utils.SuccessData(response);
        }
    }
}

