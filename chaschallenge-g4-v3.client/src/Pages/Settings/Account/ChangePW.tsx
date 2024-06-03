import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import { getUser, updateUserPassword } from '../../../ResusableComponents/Requests/userRequest';
import { useAuth } from '../../../ResusableComponents/authUtils';
import '../../../scss/Sass-Pages/_AccountPage.scss';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userId } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((user) => {
          console.log('User data:', user);
          setUserFirstName(user.firstName); // Assuming the user object has 'firstName' and 'lastName' properties
          setUserLastName(user.lastName); // Assuming the user object has 'firstName' and 'lastName' properties
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    } else {
      // Handle the case where userId is null, perhaps by redirecting the user to a login page or displaying an error message
      console.error('userId is null');
    }
  }, [userId]);
  

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await updateUserPassword(userId, password);
      if (response) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('An error occurred while updating the password');
    }
  };

  return (
    <>
      <HeaderWithBackButton title="Uppdatera lösenord" customBackAction={() => {}} isSettingsPage={false} />
      <div className="user-settings-container">
        <div className="user-name">{`${userFirstName} ${userLastName}`}</div>
        <form className="user-settings-form" onSubmit={handleSubmit}>
          <label className="password-label">
            Lösenord:
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Lösenord"
                value={password}
                onChange={handlePasswordChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="eye-icon"
              />
            </div>
          </label>

          <label className="password-label">
            Bekräfta lösenord
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Bekräfta lösenord"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="eye-icon"
              />
            </div>
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
