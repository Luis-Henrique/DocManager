using DocManager.Application.Contracts.Document.Request;
using DocManager.Application.Contracts.DocumentType.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocManager.Application.Data.MySql.Repositories
{

    [Table("document")]
    public class DocumentEntity
    {
        public DocumentEntity(DocumentPostRequest document)
        {
            this.Id = Guid.NewGuid();
            this.Title = document.Title;
            this.Description = document.Description;
            this.DocumentTypeId = document.DocumentTypeId;
            this.DocumentPartnersId = document.DocumentPartnersId;
            this.Validity = document.Validity;
            this.Active = document.Active;
            this.Url = document.Url;
            this.CreatedDate = DateTime.Now;
        }

        public DocumentEntity(DocumentPutRequest document)
        {
            this.Id = document.Id;
            this.Title = document.Title;
            this.Description = document.Description;
            this.DocumentTypeId = document.DocumentTypeId;
            this.DocumentPartnersId = document.DocumentPartnersId;
            this.Validity = document.Validity;
            this.Active = document.Active;
            this.Url = document.Url;
            this.UpdatedDate = DateTime.Now;
        }

        public DocumentEntity()
        {

        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("documentTypeId")]
        public string DocumentTypeId { get; set; }

        [Column("documentPartnersId")]
        public string DocumentPartnersId { get; set; }

        [Column("validity")]
        public string Validity { get; set; }

        [Column("active")]
        public bool Active { get; set; }

        [Column("url")]
        public string Url { get; set; }

        [Column("createdDate")]
        public DateTime CreatedDate { get; set; }

        [Column("uptadedDate")]
        public DateTime UpdatedDate { get; set; }

    }
}