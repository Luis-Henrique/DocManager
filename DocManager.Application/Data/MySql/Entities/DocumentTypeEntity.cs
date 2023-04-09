using DocManager.Application.Contracts.Unity.Request;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DocManager.Application.Data.MySql.Entities
{
    
    [Table("documenttype")]
    public class DocumentTypeEntity
    {
        public DocumentTypeEntity(DocumentTypePostRequest request)
        {
            this.Id = Guid.NewGuid();
            this.Title = product.Title;
            this.Description = product.Description;
            this.ProductTypeId = product.ProductTypeId;
            this.CategoryId = product.CategoryId;
            this.UnityId = product.UnityId;
            this.CostPrice = product.CostPrice;
            this.Percentage = product.Percentage;
            this.Price = product.Price;
            this.Active = product.Active;
        }
        public DocumentTypeEntity()
        {
            this.Id = product.Id;
            this.Title = product.Title;
            this.Description = product.Description;
            this.ProductTypeId = product.ProductTypeId;
            this.CategoryId = product.CategoryId;
            this.UnityId = product.UnityId;
            this.CostPrice = product.CostPrice;
            this.Percentage = product.Percentage;
            this.Price = product.Price;
            this.Active = product.Active;
        }

        public DocumentTypeEntity(DocumentTypePutRequest request)
        {
            
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("productTypeId")]
        public string ProductTypeId { get; set; }

        [Column("categoryId")]
        public string CategoryId { get; set; }

        [Column("unityId")]
        public string UnityId { get; set; }

        [Column("coastPrice")]
        public decimal CostPrice { get; set; }

        [Column("percentage")]
        public decimal Percentage { get; set; }

        [Column("price")]
        public decimal Price { get; set; }

        [Column("active")]
        public bool Active { get; set; }
    }
}
