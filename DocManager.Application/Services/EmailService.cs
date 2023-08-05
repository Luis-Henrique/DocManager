using DocManager.Application.Contracts.Users.Request;
using DocManager.Application.Contracts;
using DocManager.Application.Data.MySql.Entities;
using DocManager.Application.Data.MySql.Repositories;
using DocManager.Application.Helpers;
using DocManager.Application.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MimeKit;
using static System.Net.Mime.MediaTypeNames;
using MailKit.Net.Smtp;

namespace DocManager.Application.Services
{
    public class EmailService
    {
        public IConfiguration _configuration { get; set; }
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(EmailEntity emailEntity)
        {
            _configuration = new ConfigurationBuilder()
               .AddJsonFile("appsettings.json")
               .Build();

            var emailMessage = new MimeMessage();
            var from = _configuration.GetSection("EmailSettings").GetSection("From").Value;

            emailMessage.From.Add(new MailboxAddress("DocManager", from));
            emailMessage.To.Add(new MailboxAddress(emailEntity.To, emailEntity.To));
            emailMessage.Subject = emailEntity.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailEntity.Content)
            };

            var smtp = _configuration.GetSection("EmailSettings").GetSection("SmtpServer").Value;
            var Password = _configuration.GetSection("EmailSettings").GetSection("Password").Value;

            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(smtp, 465, true);
                    client.Authenticate(from, Password);
                    client.Send(emailMessage);
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}
