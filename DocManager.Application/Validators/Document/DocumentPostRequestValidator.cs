using FluentValidation;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Document.Request;

namespace DocManager.Application.Validators
{
    public class DocumentPostRequestValidator : AbstractValidator<DocumentPostRequest>
    {
        public DocumentPostRequestValidator(DocumentRepository repository
                                            )
        {

            RuleFor(document => document.Title)
                .Must(title => !string.IsNullOrEmpty(title))
                .WithMessage(DocManagerErrors.Product_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty.Description());
        }
    }
}
