using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Enums;
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
            this.UserAutorization = 2;
            this.Active = false;
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
            this.UserGroupAutorization = user.UserAutorizationGroupId;
        }
        public UserEntity(UserPutRequest user)
        {
            this.Id = user.Id;
            this.Active = user.Active;
            this.UserAutorization = user.UserAutorization;
            this.UserGroupAutorization = user.GroupAutorizationId;
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
        [Column("userAutorization")]
        public int UserAutorization { get; set; }
        [Column("userGroupAutorization")]
        public string UserGroupAutorization { get; set; }
    }
}
