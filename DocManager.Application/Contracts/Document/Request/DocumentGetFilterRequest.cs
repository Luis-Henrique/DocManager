
namespace DocManager.Application.Contracts.Document.Request
{
    public class DocumentGetFilterRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string DocumentTypeId { get; set; }
        public string DocumentPartnersId { get; set; }
        public string UserAutorizationGroupId { get; set; }

        public string Active { get; set; }

        /// <summary>
        /// Página da consulta
        /// </summary>
        public int page { get; set; }
        /// <summary>
        /// Página final da consulta
        /// </summary>
        public int pageSize { get; set; }
    }
}

