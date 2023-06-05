using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.DocumentPartners.Request
{
    public class DocumentPartnersPutRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
    }
}