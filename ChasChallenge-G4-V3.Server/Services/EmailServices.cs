using Microsoft.Extensions.Options;
using MailKit;
using MimeKit;
using Azure.Core;
using MailKit.Net.Smtp;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Asn1.Pkcs;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IEmailServices       //---Jing
    {
        Task SendEmailAsync(string toEmail, string subject, string message);

        /*********************************************/
        /*Task<IResult> SendConfirmationEmailAsync(UserDto user, string toEmail, string emailConfirmationToken);*/
    };
    public class EmailServices : IEmailServices    //---Jing
    {
        private readonly EmailConfiguration _emailConfiguration;
        public EmailServices(IOptions<EmailConfiguration> emailConfiguration)
        {
            _emailConfiguration = emailConfiguration.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            try
            {
                var emailMessage = new MimeMessage();
                MailboxAddress emailFrom = new MailboxAddress(_emailConfiguration.UserName, _emailConfiguration.From);
                emailMessage.From.Add(emailFrom);
                MailboxAddress emailTo = new MailboxAddress("", toEmail);
                emailMessage.To.Add(emailTo);
                emailMessage.Subject = subject;

                BodyBuilder emailBodyBuilder = new BodyBuilder()
                {
                    HtmlBody = message
                };

                emailMessage.Body = emailBodyBuilder.ToMessageBody();
                //this is the SmtpClient from the Mailkit.Net.Smtp namespace, not the System.Net.Mail one
                using (var mailClient = new SmtpClient())
                {
                    await mailClient.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    await mailClient.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);
                    await mailClient.SendAsync(emailMessage);
                    await mailClient.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {
                // Exception Details
            }
        }

    }




    /*********************************************/



    /*public class UserForEmail
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string EmailConfirmationToken { get; set; }
    }*/


    /*private readonly EmailConfiguration _emailConfiguration;
    public EmailServices(IOptions<EmailConfiguration> emailConfiguration)
    {
        _emailConfiguration = emailConfiguration.Value;
    }
    /*public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        //Implement email sending logic using _emailConfiguration
    }*/

    /*public async Task<IResult> SendConfirmationEmailAsync(UserDto user, string toEmail, string emailConfirmationToken)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Tester", _emailConfiguration.UserName));
        message.To.Add(new MailboxAddress("", toEmail));
        message.Subject = "Confirm Your Email Address";

        message.Body = new TextPart("plain")
        {
            Text = $"Please click the following link to confirm your email address: {_emailConfiguration.ConfirmationLink}?token={emailConfirmationToken}"
        };

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, false);
            await client.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }*/

}