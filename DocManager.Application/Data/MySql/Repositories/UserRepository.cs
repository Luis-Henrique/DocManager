using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Helpers;
using System;
using System.Linq;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

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
            var _sql = @$"INSERT INTO user(id, userName, email, password, active, userAutorization)
                                     VALUE(@id, @userName, @email, @password, @active, @userAutorization)";

            using (var cnx = _context.Connection()) 
            {
                var mapper = new
                {
                    id = entity.Id,
                    userName = entity.UserName,
                    email = entity.Email,
                    password = entity.Password,
                    active = entity.Active,
                    userAutorization = entity.UserAutorization
                };
                var result = await cnx.ExecuteAsync(_sql, mapper);

                if (result > 0)
                    return new DefaultResponse(entity.Id.ToString(), "Conta criada com sucesso",false);
            }
            return new DefaultResponse("", "Erro ao tentar criar uma conta", true);
        }

        public async Task<PaginationResponse<UserEntity>> GetAll()
        {
            var _sql = @$"SELECT * FROM user;";

            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryAsync<UserEntity>(_sql.ToString());
                var result2 = await cnx.QueryAsync<int>("select count(*) as count from user");
                var totalRows = result2.FirstOrDefault();

                return new PaginationResponse<UserEntity>
                {
                    Items = result.ToArray(),
                    _pageSize = 10,
                    _page = 1,
                    _total = totalRows
                };
            }
        }

        public async Task<DefaultResponse> UpdateUserToken(UserEntity user)
        {
            var _sql = @$"UPDATE user set forgetPasswordToken = '{user.ForgetPasswordToken}', forgetPasswordExpiration = '{user.ForgetPasswordExpiration}' where id = '{user.Id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(user.Id.ToString(), "usuário alterado com sucesso", false);
            }
            return new DefaultResponse(user.Id.ToString(), "Erro ao tentar alterar um usuário", true);
        }

        public async Task<DefaultResponse> ClearUser(UserEntity user)
        {
            var _sql = @$"UPDATE user set forgetPasswordToken = null, forgetPasswordExpiration = null where id = '{user.Id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(user.Id.ToString(), "usuário alterado com sucesso", false);
            }
            return new DefaultResponse(user.Id.ToString(), "Erro ao tentar alterar um usuário", true);
        }

        public async Task<DefaultResponse> UpdatePasswordUser(UserEntity user)
        {
            var _sql = @$"UPDATE user set password = '{user.Password}' where id = '{user.Id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(user.Id.ToString(), "Senha de usuário alterada com sucesso", false);
            }
            return new DefaultResponse(user.Id.ToString(), "Erro ao tentar alterar senha de um usuário", true);
        }

        public async Task<UserEntity> GetUserByEmail(string email)
        {
            var _sql = $"SELECT * from user WHERE email = '{email}' limit 1";
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

        public async Task<DefaultResponse> UpdateUser(UserEntity user)
        {
            int active;

            if (user.Active == true)
            {
                active = 1;
            }
            else
            {
                active = 0;
            }

            var _sql = @$"UPDATE user set active = {active}, userAutorization = {user.UserAutorization}, userGroupAutorization = '{user.UserGroupAutorization}' where id = '{user.Id}'";
            
            using (var cnx = _context.Connection())
            {
                var result = await cnx.ExecuteAsync(_sql);
                if (result > 0)
                    return new DefaultResponse(user.Id.ToString(), "Usuário alterado com sucesso", false);
            }

            return new DefaultResponse(user.Id.ToString(), "Erro ao tentar alterar o usuário", true);
        }

        public async Task<UserEntity> GetByIdAsync(Guid id)
        {
            string strQuery = $"select id, active, userAutorization, userGroupAutorization from user where id = '{id}'";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<UserEntity>(strQuery);
                return result;
            }
        }

        public async Task<UserEntity> GetUserByCredentialsAsync(string email, string password)
        {
            string strQuery = @$"select * from user where email = '{email}' and password = '{password}' and active = 1 limit 1";
            using (var cnx = _context.Connection())
            {
                var result = await cnx.QueryFirstOrDefaultAsync<UserEntity>(strQuery);
                return result;
            }
        }


    }
}
