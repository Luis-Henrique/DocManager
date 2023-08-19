using DocManager.Application.Contracts.GroupAutorization.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Services
{
    public class GroupAutorizationService
    {
        private readonly GroupAutorizationRepository _groupAutorizationRepository;
        public GroupAutorizationService(GroupAutorizationRepository groupAutorizationRepository)
        {
            this._groupAutorizationRepository = groupAutorizationRepository;
        }
        public async Task<ResultData> PostAsync(GroupAutorizationPostRequest groupAutorization)
        {
            var entity = new GroupAutorizationEntity(groupAutorization);
            return Utils.SuccessData(await _groupAutorizationRepository.CreateAsync(entity));
        }

        public async Task<ResultData> PutAsync(GroupAutorizationPutRequest groupAutorization)
        {
            var entity = new GroupAutorizationEntity(groupAutorization);
            return Utils.SuccessData(await _groupAutorizationRepository.UpdateAsync(entity));
        }

        public async Task<ResultData> DeleteAsync(Guid id)
        {
            var response = await _groupAutorizationRepository.DeleteAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetByIdAsync(Guid id)
        {
            var response = await _groupAutorizationRepository.DocumentPartnersGetByIdAsync(id);
            return Utils.SuccessData(response);
        }

        public async Task<ResultData> GetAllAsync()
        {
            var response = await _groupAutorizationRepository.GetAll();
            return Utils.SuccessData(response);
        }
    }
}
