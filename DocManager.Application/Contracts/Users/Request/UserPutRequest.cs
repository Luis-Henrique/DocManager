using DocManager.Application.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Contracts.Users.Request
{
    public class UserPutRequest
    {
        public Guid Id { get; set; }

        public bool Active { get; set; }

        public int UserAutorization { get; set; }

        public string GroupAutorizationId { get; set; }
    }
}
