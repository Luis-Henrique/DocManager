using DocManager.Application.Contracts;
using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Errors;
using DocManager.Application.Helpers;
using DocManager.Application.Validators;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DocManager.Application.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;
        public UserService(UserRepository userRepository)
        {
            this._userRepository = userRepository;
        }
        public async Task<ResultData> PostAsync(UserPostRequest request)
        {
            var validator = new UserPostRequestValidator(_userRepository);
            var validatorResult = validator.Validate(request);

            if (!validatorResult.IsValid)
                return Utils.ErrorData(validatorResult.Errors.ToErrorList());

            var entity = new UserEntity(request);
            var response = await _userRepository.CreateUser(entity);
            Console.WriteLine("Sucesso" + DateTime.Now + "\r\n");
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> PutTokenAsync(UserEntity request)
        {
            var response = await _userRepository.UpdateUserToken(request);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> PutAsync(UserPutRequest request)
        {
            var entity = new UserEntity(request);
            var response = await _userRepository.UpdateUser(entity);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetAllAsync()
        {
            var response = await _userRepository.GetAll();
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> ClearUserAsync(UserEntity request)
        {
            var response = await _userRepository.ClearUser(request);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> PutPasswordAsync(UserEntity request)
        {
            var response = await _userRepository.UpdatePasswordUser(request);
            return Utils.SuccessData(response);
        }

        public async Task<UserEntity> Authenticate(string user, string password)
        {
            var response = await _userRepository.GetUserByCredentialsAsync(user, password);
            return response;
        }

        public async Task<ResultData> PostLoginAsync(UserPostLoginRequest user)
        {
            var openData = user.Email + ":" + user.Password + ":" + Utils.GetDateExpired(10);
            var dataBytes = Utils.ToBase64Encode(openData);
            var getuser = new UserEntity();

            
            getuser = await _userRepository.GetUserByCredentialsAsync(user.Email, user.Password);
            
            if(getuser == null){
                return Utils.SuccessData(new AccountResponse { Message = "Usuário inexistente ou ainda não foi ativado" });
            }

            if (getuser.Active == true)
            {
                if (getuser != null)
                {
                    var response = new AccountResponse
                    {
                        Id = getuser.Id.ToString(),
                        Message = "Token successful",
                        Token = dataBytes,
                        UserAutorization = getuser.UserAutorization,
                        UserGroupAutorization = getuser.UserGroupAutorization,
                    };
                    return Utils.SuccessData(response);
                }
            }
            return Utils.ErrorData(new AccountResponse { Message = "Token Fail" });
        }

        public async Task<UserEntity> GetByEmail(string email)
        {
            var response = await _userRepository.GetUserByEmail(email);
            return response;
        }

        public async Task<ResultData> GetByIdAsync(Guid id)
        {
            var response = await _userRepository.GetByIdAsync(id);
            return Utils.SuccessData(response);
        }
    }
}
