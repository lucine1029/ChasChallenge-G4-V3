import BackButton from '../../ResusableComponents/HeaderWithBackButton';

const UserSettings = () => {
  return (
    <>
      <BackButton />
      <form>
        <label>
          Email: <input type='email' />
        </label>
        <label>
          Password: <input type='password' />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  );
};

export default UserSettings;
