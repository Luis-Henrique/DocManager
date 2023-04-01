using FluentValidation;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Product.Request;

namespace DocManager.Application.Validators
{
    public class DocumentPostRequestValidator : AbstractValidator<DocumentPostRequest>
    {
       
    }
}
