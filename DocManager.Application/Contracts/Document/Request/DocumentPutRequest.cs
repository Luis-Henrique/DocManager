using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Document.Request
{
    public class DocumentPutRequest
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string DocumentTypeId { get; set; }

        public string DocumentPartnersId { get; set; }
        public string UserAutorizationGroupId { get; set; }

        public string Validity { get; set; }

        public bool Active { get; set; }

        public string Url { get; set; }
    }
}