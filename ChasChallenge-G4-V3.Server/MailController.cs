using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NETCore.MailKit.Core;

namespace ChasChallenge_G4_V3.Server
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase  //----Jing
    {
        private readonly IEmailServices _emailServices;

        //injecting the IEMailService into the constructor
        public MailController(IEmailServices emailServices) 
        {
            _emailServices = emailServices;
        }

        [HttpPost]
        [Route("SendMail")]
        public async Task SendMailAsync(string toEmail, string subject, string message)
        {
             await _emailServices.SendEmailAsync(toEmail,subject,message);
        }
    }
}
