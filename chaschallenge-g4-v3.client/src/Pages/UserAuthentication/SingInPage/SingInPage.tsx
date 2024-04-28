import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';
import '../Account.css'

const SignIn: React.FC = () => {
  return (
    <div className="login-container"> {/* Använd klassen för container */}
      <h2 className="login-text">Sign In Page</h2> {/* Använd klassen för text */}
      <SignInForm />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default SignIn;





/* export default function SignIn() {
    return (
        <>
        </>
    )
} */