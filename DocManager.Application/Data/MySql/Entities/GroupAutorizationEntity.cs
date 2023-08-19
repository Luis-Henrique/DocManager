using DocManager.Application.Contracts.GroupAutorization.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocManager.Application.Data.MySql.Entities
{
    [Table("groupAutorization")]
    public class GroupAutorizationEntity
    {
        public GroupAutorizationEntity(GroupAutorizationPostRequest groupAutorization)
        {
            this.Id = Guid.NewGuid();
            this.Name = groupAutorization.Name;
            this.Active = true;
            this.CreatedDate = DateTime.Now;
        }

        public GroupAutorizationEntity(GroupAutorizationPutRequest groupAutorization)
        {
            this.Id = groupAutorization.Id;
            this.Name = groupAutorization.Name;
            this.Active = groupAutorization.Active;
            this.UpdatedDate = DateTime.Now;
        }

        public GroupAutorizationEntity()
        {

        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("active")]
        public bool Active { get; set; }

        [Column("createdDate")]
        public DateTime CreatedDate { get; set; }

        [Column("uptadedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}