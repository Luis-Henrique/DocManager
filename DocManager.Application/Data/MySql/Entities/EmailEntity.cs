using DocManager.Application.Contracts.Users.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocManager.Application.Data.MySql.Entities
{
    public class EmailEntity
    {
        public EmailEntity(string to, string subject, string content)
        {
            this.To = to;
            this.Subject = subject;
            this.Content = content;
        }

        public string To { get; set; }
        public string Subject { get; set; }    
        public string Content { get; set; }   
    }
}
