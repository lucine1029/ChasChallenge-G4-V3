// SignInForm.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login as loginRequest } from '../../../ResusableComponents/Requests/loginRequest';
import '../../../scss/Sass-Pages/_SignUpPage.scss';
import { useAuth } from '../../../ResusableComponents/authUtils';

interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const auth = useAuth();
  const navigate = useNavigate();

  const formSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Form submitted', data);

    try {
      // Call the login function
      const response = await loginRequest(data);
      console.log('Login successful:', response);

      //Saves the token and the userID in session using function in authutils
      auth.login(response.token, response.userId);

      navigate('/chat');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show error message to user)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className='input-container'>
          <h2>Logga in</h2>
          {/* <label htmlFor="email" className="input-label">Email:</label> */}
          <input
            id='email'
            type='email'
            placeholder='E-postadress'
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
            className='input-field' // Lägg till klassen för input-fält
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}{' '}
          {/* Använd klassen för felmeddelande */}
          {/* <label htmlFor="password" className="input-label">Password:</label> */}
          <input
            id='password'
            type='password'
            placeholder='Lösenord'
            {...register('password', {
              required: 'Password is Required',
            })}
            className='input-field' // Lägg till klassen för input-fält
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}{' '}
          {/* Använd klassen för felmeddelande */}
          <div className='signin-forgot-container'>
            <Link className='forgot-link' to='/forgot-password'>
              Glömt lösenordet?
            </Link>
          </div>
            <button type='submit' className='login-button'>
              Logga in
            </button>{' '}
            {/* Använd klassen för knappen */}
          <Link to='/signup' className='link-button'>
            Skapa ett konto på Babster
          </Link>{' '}
        </div>
      </form>
      {/* Använd klassen för länk-knappen */}
    </>
  );
}

export default SignInForm;
