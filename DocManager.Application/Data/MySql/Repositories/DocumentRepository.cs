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
            string strQuery = @$"insert into document(id)
                                          Values('{entity.Id}', '{entity.Title}', '{entity.Description}', '{entity.DocumentType}', '{entity.Validity}', '{entity.Active}', '{entity.Active}', '{entity.CreationDate}', '{entity.UpdateDate}')";

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
            string strQuery = $@"update document set title = '{entity.Title}', 
                                                    description = {entity.Description}, 
                                                    documentTypeId = '{entity.DocumentTypeId}',
                                                    validity = '{entity.Validity}',
                                                    active = '{entity.Active}', 
                                                    creationDate = {entity.CreationDate},
                                                    updateDate = {entity.UpdateDate},
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
            string strQuery = $"delete from document where id = '{id}'";
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
           string strQuery = $"select id, title, description, documentTypeId, validity, active, creationDate, updateDate from document where id = '{id}'";
           using (var cnx = _context.Connection())
           {
               var result = await cnx.QueryFirstOrDefaultAsync<DocumentEntity>(strQuery);
               return result;
           }
       }
       
    }
}
