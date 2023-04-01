using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Helpers
{
    public class PaginationResponse<T> where T : class
    {
        /// <summary>
        /// tamanho da minha pagina
        /// </summary>
        public int _pageSize { get; set; }
        /// <summary>
        /// pagina atual
        /// </summary>
        public int _page { get; set; }
        /// <summary>
        ///  total de registros da pesquisa
        /// </summary>
        public int _total { get; set; }
        /// <summary>
        /// Lista de items resultado da pesquisa paginada
        /// </summary>
        public T[] Items { get; set; }
    }
}
