using DocManager.Application.Contracts.Product.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DocManager.Application.Data.MySql.Entities
{
    [Table("document")]
    public class DocumentEntity
    {

        public DocumentEntity(DocumentPostRequest product)
        {
           
        }

        public DocumentEntity(DocumentPutRequest product)
        {
          
        }

        public DocumentEntity()
        {

        }

    }
}
