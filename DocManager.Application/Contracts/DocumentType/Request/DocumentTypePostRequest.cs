using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.DocumentType.Request
{
    public class DocumentTypePostRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }

    }
}