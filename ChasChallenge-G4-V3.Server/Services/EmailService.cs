using System.Net;
using System.Net.Mail;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string body, bool isBodyHTML);
    }

    public class EmailService: IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)   //Iconfiguration allow me to easy cahnge emailsettings whitout changing the code
        {
            _configuration = configuration;
        }
        public Task SendEmailAsync(string toEmail, string subject, string body, bool isBodyHTML)
        {
            string MailServer = _configuration["EmailConfiguration:SmtpServer"];
            string FromEmail = _configuration["EmailConfiguration:Username"];
            string Password = _configuration["EmailConfiguration:Password"];
            int Port = int.Parse(_configuration["EmailConfiguration:Port"]);

            var client = new SmtpClient(MailServer, Port)
            {
                Credentials = new NetworkCredential(FromEmail, Password),
                EnableSsl = true,
            };
            MailMessage mailMessage = new MailMessage(FromEmail, toEmail, subject, body) 
            {
                IsBodyHtml = isBodyHTML
            };

            return client.SendMailAsync(mailMessage);
        }
    }
}
