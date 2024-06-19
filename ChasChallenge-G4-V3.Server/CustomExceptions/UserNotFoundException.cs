namespace ChasChallenge_G4_V3.Server.CustomExceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message) : base(message) { }
    }
}
