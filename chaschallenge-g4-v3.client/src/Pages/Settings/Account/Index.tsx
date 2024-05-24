import { useEffect, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import '../../../scss/Sass-Pages/_AccountPage.scss';
import { getUser } from '../../../ResusableComponents/Requests/userRequest'; // Import the getUser function

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <HeaderWithBackButton title='Konto' />
      <div className='user-settings-container'>
        {user && <div className='user-name'>{`${user.firstName} ${user.lastName}`}</div>}

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
