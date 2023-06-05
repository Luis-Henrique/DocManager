using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Contracts.DocumentType.Request;
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
            int active = 0;

            if (entity.Active == true)
            {
                active = 1;
            }
            else
            {
                active = 0;
            }
            string strQuery = @$"insert into documentType(id, name, description, active)
                                          Values('{entity.Id}', '{entity.Name}', '{entity.Description}',{active})";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar documento", true);
        }
        public async Task<DefaultResponse> UpdateAsync(DocumentTypeEntity entity)
        {
            string strQuery = $@"update documentType set name = '{entity.Name}', 
                                                    description = '{entity.Description}',
                                                    active = {entity.Active}
                                                    where id = '{entity.Id}'";

             using (var cnx = _context.Connection())
             {
                 var result = await cnx.ExecuteAsync(strQuery);

                 if (result > 0)
                     return new DefaultResponse(entity.Id.ToString(), "Documento alterado com sucesso", false);
             }

             return new DefaultResponse("", "Erro ao tentar alterada o documento", true);
         }

         public async Task<DefaultResponse> DeleteAsync(Guid id)
         {
             string strQuery = $"delete from documentType where id = '{id}'";
             using (var cnx = _context.Connection())
             {
                 var result = await cnx.ExecuteAsync(strQuery);
                 if (result > 0)
                     return new DefaultResponse(id.ToString(), "Documento excluído com sucesso", false);
             }
             return new DefaultResponse("", "Erro ao tentar excluír documento", true);
         }
       
         public async Task<DocumentTypeEntity> DocumentTypeGetByIdAsync(Guid id)
         {
             string strQuery = $"select * from documentType where id = '{id}'";
             using (var cnx = _context.Connection())
             {
                 var result = await cnx.QueryFirstOrDefaultAsync<DocumentTypeEntity>(strQuery);
                 return result;
             }
         }

        public async Task<PaginationResponse<DocumentTypeEntity>> GetDocumentTypeByFiltersync(DocumentTypeGetFilterRequest filter)
        {
            using (var cnx = _context.Connection())
            {
                var _sql = new StringBuilder("select * from documentType where 1=1");
                var where = new StringBuilder();

                if (!string.IsNullOrEmpty(filter.Name))
                    where.Append(" AND name like '%" + filter.Name + "%'");

                if (!string.IsNullOrEmpty(filter.Description))
                    where.Append(" AND description like '%" + filter.Description + "%'");

                if (filter.Active.ToLower() != "todos")
                {
                    string _booleanFilter = "";
                    if (filter.Active.ToLower() == "ativos")
                        _booleanFilter = " AND active = true";
                    else if (filter.Active.ToLower() == "inativos")
                        _booleanFilter = " AND active = false";

                    where.Append(_booleanFilter);
                }

                _sql.Append(where);

                if (filter.page > 0 && filter.pageSize > 0)
                    _sql.Append($" Limit {filter.pageSize * (filter.page - 1)}, {filter.pageSize}");

                var result = await cnx.QueryAsync<DocumentTypeEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from documentType where 1=1 " + where.ToString());
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<DocumentTypeEntity>
                {
                    Items = result.ToArray(),
                    _pageSize = filter.pageSize,
                    _page = filter.page,
                    _total = totalRows
                };

            }
        }
    }
}
