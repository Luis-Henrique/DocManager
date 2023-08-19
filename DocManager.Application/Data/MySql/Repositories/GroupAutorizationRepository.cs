using System;
using System.Collections.Generic;
using System.Linq;
using DocManager.Application.Data.MySql.Entities;
using System.Text;
using System.Threading.Tasks;
using DocManager.Application.Contracts;
using DocManager.Application.Helpers;
using Dapper;

namespace DocManager.Application.Data.MySql.Repositories
{
    public class GroupAutorizationRepository
    {
        private readonly MySqlContext _context;

        public GroupAutorizationRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }
        public async Task<DefaultResponse> CreateAsync(GroupAutorizationEntity entity)
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
            string strQuery = @$"insert into groupAutorization(id, name, active)
                                          Values('{entity.Id}', '{entity.Name}', {active})";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Documento criado com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar criar documento", true);
        }
        public async Task<DefaultResponse> UpdateAsync(GroupAutorizationEntity entity)
        {
            string strQuery = $@"update groupAutorization set name = '{entity.Name}', 
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
            string strQuery = $"delete from groupAutorization where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(strQuery);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Documento excluído com sucesso", false);
            }
            return new DefaultResponse("", "Erro ao tentar excluír documento", true);
        }

        public async Task<GroupAutorizationEntity> DocumentPartnersGetByIdAsync(Guid id)
        {
            string strQuery = $"select * from groupAutorization where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<GroupAutorizationEntity>(strQuery);
                return result;
            }
        }

        public async Task<PaginationResponse<GroupAutorizationEntity>> GetAll()
        {
            var _sql = @$"SELECT * FROM groupAutorization;";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryAsync<GroupAutorizationEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from groupAutorization");
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<GroupAutorizationEntity>
                {
                    Items = result.ToArray(),
                    _pageSize = 10,
                    _page = 1,
                    _total = totalRows
                };
            }
        }
    }
}
