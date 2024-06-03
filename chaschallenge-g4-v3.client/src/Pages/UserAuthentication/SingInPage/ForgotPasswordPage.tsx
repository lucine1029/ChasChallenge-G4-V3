import '../../../scss/Sass-Pages/_ForgotPassword.scss'

export default function ForgotPasswordPage() {

    return(
        <>
        <header className='header-container'>
            {/* <img src={} alt='Babster Logo' className='logo' /> */}
            <span className='logo'>Babster</span>
            <button className='header-button'>Logga in</button>
        </header>
        <main>
            <section className='section-container'>
                <form action="">
                    <div className="input-container">
                        <h2>Återställ ditt lösenord</h2>
                        <p>Vi skickar en länk till din epost-adress för att återställa ditt lösenord </p>
                        <input type="email" className='input-field' placeholder="E-mail"/>
                        <button className="forgot-submit-btn">Skicka</button>
                    </div>
                </form>
            </section>
        </main>
    </>
    )
}