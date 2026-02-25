<script>
  import HackersWeekMonochrome from "$lib/components/icons/HackersWeekMonochrome.svelte";
  import HackersWeekEdition from "$lib/components/icons/HackersWeekEdition.svelte";

  import Schedule from "$lib/components/Schedule.svelte";

  import Aena from "$lib/components/icons/Aena.svelte";
  import EMT from "$lib/components/icons/EMT.svelte";
  import MetroMalaga from "$lib/components/icons/MetroMalaga.svelte";
  import Renfe from "$lib/components/icons/Renfe.svelte";
</script>

<svelte:head>
  <title>Hackers Week</title>
  <meta
    name="description"
    content="Semana cultural de la ETSII sobre informática y nuevas tecnologías"
  />
</svelte:head>

<main>
  <section id="banner">
    <main-text>
      <h1>
        <span class="primary">Hackers</span> <span class="secondary">Week</span>
        <HackersWeekEdition height="1.13em" />
      </h1>
      <h2>
        <time datetime="2026-03-09">09</time> -
        <time datetime="2026-03-13">13 de Marzo 2026</time>
      </h2>
      <nav>
        <a href="#schedule">
          <button>Horario</button>
        </a>
        <a href="#location">
          <button>Ubicación</button>
        </a>
        <a href="/colaborar">
          <button>Call For Papers</button>
        </a>
      </nav>
    </main-text>
    <HackersWeekMonochrome height="400" />
  </section>
  <section id="info">
    <div>
      <p>
        La <strong>Hackers Week</strong> es la semana cultural de la
        <a href="https://www.uma.es/etsi-informatica/" target="_blank">
          E.T.S. de Ingeniería Informática
        </a>
        de la Universidad de Málaga, organizado por CEETSII, su consejo de estudiantes.
        Cuenta con un amplio horario lleno de actividades, conferencias y talleres,
        sobre temas como la seguridad informática, programación, investigación, videojuegos
        e inteligencia artificial.
      </p>
      <p>
        Además de las actividades anteriormente mencionadas, se ponen a
        disposición espacios habilitados con videojuegos, juegos de mesa o
        juegos de rol y también se realizan torneos y competiciones.
      </p>
    </div>
    <figure>
      <enhanced:img
        src="$lib/assets/etsii.jpg?w=800;400"
        width="400"
        sizes="400px"
        alt="Edificio de la ETSII"
      />
      <figcaption>
        <small>
          Imagen:
          <a
            href="https://commons.wikimedia.org/wiki/User:Gvillalobos"
            target="_blank"
          >
            User:Gvillalobos
          </a>
          con licencia
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
            target="_blank"
          >
            CC BY-SA 4.0
          </a>
        </small>
      </figcaption>
    </figure>
  </section>
  <section id="schedule">
    <h2>Horario</h2>
    <table-container>
      <Schedule />
    </table-container>
  </section>
  <section id="location">
    <h2>Zona</h2>
    <figure>
      <enhanced:img
        src="$lib/assets/map.webp?w=1642;821"
        width="821"
        alt="Mapa desde arriba de la ETSII"
        sizes="821px"
      />
      <figcaption>
        <a href="https://youtu.be/UxNUhgNQrYQ" target="_blank">Mapa</a> desde arriba
        de la ETSII
      </figcaption>
    </figure>
    <div>
      <div>
        <EMT width="50" />
        <h3>Bus</h3>
        <p>Líneas 11, 18, 22</p>
        <p>Parada: Louis Pasteur</p>
      </div>
      <div>
        <MetroMalaga width="50" />
        <h3>Metro</h3>
        <p>Línea 1</p>
        <p>Parada: Clínico</p>
      </div>
      <div>
        <Renfe width="50" />
        <h3>Tren</h3>
        <p>Estación de Málaga-María Zambrano</p>
      </div>
      <div>
        <!-- less width so that it looks more consistent visually -->
        <Aena width="40" />
        <h3>Aeropuerto</h3>
        <p>Línea Aeropuerto a centro de la ciudad / metro</p>
      </div>
    </div>
  </section>
</main>

<style>
  main > section {
    border-bottom: var(--border);
    & > h2 {
      color: var(--primary);
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
      font-size: 4em;
      margin: 0 0 0.5em 0;
    }
    &:nth-child(odd) {
      background-color: var(--main-background);
    }
    &:nth-child(even) {
      background-color: var(--secondary-background);
    }
    &:last-of-type {
      border-bottom: none;
    }
  }

  #banner {
    display: flex;
    height: 500px;
    max-width: 100%;
    align-items: center;
    justify-content: center;
    @media (width < 768px) {
      overflow: hidden;
    }
    & > main-text {
      margin: 0 0 0 100px;
      @media (width < 768px) {
        margin: 0;
        text-align: center;
        & > nav {
          justify-content: center;
        }
      }
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
      z-index: 1;
      flex: 0 1 auto;
      & > :is(h1, h2) {
        margin: 0;
      }
      & > h1 {
        display: inline-block;
        font-size: 5em;
        padding-top: 30px;
        @media (width < 768px) {
          font-size: 4em;
        }
      }
      & > h2 {
        padding-bottom: 20px;
      }
      .primary {
        color: var(--primary);
      }
      .secondary {
        color: var(--secondary);
      }
      & > nav {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
    & > :global(svg) {
      color: light-dark(#e6e6e6, #333333);
      transform: rotate(10deg);
      flex-shrink: 0;
      @media (width < 768px) {
        max-width: calc(100% - 72px);
        position: absolute;
      }
    }
  }

  #info {
    display: flex;
    text-align: justify;
    font-size: larger;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 32px;
    align-content: flex-start;
    padding: 32px 80px;
    @media (width < 768px) {
      padding: 16px;
      gap: 16px;
    }
    div {
      flex: 1 1 400px;
    }
    figure {
      flex: 0 0 auto;
      margin: 0;
      display: inline-block;
      max-width: 100%;
    }
    enhanced\:img {
      height: auto;
      max-width: 100%;
      display: block;
      border: var(--border);
    }
  }

  #schedule {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 75px;
    align-items: center;
    justify-content: center;
    table-container {
      display: block;
      height: auto;
      max-width: 75%;
      overflow-x: auto;
      @media (width < 768px) {
        max-width: calc(100% - 32px);
      }
    }
  }

  #location {
    display: flex;
    flex-direction: column;
    padding: 50px 16px 75px;
    align-items: center;
    justify-content: center;
    figure {
      margin: 0;
      margin-bottom: 50px;
      max-width: 100%;
      padding: 5px;
      border: var(--border);
      enhanced\:img {
        display: block;
        max-width: 100%;
        height: auto;
        border: var(--border);
      }
      figcaption {
        text-align: center;
        padding: 5px;
        a {
          color: CanvasText;
        }
      }
    }
    & > div {
      display: grid;
      max-width: calc(100% - 32px);
      @media (width < 768px) {
        display: flex;
        flex-direction: column;
        & > div {
          width: 100%;
        }
      }
      grid-template-columns: 1fr 1fr;
      row-gap: 20px;
      background-color: light-dark(#eeeeee, #333333);
      padding: 20px;
      border: var(--border);
      & > div {
        align-self: center;
        display: block;
        & > h3 {
          display: inline;
          color: var(--primary);
          font-family: Nevis, sans-serif;
          text-transform: uppercase;
          font-size: 2.5em;
        }
      }
    }
  }
</style>
