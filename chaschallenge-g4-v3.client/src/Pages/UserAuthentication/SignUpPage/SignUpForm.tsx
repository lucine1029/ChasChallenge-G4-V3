// SignUpForm.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../Account.css';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const formSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted', data);
  };

  return (
    <div className="login-container">
      <h2 className="login-text">Sign Up</h2>
      <form onSubmit={handleSubmit(formSubmit)} className="form-container">
        <div className="input-container">
          <label htmlFor="email" className="input-label">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address'
              }
            })}
            className="input-field"
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="input-container">
          <label htmlFor="password" className="input-label">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is Required'
            })}
            className="input-field"
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword" className="input-label">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is Required'
            })}
            className="input-field"
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" className="login-button">Sign Up</button>
      </form>
      <Link to="/signin" className="link-button">Already have an account? Log In</Link>

    </div>
  );
}

export default SignUpForm;
