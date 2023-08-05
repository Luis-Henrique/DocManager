using DocManager.Application.Contracts.Users.Request;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DocManager.Application.Data.MySql.Entities
{
    [Table("user")]
    public class UserEntity
    {
        public UserEntity(UserPostRequest user)
        {
            this.Id = Guid.NewGuid();
            this.UserName = user.UserName;
            this.Email = user.Email;
            this.Password = user.Password;
            this.Active = true;
        }

        public UserEntity(UserPutRecoveryRequest user)
        {
            this.Id = user.Id;
            this.UserName = user.UserName;
            this.Email = user.Email;
            this.Password = user.Password;
            this.Active = user.Active;
            this.ForgetPasswordToken = user.ForgetPasswordToken;
            this.ForgetPasswordExpiration = user.ForgetPasswordExpiration;
        }

        public UserEntity(){}

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("userName")]
        public string UserName { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("active")]
        public bool Active { get; set; }
        [Column("forgetPasswordToken")]
        public string ForgetPasswordToken { get; set; }
        [Column("forgetPasswordExpiration")]
        public string ForgetPasswordExpiration { get; set; }
    }
}
