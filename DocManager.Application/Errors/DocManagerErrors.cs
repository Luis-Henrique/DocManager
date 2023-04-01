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



        #region Unity
        [Description("É necessário informar o nome da unidade de medida")]
        Unity_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar se a unidade é ativa ou inativa")]
        Unity_Post_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,
        [Description("Já existe uma unidade de medida com esse nome")]
        Unity_Post_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("É necessário informar o id da unidade de medida")]
        Unity_Put_BadRequest_Id_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar o nome da unidade de medida")]
        Unity_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar se a unidade é ativa ou inativa")]
        Unity_Put_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,
        [Description("Já existe uma unidade de medida com esse nome")]
        Unity_Put_BadRequest_Name_Cannot_Be_Duplicated,
        [Description("Unidade de medida inválida ou inexistente")]
        Unity_Put_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Unidade de medida inexistente ou inválida")]
        Unity_Get_BadRequest_Id_Is_Invalid_Or_Inexistent,
        [Description("É necessário informar o nome para o filtro")]
        Unity_Get_BadRequest_Name_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar o filtro de ativos ou inativos")]
        Unity_Get_BadRequest_Active_Cannot_Be_Empty,
        [Description("É necessário informar a pagina maior que zero")]
        Unity_Get_BadRequest_Page_More_Than_Zero,
        [Description("É necessário informar o tamanho da pagina maior que zero")]
        Unity_Get_BadRequest_pageSize_More_Than_Zero,
        [Description("Unidade de medida inválida ou inexistente")]
        Unity_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Unidade de medida esta relacionada à {0} produto(s)")]
        Unity_Delete_BadRequest_Id_Gave_Dependence,

        #endregion


        #region ProductType
        [Description("É necessário informar o nome dp tipo de produto")]
        ProductType_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar se o tipo de produto é ativo ou inativo")]
        ProductType_Post_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,

        [Description("Já existe um tipo de produto com esse nome")]
        ProductType_Post_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("É necessário informar o id dp tipo de produto")]
        ProductType_Put_BadRequest_Id_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar o nome do tipo de produto")]
        ProductType_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar se o tipo de produto é ativo ou inativo")]
        ProductType_Put_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,

        [Description("Já existe um tipo de produto com esse nome")]
        ProductType_Put_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("Tipo de produto inválido ou inexistente")]
        ProductType_Put_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Tipo de produto inválida ou inexistente")]
        ProductType_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Tipo de produto inválida ou inexistente")]
        ProductType_Get_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("É necessário informar o nome para o filtro")]
        ProductType_Get_BadRequest_Name_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar o filtro de ativos ou inativos")]
        ProductType_Get_BadRequest_Active_Cannot_Be_Empty,
        [Description("É necessário informar a pagina maior que zero")]
        ProductType_Get_BadRequest_Page_More_Than_Zero,
        [Description("É necessário informar o tamanho da pagina maior que zero")]
        ProductType_Get_BadRequest_pageSize_More_Than_Zero,

        #endregion

        #region Category
        [Description("É necessário informar o nome da Categoria")]
        Category_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar se a Categoria é ativa ou inativa")]
        Category_Post_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,

        [Description("Já existe uma Categoria com esse nome")]
        Category_Post_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("É necessário informar o id da Categoria")]
        Category_Put_BadRequest_Id_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar o nome da Categoria")]
        Category_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("É necessário informar se a Categoria é ativo ou inativo")]
        Category_Put_BadRequest_Active_Cannot_Be_Diferent_True_Or_False,

        [Description("Já existe uma Categoria com esse nome")]
        Category_Put_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("Categoria inválida ou inexistente")]
        Category_Put_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Categoria inválida ou inexistente")]
        Category_Delete_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("Categoria inválida ou inexistente")]
        Category_Get_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("É necessário informar o nome para o filtro")]
        Category_Get_BadRequest_Name_Cannot_Be_Null_Or_Empty,
        [Description("É necessário informar o filtro de ativos ou inativos")]
        Category_Get_BadRequest_Active_Cannot_Be_Empty,
        [Description("É necessário informar a pagina maior que zero")]
        Category_Get_BadRequest_Page_More_Than_Zero,
        [Description("É necessário informar o tamanho da pagina maior que zero")]
        Category_Get_BadRequest_pageSize_More_Than_Zero,
        #endregion


        #region Product

        [Description("Objeto de produto não esta no padrão correto")] 
        Product_Post_BadRequest_Contract_Cannot_Be_Null,

        [Description("Produto não localizado pelo id informado")]
        Product_Get_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("É necessário informar o nome do produto")]
        Product_Post_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("Já existe um produto com esse nome")]
        Product_Post_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("É necessário informar o codigo do produto")]
        Product_Post_BadRequest_ProductCode_Cannot_Be_Null_Or_Empty,

        [Description("Ja existe um codigo de produto cadastrado com esse mesmo codigo")]
        Product_Post_BadRequest_ProductCode_Cannot_Be_Duplicated,

        [Description("É necessário informar um tipo de produto válido")]
        Product_Post_BadRequest_ProductTypeId_Cannot_Be_Null_Empty_Or_Invalid,

        [Description("É necessário informar uma unidade de medida válida")]
        Product_Post_BadRequest_UnityId_Cannot_Be_Null_Empty_Or_Invalid,

        [Description("É necessário informar uma categoria válida")]
        Product_Post_BadRequest_CategoryId_Cannot_Be_Null_Empty_Or_Invalid,


        [Description("É necessário informar o preço de custo")]
        Product_Post_BadRequest_CostPrice_Must_Be_Greater_Than_Zero,

        [Description("É necessário informar o preço que corresponda o calculo : preço de custo + (preço de custo * percentage)/100")]
        Product_Post_BadRequest_Price_Must_Be_Exact,

        [Description("Objeto de produto não esta no padrão correto")]
        Product_Put_BadRequest_Contract_Cannot_Be_Null,


        [Description("É necessário informar o id do produto")]
        Product_Put_BadRequest_Id_Cannot_Be_Null_Or_Empty,

        [Description("Produto não localizado com esse identificador")]
        Product_Put_BadRequest_Id_Is_Invalid_Or_Inexistent,

        [Description("É necessário informar o nome do produto")]
        Product_Put_BadRequest_Name_Cannot_Be_Null_Or_Empty,

        [Description("Já existe um produto com esse nome")]
        Product_Put_BadRequest_Name_Cannot_Be_Duplicated,

        [Description("É necessário informar o codigo do produto")]
        Product_Put_BadRequest_ProductCode_Cannot_Be_Null_Or_Empty,

        [Description("Ja existe um codigo de produto cadastrado com esse mesmo codigo")]
        Product_Put_BadRequest_ProductCode_Cannot_Be_Duplicated,

        [Description("É necessário informar um tipo de produto válido")]
        Product_Put_BadRequest_ProductTypeId_Cannot_Be_Null_Empty_Or_Invalid,

        [Description("É necessário informar uma unidade de medida válida")]
        Product_Put_BadRequest_UnityId_Cannot_Be_Null_Empty_Or_Invalid,

        [Description("É necessário informar uma categoria válida")]
        Product_Put_BadRequest_CategoryId_Cannot_Be_Null_Empty_Or_Invalid,

        [Description("É necessário informar o preço de custo")]
        Product_Put_BadRequest_CostPrice_Must_Be_Greater_Than_Zero,

        [Description("É necessário informar o preço que corresponda o calculo : preço de custo + (preço de custo * percentage)/100")]
        Product_Put_BadRequest_Price_Must_Be_Exact,

        [Description("É necessário informar o filtro de ativos ou inativos")]
        Product_Get_BadRequest_Active_Cannot_Be_Empty,
        [Description("É necessário informar a pagina maior que zero")]
        Product_Get_BadRequest_Page_More_Than_Zero,
        [Description("É necessário informar o tamanho da pagina maior que zero")]
        Product_Get_BadRequest_pageSize_More_Than_Zero,

        #endregion


    }
}
