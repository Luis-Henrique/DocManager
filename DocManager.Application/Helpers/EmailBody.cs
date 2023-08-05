using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Helpers
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email, string emailToken)
        {
            return $@"<html>
                        <head>
                        </head>
                        <body>
                            <a href=""http://localhost:4200/#/reset?email={email}&code={emailToken}"" target=""_blank"" style=""background:#0d6efc;padding:10px;border:none;color:white;border-radius:4px;display:block;margin:0 auto;width:50%;text-aling:center;text-decoration:none"">Reset Password</a>
                        </body>
                      </html>";
        }
    }
}
