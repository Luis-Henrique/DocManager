using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Contracts.Unity.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DocManager.Application.Data.MySql.Repositories
{
    public class DocumentTypeRepository
    {
        private readonly MySqlContext _context;

        public DocumentTypeRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }
        public async Task<DefaultResponse> CreateAsync(DocumentTypeEntity entity)
        {
            string strQuery = @$"insert into documentType(id)
                                          Values('{entity.Id}', '{entity.Name}','{entity.Active}','{entity.CreatedDate}','{entity.UpdatedDate}')";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar Documento", true);
        }
        public async Task<DefaultResponse> UpdateAsync(DocumentTypeEntity entity)
        {
            string strQuery = $@"update documentType set name = '{entity.Name}', 
                                                    active = {entity.Active},
                                                    createdDate = '{entity.CreatedDate}', 
                                                    updatedDate = '{entity.UpdatedDate}',
                                                    where id = '{entity.Id}'";

             using (var cnx = _context.Connection())
             {
                 var result = await cnx.ExecuteAsync(strQuery);

                 if (result > 0)
                     return new DefaultResponse(entity.Id.ToString(), "Documento alterado com sucesso", false);
             }

             return new DefaultResponse("", "Erro ao tentar alterada o documento", true);
         }/*

         public async Task<DefaultResponse> DeleteAsync(Guid id)
         {
             string strQuery = $"delete from product where id = '{id}'";
             using (var cnx = _context.Connection())
             {
                 var result = await cnx.ExecuteAsync(strQuery);
                 if (result > 0)
                     return new DefaultResponse(id.ToString(), "Produto excluída com sucesso", false);
             }
             return new DefaultResponse("", "Erro ao tentar excluír produto", true);
         }

         public async Task<ProductEntity> GetProductByIdAsync(Guid id)
         {
             string strQuery = $"select id, name, productCode, productTypeId, categoryId, unityId, costPrice, percentage, price, active from product where id = '{id}'";
             using (var cnx = _context.Connection())
             {
                 var result = await cnx.QueryFirstOrDefaultAsync<ProductEntity>(strQuery);
                 return result;
             }*/
        }
    }
}
