// import '../../scss/Sass-Pages/_HomePage.scss'
import { Link } from 'react-router-dom';
//import '../../scss/style.scss'

export default function HomePage() {
  return (
    <>
      <header /* className='homepage-header' */>
        <h1 className='homepage-title'>Välkommen till Bebisappen</h1>
        <h2 className='homepage-subtitle'>
          Registrera dig och börja er resa här!
        </h2>
      </header>
      <main>
        <section className='homepage-auth-portal'>
          <Link className='homepage-login-btn' to='/SignIn'>
            Logga in
          </Link>
          <p>Första gången här?</p>
          <Link to='/SignUp'>Skapa ett konto här!</Link>
        </section>
      </main>
    </>
  );
}
