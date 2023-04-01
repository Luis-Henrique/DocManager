using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Data.MySql.Entities;
using System;
using System.Threading.Tasks;

namespace DocManager.Application.Data.MySql.Repositories
{
    /// <summary>
    /// Classe responsável por se comunicar com o Banco de dados e
    /// executar os comandos de CRUD
    /// </summary>
    public class UserRepository
    {
        private readonly MySqlContext _context;

        public UserRepository(MySqlContext context)
        {
            this._context = context;
        }
        public async Task<DefaultResponse> CreateUser(UserEntity entity) 
        {
            var _sql = @$"INSERT INTO user(id, userName, email, password, active)
                                     VALUE(@id, @userName, @email, @password, @active)";

            using (var cnx = _context.Connection()) 
            {
                var mapper = new
                {
                    id = entity.Id,
                    userName = entity.UserName,
                    email = entity.Email,
                    password = entity.Password,
                    active = entity.Active
                };
                var result = await cnx.ExecuteAsync(_sql, mapper);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Conta criada com sucesso",false);
            }
            return new DefaultResponse("", "Erro ao tentar criar uma conta", true);
        }
        public async Task<DefaultResponse> UpdateUser(string newPassword, Guid id)
        {
            var _sql = @$"UPDATE user set password = '{newPassword}' where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(id.ToString(), "Senha de usuário alterada com sucesso", false);
            }
            return new DefaultResponse(id.ToString(), "Erro ao tentar alterar senha de um usuário", true);
        }

        public async Task<UserEntity> GetUserByEmail(string email)
        {
            var _sql = $"SELECT id, userName, email, password, active from user WHERE email = '{email}' limit 1";
            using (var cnx = _context.Connection())
            {
                return await cnx.QueryFirstOrDefaultAsync<UserEntity>(_sql);
            }
        }

        public async Task<UserEntity> GetUserByUserNameAndEmail(string username, string email)
        {
            var _sql = $@"SELECT id, userName, email, password, active from user WHERE 
                          username = '{username}' and email = '{email}' limit 1";
            using (var cnx = _context.Connection())
            {
                return await cnx.QueryFirstOrDefaultAsync<UserEntity>(_sql);
            }
        }

        public async Task<UserEntity> InactiveUser(Guid id)
        {
            var _sql = @$"UPDATE user set active = false where id = '{id}'";
            return new UserEntity();
        }

        public async Task<UserEntity> GetUserByCredentialsAsync(string email, string password)
        {
            string strQuery = @$"select id, userName, email, password, active from user where email = '{email}' and password = '{password}' and active = 1 limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<UserEntity>(strQuery);
                return result;
            }
        }
    }
}
