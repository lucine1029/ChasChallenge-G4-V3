// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useEffect, useState } from 'react';
// import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
// import { getUser } from '../../../ResusableComponents/Requests/userRequest';
// import { useAuth } from '../../../ResusableComponents/authUtils';
// import '../../../scss/Sass-Pages/_AccountPage.scss';
// // import { BiColor } from 'react-icons/bi';

// const UserSettings = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [userFirstName, setUserFirstName] = useState('');
//   const [userLastName, setUserLastName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const { userId } = useAuth();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   useEffect(() => {
//     if (userId) {
//       getUser(userId)
//         .then((user) => {
//           console.log('User data:', user);
//           setUserFirstName(`${user.firstName}`); // Assuming the user object has 'firstName' and 'lastName' properties
//           setUserLastName(`${user.lastName}`); // Assuming the user object has 'firstName' and 'lastName' properties
//           setUserEmail(user.email);
//         })
//         .catch((err) => {
//           console.error('Failed to fetch user:', err);
//         });
//     }
//   }, [userId]);

//   // start-code to handle the info submitted on Account-page
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Make API call to update user details
//     // e.g., updateUser(userId, { name: userName, email: userEmail });
//   };

//   const handleFirstNameChange = (event) => {
//     setUserFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event) => {
//     setUserFirstName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setUserEmail(event.target.value);
//   };

//   const handleChangePasswordClick = () => {
//     navigate('/settings/changePW');
//   };

//   return (
//     <>
//       <HeaderWithBackButton title='Uppdatera dina uppgifter' />
//       <div className='user-settings-container'>
//         <div className='user-name'>{`${userFirstName} ${userLastName}`}</div>
//         <form className='user-settings-form' onSubmit={handleSubmit}>
//           <label>
//             Förnamn: <input type='text' value={userFirstName} onChange={handleFirstNameChange} />
//           </label>
//           <label>
//             Efternamn: <input type='text' value={userLastName} onChange={handleLastNameChange} />
//           </label>
//           <label>
//             Epost: <input type='email' value={userEmail} onChange={handleEmailChange} />
//           </label>
//           <label className='password-label'>
//             Lösenord:
//             <div className='password-input-container'>
//               <input type={showPassword ? 'text' : 'password'} placeholder='Lösenord' />
//               <FontAwesomeIcon
//                 icon={showPassword ? faEye : faEyeSlash}
//                 onClick={togglePasswordVisibility}
//                 className='eye-icon'
//               />
//             </div>
//           </label>
//           <button type='submit'>Update</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default UserSettings;
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import { getUser } from '../../../ResusableComponents/Requests/userRequest';
import { useAuth } from '../../../ResusableComponents/authUtils';
import '../../../scss/Sass-Pages/_AccountPage.scss';

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { userId } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

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
          setUserEmail(user.email);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    }
  }, [userId]);

  // start-code to handle the info submitted on Account-page
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Make API call to update user details
    // e.g., updateUser(userId, { firstName: userFirstName, lastName: userLastName, email: userEmail });
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  return (
    <>
      <HeaderWithBackButton
        title='Kontouppgifter' />
      <div className='user-settings-container'>
        <div className='user-name'>{`${userFirstName} ${userLastName}`}</div>
        <form className='user-settings-form' onSubmit={handleSubmit}>
          <label>
            Förnamn: <input type='text' value={userFirstName} onChange={handleFirstNameChange} />
          </label>
          <label>
            Efternamn: <input type='text' value={userLastName} onChange={handleLastNameChange} />
          </label>
          <label>
            Epost: <input type='email' value={userEmail} onChange={handleEmailChange} />
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
          <button type='submit'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UserSettings;
