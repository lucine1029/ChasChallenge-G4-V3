import React from 'react';
import SignInForm from './SignInForm';
import '../../../scss/Sass-Pages/_SignUpPage.scss';

const SignIn: React.FC = () => {
  return (
    <main>
      <div className='login-container'>
        {' '}
        {/* Använd klassen för container */}
        <h2 className='login-text'>Logga In</h2> {/* Använd klassen för text */}
        <SignInForm />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
