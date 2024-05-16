using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;


namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailMessage email);
       
    }
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;
      
        public EmailService(EmailConfiguration emailConfig) 
        {
            _emailConfig = emailConfig;
         
        }
        
        public async Task SendEmailAsync(EmailMessage email)
        {
            var emailmessage = CreateEmailMessage(email);
            await SendAsync(emailmessage);
        }

        private MimeMessage CreateEmailMessage(EmailMessage email)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("email", _emailConfig.From));
            emailMessage.To.AddRange(email.To);
            emailMessage.Subject = email.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = email.Content };
                      
            return emailMessage;
        }

        private async Task SendAsync(MimeMessage email)
        {
            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);

                await client.SendAsync(email);
            }
            catch (SmtpCommandException e) 
            {
                await Console.Out.WriteLineAsync($"SMTP command esception: {e.Message}");
                throw;
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }
    }
}
