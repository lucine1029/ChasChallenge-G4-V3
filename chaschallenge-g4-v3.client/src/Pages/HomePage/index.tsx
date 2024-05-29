import '../../scss/Sass-Pages/_homePageTwo.scss';
import logo from './logo.png';
import mainImage from '../../../public/babster-stork.webp';
import spenatmonster from '../../../public/spenatmonster.webp';

export default function HomePageTwo() {
  return (
    <div className='babster'>
      <header className='header'>
        {/* <img src={} alt='Babster Logo' className='logo' /> */}
        <span className='logo'>Babster</span>
        <button className='header-button'>Logga in</button>
      </header>
      <div className='main-image-container'>
        <div className='image-overlay'>
          <img src={mainImage} alt='Main' className='main-image' />
        </div>
      </div>
      <main>
        <div className='content'>
          <h1>En enklare vardag för nyblivna föräldrar</h1>
          <p>
            Babster hjälper nyblivna föräldrar i vardagen med svar på frågor om
            allt från vad ditt barn kan äta vid olika åldrar till blöjor,
            konflikter och uppfostran. Endast din fantasi sätter gränserna.
          </p>
          <div className='buttons'>
            <a href='#' className='primary-button'>
              Kom igång
            </a>
            <a href='#' className='secondary-button'>
              Prova på
            </a>
          </div>
          <div className='question-section'>
            <h2>
              <img
                src={spenatmonster}
                alt='Question'
                className='question-icon'
              />
              Kan min bäbis äta spenat?
            </h2>
            <p>
              Det kan vara tufft att vara nybliven förälder. Det är många frågor
              i början. Med hjälp av AI och rätt källor kan du få snabba
              pålitliga svar i vardagen. <br />
              <br />
              Kan din bäbis äta spenat? Lägg inte energi på att googla, fråga ai
              och få svar direkt. Välkommen till Babster.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
