import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from '../../../ResusableComponents/BackButton';
import './UseSettings.css';

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='user-settings-container'>
      <BackButton />
      <form className='user-settings-form'>
        <label>
          Email: <input type='email' />
        </label>
        <label className='password-label'>
          Password:
          <div className='password-input-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
            />
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
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm password'
            />
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
  );
};

export default UserSettings;
