using FluentValidation;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Unity.Request;
using DocManager.Application.Contracts.DocumentType.Request;

namespace DocManager.Application.Validators
{
    public class DocumentTypePostRequestValidator: AbstractValidator<DocumentTypePostRequest>
    {
       
    }
}
