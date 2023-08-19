using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts
{
    public class AccountResponse
    {
        public AccountResponse(){}
        public string Id { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public int UserAutorization { get; set; }
        public string UserGroupAutorization { get; set; }
    }
}
