namespace ChasChallenge_G4_V3.Server.Models
{
    internal class Measurement
    {
        public int Id { get; set; }
        public DateTime DateOfMeasurement { get; set; }
        public double? Weight { get; set; }
        public double? Height { get; set; }
        public double? HeadCircumference { get; set; }
    }
}
