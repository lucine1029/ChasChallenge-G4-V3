

// import { useForm, SubmitHandler } from 'react-hook-form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>();

  const formSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted: ', data);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {/* Input-fält för e-post */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {/* Visa felmeddelande om e-post är ogiltig */}
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* Input-fält för lösenord */}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
        />
        {/* Visa felmeddelande om lösenordet är ogiltigt */}
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {/* Input-fält för att bekräfta lösenordet */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match'
          })}
        />
        {/* Visa felmeddelande om bekräftelse av lösenordet är ogiltigt */}
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Knapp för att registrera */}
      <button type="submit">Register</button>

      {/* Länk för att logga in om man redan har ett konto */}
      <Link to="/signin">Already have an account? Sign In</Link>
    </form>
  );
};

export default SignUpForm;
