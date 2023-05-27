using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.DocumentPartners.Request
{
    public class DocumentPartnersGetFilterRequest
    {
        public string Name { get; set; }

        /// <summary>
        /// Página da consulta
        /// </summary>
        /// 
        public string Description { get; set; }

        public string Active { get; set; }

        public int page { get; set; }
        /// <summary>
        /// Página final da consulta
        /// </summary>
        public int pageSize { get; set; }
    }
}
