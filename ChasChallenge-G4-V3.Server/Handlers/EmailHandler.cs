using Azure;
using Azure.Core;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using NETCore.MailKit.Core;
using Org.BouncyCastle.Asn1.Ocsp;
using System.ComponentModel.DataAnnotations;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class EmailHandler
    {
        private readonly IEmailService _emailService;
        
        public EmailHandler(IEmailService emailService)
        {
            _emailService = emailService;
           
        }
        public static async Task<IResult> TestEmailAsync(Services.IEmailService emailService)
        {
            var email = new EmailMessage(new string[] { "Jonnytouma@gmail.com" }, "test", "jonzy wuz here");

            await emailService.SendEmailAsync(email);

            return Results.StatusCode(200);           
        }       

    }
}
