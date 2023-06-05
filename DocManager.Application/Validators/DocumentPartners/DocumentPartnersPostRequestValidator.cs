using FluentValidation;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.DocumentPartners.Request;


namespace DocManager.Application.Validators
{
    public class DocumentPartnersPostRequestValidator : AbstractValidator<DocumentPartnersPostRequest>
    {
        public DocumentPartnersPostRequestValidator(DocumentPartnersRepository repository)
        {
            RuleFor(contract => contract.Name)
                 .Must(_name => !string.IsNullOrEmpty(_name))
                 .WithMessage(DocManagerErrors.documentPartners_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.Description)
              .Must(_Description => !string.IsNullOrEmpty(_Description))
              .WithMessage(DocManagerErrors.documentPartners_Post_BadRequest_Description_Cannot_Be_Null_Or_Empty.Description());

            RuleFor(contract => contract.Name)
              .Must(_name => _name.Length <= 35)
              .WithMessage(DocManagerErrors.documentPartners_Post_BadRequest_Title_Is_Too_long.Description());

            RuleFor(contract => contract.Description)
               .Must(_Description => _Description.Length <= 50)
               .WithMessage(DocManagerErrors.documentPartners_Post_BadRequest_Description_Is_Too_long.Description());
        }   
    }
}