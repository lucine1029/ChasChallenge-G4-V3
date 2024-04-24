
import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';

const SignIn: React.FC = () => {
    return (
        <div>
            <h2>Sign In Page</h2>
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