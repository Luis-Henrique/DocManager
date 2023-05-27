using DocManager.Application.Contracts.DocumentPartners.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DocManager.Application.Data.MySql.Repositories
{
    [Table("documentPartners")]
    public class DocumentPartnersEntity
    {
        public DocumentPartnersEntity(DocumentPartnersPostRequest document)
        {
            this.Id = Guid.NewGuid();
            this.Name = document.Name;
            this.Description = document.Description;
            this.Active = true;
            this.CreatedDate = DateTime.Now;
        }

        public DocumentPartnersEntity(DocumentPartnersPutRequest document)
        {
            this.Id = document.Id;
            this.Name = document.Name;
            this.Description = document.Description;
            this.Active = document.Active;
            this.UpdatedDate = DateTime.Now;
        }

        public DocumentPartnersEntity()
        {

        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("active")]
        public bool Active { get; set; }

        [Column("createdDate")]
        public DateTime CreatedDate { get; set; }

        [Column("uptadedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}
