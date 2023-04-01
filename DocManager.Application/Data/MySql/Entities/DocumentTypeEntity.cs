using DocManager.Application.Contracts.Unity.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DocManager.Application.Data.MySql.Entities
{
    
    [Table("documenttype")]
    public class DocumentTypeEntity
    {
        public DocumentTypeEntity(DocumentTypePostRequest request)
        {
         
        }
        public DocumentTypeEntity()
        {
        }

        public DocumentTypeEntity(DocumentTypePutRequest request)
        {
            
        }
    }
}
