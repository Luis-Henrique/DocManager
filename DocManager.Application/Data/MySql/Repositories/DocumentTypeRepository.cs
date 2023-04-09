using Dapper;
using DocManager.Application.Contracts;
using DocManager.Application.Contracts.Unity.Request;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Data.MySql.Repositories
{
    public class DocumentTypeRepository
    {
        private readonly MySqlContext _context;

        public DocumentTypeRepository(MySqlContext ctt)
        {
            this._context = ctt;
        }

    }
}
