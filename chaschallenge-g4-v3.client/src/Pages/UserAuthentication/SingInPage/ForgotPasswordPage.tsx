import '../../../scss/Sass-Pages/_ForgotPassword.scss'

export default function ForgotPasswordPage() {

    return(
        <>
        <main>
            <form action="">
                <div className="input-container">
                    <h2>Återställ ditt lösenord</h2>
                    <p>Vi skickar en länk till din epost-adress för att återställa ditt lösenord </p>
                    <input type="email" className='input-field' placeholder="E-mail"/>
                    <button className="forgot-submit-btn">Skicka</button>
                </div>
            </form>
        </main>
    </>
    )
}