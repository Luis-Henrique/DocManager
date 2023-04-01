using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts
{
    public class DefaultResponse
    {
        public DefaultResponse(string id, string message, bool hasErrors)
        {
            this.Id = id;
            this.Message = message;
            this.HasErrors = hasErrors;
        }

        public string Id { get; set; }
        public string Message { get; set; }
        public bool HasErrors { get; set; }
    }
}
