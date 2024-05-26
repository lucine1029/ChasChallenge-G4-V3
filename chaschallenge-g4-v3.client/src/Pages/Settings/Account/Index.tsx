import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import { getUser } from '../../../ResusableComponents/Requests/userRequest';
import { useAuth } from '../../../ResusableComponents/authUtils';
import '../../../scss/Sass-Pages/_AccountPage.scss';

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const { userId } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((user) => {
          console.log('User data:', user);
          setUserName(`${user.firstName} ${user.lastName}`); // Assuming the user object has 'firstName' and 'lastName' properties
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    }
  }, [userId]);

  return (
    <>
      <HeaderWithBackButton title='Konto' />
      <div className='user-settings-container'>
        <div className='user-name'>{userName}</div>
        <form className='user-settings-form'>
          <label>
            Email: <input type='email' />
          </label>
          <label className='password-label'>
            Password:
            <div className='password-input-container'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className='eye-icon'
              />
            </div>
          </label>
          <label className='password-label'>
            Confirm password:
            <div className='password-input-container'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Confirm password' />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className='eye-icon'
              />
            </div>
          </label>
          <button type='submit'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UserSettings;
