using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Users.Request
{
    public class UserPutRecoveryRequest
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
        public string ForgetPasswordToken { get; set; }
        public string ForgetPasswordExpiration { get; set; }

        public string UserAutorizationGroupId { get; set; }
    }

}
