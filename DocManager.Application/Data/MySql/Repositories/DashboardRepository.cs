using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Contracts.Dashboard;
using DocManager.Application.Data.MySql.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Data.MySql.Repositories
{
    public class DashboardRepository
    {
        private readonly MySqlContext _context;
        public DashboardRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }

        public async Task<List<EntityStatusView>> GetEntityByStatus(string entity, string field, string join, string fieldjoin)
        {

            var response = new List<EntityStatusView>();
            string _join = "";
            string _group = "";
            string _groupBy = "";
            string _entity = "";

            if (!string.IsNullOrEmpty(join) || !string.IsNullOrEmpty(fieldjoin))
            {
                _join = $"inner join {join} {join} on ({entity}.{fieldjoin} = {join}.id)";
                _group = $"{join}.name as 'group'";
                _groupBy = fieldjoin;
                _entity = join;
            }
            else
            {
                _group = $"(case when {field} = 0 then 'Inactive' when { field} = 1 then 'Active' end) as 'group'";
                _groupBy = field;
                _entity = entity;
            }

            try
            {
                using (var cnx = _context.Connection())
                {
                    var _sql = new StringBuilder($@"SELECT '{_entity}' as name, 
                                                  {_group} , 
                                                  COUNT(1) as count FROM {entity} 
                                                  {_join}
                                                  GROUP BY {_groupBy}");
                    var result = await cnx.QueryAsync<EntityStatusView>(_sql.ToString());
                    response = result.ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[getEntityByStatus] ERROR: {ex}");
            }
            return response;
        }



    }
}

