using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Unity.Request
{
    public class DocumentTypeGetFilterRequest
    {
        public string Name { get; set; }

        /// <summary>
        /// Página da consulta
        /// </summary>
        /// 
        public string Active { get; set; }

        public int page { get; set; }
        /// <summary>
        /// Página final da consulta
        /// </summary>
        public int pageSize { get; set; }
    }
}
