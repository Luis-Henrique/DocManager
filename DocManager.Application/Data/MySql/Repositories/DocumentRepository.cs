using Dapper;
using System;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using DocManager.Application.Contracts;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Helpers;
using DocManager.Application.Contracts.Document.Request;
using DocManager.Application.Services;
using Microsoft.AspNetCore.Mvc;

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
            int active = 0;

            if (entity.Active == true)
            {
                active = 1;
            }
            else
            {
                active = 0;
            }

            string strQuery = @$"insert into documents(id, title, description, documentTypeId, documentPartnersId, userAutorizationGroupId, validity, active, url)
                                          Values('{entity.Id}', '{entity.Title}', '{entity.Description}', '{entity.DocumentTypeId}', '{entity.DocumentPartnersId}', '{entity.UserAutorizationGroupId}', '{entity.Validity}', {active}, '{entity.Url}')";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar Documento", true);
        }
        public async Task<DefaultResponse> UpdateAsync(DocumentEntity entity)
        {
            int active = 0;

            if(entity.Active == true)
            {
                active = 1;
            } else
            {
                active = 0;
            }
            string strQuery = $@"update documents set title = '{entity.Title}', 
                                                    description = '{entity.Description}', 
                                                    documentTypeId = '{entity.DocumentTypeId}',
                                                    documentPartnersId = '{entity.DocumentPartnersId}',
                                                    userAutorizationGroupId = '{entity.UserAutorizationGroupId}',
                                                    validity = '{entity.Validity}', 
                                                    active = {active},
                                                    url = '{entity.Url}'
                                                    where id = '{entity.Id}'";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento alterado com sucesso", false);
            }

            return new DefaultResponse("", "Erro ao tentar alterada documento", true);
        }

       public async Task<DefaultResponse> DeleteAsync(Guid id)
        {
            string strQuery = $"delete from documents where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Documento excluído com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar excluir documento", true);
        }
        
       public async Task<DocumentEntity> DocumentGetByIdAsync(Guid id)
       {
           string strQuery = $"select * from documents where id = '{id}'";
           using (var cnx = _context.Connection())
           {
               var result = await cnx.QueryFirstOrDefaultAsync<DocumentEntity>(strQuery);
               return result;
           }
       }

        public async Task<PaginationResponse<DocumentEntity>> GetDocumentByFiltersync(DocumentGetFilterRequest filter)
        {
            using (var cnx = _context.Connection())
            {
                var _sql = new StringBuilder("select * from documents where 1=1");
                var where = new StringBuilder();

                if (!string.IsNullOrEmpty(filter.Title))
                    where.Append(" AND title like '%" + filter.Title + "%'");

                if (!string.IsNullOrEmpty(filter.Description))
                    where.Append(" AND description like '%" + filter.Description + "%'");

                if (!string.IsNullOrEmpty(filter.DocumentTypeId))
                    where.Append(" AND documentTypeId = '" + filter.DocumentTypeId + "'");

                if (!string.IsNullOrEmpty(filter.DocumentPartnersId))
                    where.Append(" AND documentPartnersId = '" + filter.DocumentPartnersId + "'");

                if (filter.UserAutorizationGroupId != "Todos")
                    where.Append(" AND userAutorizationGroupId = '" + filter.UserAutorizationGroupId + "'");

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

                var result = await cnx.QueryAsync<DocumentEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from documents where 1=1 " + where.ToString());
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<DocumentEntity>
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
