using System;
using System.Collections.Generic;
using System.Text;

namespace DocManager.Application.Contracts.Users.Request
{
    /// <summary>
    /// Classe de "Contrato" responsável pela requeicsicção para cadastrar um novo usuário
    /// </summary>
    public class UserPostRequest
    {
        /// <summary>
        /// Propriedade que refere-se ao nome do usuário
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Propriedade que refere-se ao e-mail do usuário
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// propriedade que refere-se a senha do usuário
        /// </summary>
        public string Password { get; set; }
    }
}
