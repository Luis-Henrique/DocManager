using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Helpers
{
    public class ErrorResponse
    {
        public ErrorResponse(string error)
        {
            this.Errors = new List<string>();
            this.Errors.Add(error);
        }

        public ErrorResponse(List<string> errorList)
        {
            this.Errors = new List<string>();
            this.Errors = errorList;
        }

        public ErrorResponse()
        {
            this.Errors = new List<string>();
        }
        public List<string> Errors { get; set; }
    }
}
