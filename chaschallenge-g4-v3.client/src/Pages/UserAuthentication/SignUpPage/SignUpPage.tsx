import SignUpForm from "./SignUpForm";
import ProfileSteps from "./ProfileSteps";

const SignUp: React.FC = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <SignUpForm />

      {/* profilesteps ska in i en egen sida sen */}
      <ProfileSteps />
    </>
  );
};

export default SignUp;

