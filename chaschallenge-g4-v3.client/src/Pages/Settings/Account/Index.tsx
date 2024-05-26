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
  const [userEmail, setUserEmail] = useState('');
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
          setUserEmail(`${user.email}`);
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
            Namn: <input type='email' value={userName} />
          </label>
          <label>
            Epost: <input type='email' value={userEmail} />
          </label>
          <label className='password-label'>
            Lösenord:
            <div className='password-input-container'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Lösenord' />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className='eye-icon'
              />
            </div>
          </label>
          <label className='password-label'>
            Bekräfta lösenord
            <div className='password-input-container'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Bekräfta lösenord' />
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
