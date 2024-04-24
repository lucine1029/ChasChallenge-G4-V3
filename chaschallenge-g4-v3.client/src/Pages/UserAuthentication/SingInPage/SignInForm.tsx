import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';


interface FormValues {
    email: string;

}

const SignInForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>();

    const formSubmit: SubmitHandler<FormValues> = (data) =>
{
    console.log('Form submitted', data);
};

return (
    <>
    <form onSubmit={handleSubmit(formSubmit)}>
        <div>
            <label htmlFor = 'Email' > Email</label>
            <input
            id='email'
            type='email'
            {...register('email', {
                required: 'Email is Required',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address'
                }
            })}
            />
            {errors.email && <span>{errors.email.message}</span>}
        </div>
        <button type='submit'>Log In</button>
    </form>
    <Link to= '/signup'> Don't have an account? Sign Up</Link>
    </>
)


}

export default SignInForm;
