using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Users.Request
{
    public class UserPutRequest
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }

}
