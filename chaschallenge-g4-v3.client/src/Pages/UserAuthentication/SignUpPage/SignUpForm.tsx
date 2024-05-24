import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addNewUser } from '../../../ResusableComponents/Requests/authRequest'; // Import addNewUser function
import '../../../scss/Sass-Pages/_SignUpPage.scss';


interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

const navigate = useNavigate();

const SignUpForm: React.FC = () => {
  const [emailExists, setEmailExists] = useState<boolean>(false); // State variable to track if email already exists
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // Function to check if email exists
  // const checkEmailExists = async (email: string) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/users');
  //     const users = await response.json();
  //     const existingUser = users.some((user: any) => user.email === email);
  //     setEmailExists(existingUser);
  //   } catch (error) {
  //     console.error('Error checking email existence:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Check if email exists when the component mounts
  //   checkEmailExists('');
  //   // Cleanup function to reset emailExists state
  //   return () => setEmailExists(false);
  // }, []);
  // useEffect(() => {
  //   // Check if email exists when the component mounts
  //   checkEmailExists('');
  //   // Cleanup function to reset emailExists state
  //   return () => setEmailExists(false);
  // }, []);

  // const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   checkEmailExists(value);
  // };
  // const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   checkEmailExists(value);
  // };

  const formSubmit: SubmitHandler<FormValues> = async (data) => {

    console.log('Form submitted', data);
    addNewUser(data);
    navigate('/signin')
  };

  return (
    <div className='login-container'>
      <h2 className='login-text'>Registrera dig</h2>
      <form onSubmit={handleSubmit(formSubmit)} className='form-container'>
        <div className='input-container'>
          <input 
          id='firstname'
          type="text"
          placeholder='Förnamn'
          className={`input-field`} 
          {...register('firstname', { required: 'Förnamn är obligatoriskt' })}

          />
                    <input 
          id='lastname'
          type="text"
          placeholder='Efternamn'
          className={`input-field`} 
          {...register('lastname', { required: 'Efternamn är obligatoriskt' })}

          />

          <input
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`input-field ${emailExists ? 'email-taken' : ''}`}
            style={{
              border: emailExists ? '1px solid red' : '',
              color: emailExists ? 'red' : '#000',
            }}
            placeholder={emailExists ? 'Email Already in use!' : 'E-postadress'}
            
            // onChange={handleEmailChange}
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}
        </div>
        <div className='input-container'>
          {/* <label htmlFor='password' className='input-label'>
            Password:
          </label> */}
          <input
            id='password'
            type='password'
            placeholder='Lösenord'
            {...register('password', {
              required: 'Password is Required',
            })}
            className='input-field'
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}
        </div>
        <div className='input-container'>
          {/* <label htmlFor='confirmPassword' className='input-label'>
            Confirm Password:
          </label> */}

          {/* <input
            id='confirmPassword'
            type='password'
            placeholder='Bekräfta lösenord'
            {...register('confirmPassword', {
              required: 'Confirm Password is Required',
            })}
            className='input-field'
          />
          {errors.confirmPassword && (
            <span className='error-message'>{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type='submit' className='login-button'>
          Sign Up
        </button>
      </form>
      <Link to='/signin' className='link-button'>
        Already have an account? Log In
      </Link>
    </div>
  );
};

export default SignUpForm;
