using FluentValidation;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Document.Request;
using System.Diagnostics.Contracts;
using Microsoft.VisualBasic;
using System;

namespace DocManager.Application.Validators
{
    public class DocumentsPostRequestValidator : AbstractValidator<DocumentPostRequest>
    {
        public DocumentsPostRequestValidator(DocumentRepository repository)
        {
            RuleFor(contract => contract.Title)
               .Must(_title => !string.IsNullOrEmpty(_title))
               .WithMessage(DocManagerErrors.documents_Post_BadRequest_Title_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.Title)
               .Must(_title => _title.Length <= 35)
               .WithMessage(DocManagerErrors.documents_Post_BadRequest_Title_Is_Too_long.Description());

            RuleFor(contract => contract.Description)
               .Must(_Description => !string.IsNullOrEmpty(_Description))
               .WithMessage(DocManagerErrors.documents_Post_BadRequest_Description_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.Description)
               .Must(_Description => _Description.Length <= 50)
               .WithMessage(DocManagerErrors.documents_Post_BadRequest_Description_Is_Too_long.Description());

            RuleFor(contract => contract.DocumentTypeId)
                .Must(_documentTypeId => !string.IsNullOrEmpty(_documentTypeId))
                .WithMessage(DocManagerErrors.documents_Post_BadRequest_DocumentTypeId_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.DocumentPartnersId)
                .Must(_documentPartnersId => !string.IsNullOrEmpty(_documentPartnersId))
                .WithMessage(DocManagerErrors.documents_Post_BadRequest_DocumentPartnersId_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.Validity)
               .Must(_validity => !string.IsNullOrEmpty(_validity))
               .WithMessage(DocManagerErrors.documents_Post_BadRequest_Validity_Cannot_Be_Null_Or_Empty.Description());

            //[Description("A data de vigência deve ser posterior a data de hoje")]
            //documents_Post_BadRequest_Validity_Cannot_Be_Earlier,

            RuleFor(contract => contract.Url)
                .Must(_url => !string.IsNullOrEmpty(_url))
                .WithMessage(DocManagerErrors.documents_Post_BadRequest_Url_Cannot_Be_Null_Or_Empty.Description());

            /*
            [Description("É necessário colocar a url do documento")]
            documents_Post_BadRequest_Url_Cannot_Be_Null_Or_Empty,
            [Description("Url inválida")]
            documents_Post_BadRequest_Url_Cannot_Be_invalidate,

            [Description("É necessário informar se o documento está ativo ou inativo")]
            documents_Put_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,
            
            [Description("O documento é inválido ou inexistente")]
            documents_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent,
            */
        }
    }
}
