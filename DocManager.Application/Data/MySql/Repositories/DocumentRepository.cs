using Dapper;
using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using DocManager.Application.Contracts;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Product.Request;

namespace DocManager.Application.Data.MySql.Repositories
{
    public class DocumentRepository
    {
        private readonly MySqlContext _context;

        public DocumentRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }

        public async Task<DefaultResponse> CreateAsync(DocumentEntity entity)
        {
            string strQuery = @$"insert into document(id)
                                          Values('{entity.Id}')";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar Documento", true);
        }
        public async Task<DefaultResponse> UpdateAsync(ProductEntity entity)
        {
            string strQuery = $@"update product set name = '{entity.Name}', 
                                                    active = {entity.Active},
                                                    productCode = '{entity.ProductCode}', 
                                                    productTypeId = '{entity.ProductTypeId}',
                                                    categoryId = '{entity.CategoryId}',
                                                    unityId = '{entity.UnityId}', 
                                                    costPrice = {entity.CostPrice},
                                                    percentage = {entity.Percentage},
                                                    price = {entity.Price}
                                                    where id = '{entity.Id}'";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Produto alterado com sucesso", false);
            }

            return new DefaultResponse("", "Erro ao tentar alterada produto", true);
        }

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
            }
        }
    }
}
