import React from 'react';
import SignInForm from './SignInForm';
import '../../../scss/Sass-Pages/_SignUpPage.scss';

const SignIn: React.FC = () => {
  return (
    <main>
      <section className='section-container'>
        <SignInForm />
      </section>
    </main>
  );
};

export default SignIn;
