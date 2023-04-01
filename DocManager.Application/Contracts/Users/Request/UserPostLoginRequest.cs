using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Users.Request
{
    public class UserPostLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
