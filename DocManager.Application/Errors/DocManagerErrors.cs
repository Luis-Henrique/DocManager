using System.ComponentModel;

namespace DocManager.Application.Errors
{
    public enum DocManagerErrors
    {
            #region User
            [Description("Necessário informar a propriedade (Username)")]
            User_Post_BadRequest_UserName_Cannot_Be_Null_Or_Empty,

            [Description("Necessário informar a propriedade (Email)")]
            User_Post_BadRequest_Email_Cannot_Be_Null_Or_Empty,

            [Description("Necessário informar a propriedade (Password)")]
            User_Post_BadRequest_Password_Cannot_Be_Null_Or_Empty,

            [Description("Ja existe um usuário cadastraco com esse e-mail")]
            User_Post_BadRequest_Email_Cannot_Be_Duplicated,

            [Description("Usuário ou e-mail inválido ou inexistente")]
            User_Put_BadRequest_User_Not_Found,
            #endregion



            #region documentType
            [Description("É necessário colocar um nome para o tipo do documento")]
            documentType_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,
            [Description("É necessário colocar um nome para o tipo do documento")]
            documentType_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,

            [Description("Titulo muito longo, máximo 35 caracteres")]
            documentType_Post_BadRequest_Title_Is_Too_long,
            [Description("Titulo muito longo, máximo 35 caracteres")]
            documentType_Put_BadRequest_Title_Is_Too_long,

            [Description("É necessário colocar uma descrição para o documento")]
            documentType_Post_BadRequest_Description_Cannot_Be_Null_Or_Empty,
            [Description("É necessário colocar uma descrição para o documento")]
            documentType_Put_BadRequest_Description_Cannot_Be_Null_Or_Empty,

            [Description("Descrição muito longa, máximo 50 caracteres")]
            documentType_Post_BadRequest_Description_Is_Too_long,
            [Description("Descrição muito longa, máximo 50 caracteres")]
            documentType_Put_BadRequest_Description_Is_Too_long,

            [Description("Esse tipo de documento não pode ser excluído pois está sendo referenciado em um documento")]
            documentType_Delete_BadRequest_Name_This_document_type_cannot_be_deleted_as_it_is_being_referenced_in_a_document,

            #endregion

            #region documentPartners
            [Description("É necessário colocar o nome do associado")]
            documentPartners_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,
            [Description("É necessário colocar um nome para o tipo do documento")]
            documentPartners_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,

            [Description("É necessário colocar uma descrição para a parceria")]
            documentPartners_Post_BadRequest_Description_Cannot_Be_Null_Or_Empty,
            [Description("É necessário colocar uma descrição para o documento")]
            documentPartners_Put_BadRequest_Description_Cannot_Be_Null_Or_Empty,

            [Description("Titulo muito longo, máximo 35 caracteres")]
            documentPartners_Post_BadRequest_Title_Is_Too_long,
            [Description("Titulo muito longo, máximo 35 caracteres")]
            documentPartners_Put_BadRequest_Title_Is_Too_long,


            [Description("Descrição muito longa, máximo 50 caracteres")]
            documentPartners_Post_BadRequest_Description_Is_Too_long,
            [Description("Descrição muito longa, máximo 50 caracteres")]
            documentPartners_Put_BadRequest_Description_Is_Too_long,

            [Description("Esse tipo de documento não pode ser excluído pois está sendo referenciado em um documento")]
            documentPartners_Delete_BadRequest_Name_This_document_type_cannot_be_deleted_as_it_is_being_referenced_in_a_document,


        #endregion


        #region documents
        [Description("É necessário inserir um titulo para o documento")]
            documents_Post_BadRequest_Title_Cannot_Be_Null_Or_Empty,
            [Description("Titulo muito longo, máximo 35 caracteres")]
            documents_Post_BadRequest_Title_Is_Too_long,

            [Description("É necessário colocar uma descrição para o documento")]
            documents_Post_BadRequest_Description_Cannot_Be_Null_Or_Empty,
            [Description("Descrição muito longa, máximo 50 caracteres")]
            documents_Post_BadRequest_Description_Is_Too_long,


            [Description("É necessário selecionar o tipo do documento")]
            documents_Post_BadRequest_DocumentTypeId_Cannot_Be_Null_Or_Empty,

            [Description("É necessário selecionar o parceiro")]
            documents_Post_BadRequest_DocumentPartnersId_Cannot_Be_Null_Or_Empty,

            [Description("É necessário colocar a data de vigência do documento")]
            documents_Post_BadRequest_Validity_Cannot_Be_Null_Or_Empty,
            [Description("A data de vigência deve ser posterior a data de hoje")]
            documents_Post_BadRequest_Validity_Cannot_Be_Earlier,

            [Description("É necessário colocar a url do documento")]
            documents_Post_BadRequest_Url_Cannot_Be_Null_Or_Empty,
            [Description("Url inválida")]
            documents_Post_BadRequest_Url_Cannot_Be_invalidate,

            [Description("É necessário informar se o documento está ativo ou inativo")]
            documents_Put_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,
            
            [Description("O documento é inválido ou inexistente")]
            documents_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent,

            [Description("É necessário inserir um titulo para o documento")]
            documents_Put_BadRequest_Title_Cannot_Be_Null_Or_Empty,
            [Description("Titulo muito longo, máximo 35 caracteres")]
            documents_Put_BadRequest_Title_Is_Too_long,

            [Description("É necessário colocar uma descrição para o documento")]
            documents_Put_BadRequest_Description_Cannot_Be_Null_Or_Empty,
            [Description("Descrição muito longa, máximo 50 caracteres")]
            documents_Put_BadRequest_Description_Is_Too_long,


            [Description("É necessário selecionar o tipo do documento")]
            documents_Put_BadRequest_DocumentTypeId_Cannot_Be_Null_Or_Empty,

            [Description("É necessário selecionar o parceiro")]
            documents_Put_BadRequest_DocumentPartnersId_Cannot_Be_Null_Or_Empty,

            [Description("É necessário colocar a data de vigência do documento")]
            documents_Put_BadRequest_Validity_Cannot_Be_Null_Or_Empty,
            [Description("A data de vigência deve ser Puterior a data de hoje")]
            documents_Put_BadRequest_Validity_Cannot_Be_Earlier,

            [Description("É necessário colocar a url do documento")]
            documents_Put_BadRequest_Url_Cannot_Be_Null_Or_Empty,
            [Description("Url inválida")]
            documents_Put_BadRequest_Url_Cannot_Be_invalidate,

        #endregion

    }
}
