<script>
  import HackersWeekMonochrome from "$lib/components/icons/HackersWeekMonochrome.svelte";

  import Aena from "$lib/components/icons/Aena.svelte";
  import EMT from "$lib/components/icons/EMT.svelte";
  import MetroMalaga from "$lib/components/icons/MetroMalaga.svelte";
  import Renfe from "$lib/components/icons/Renfe.svelte";
</script>

<svelte:head>
  <title>Hackers Week</title>
  <meta
    name="description"
    content="Semana cultural de la ETSII sobre informática y nuevas tecnologías."
  />
</svelte:head>

<main>
  <section id="banner">
    <main-text>
      <h1>
        <span class="primary">Hackers</span> <span class="secondary">Week</span>
      </h1>
      <h2>
        <time datetime="2026-03-09">09</time> -
        <time datetime="2026-03-13">13 de Marzo 2026</time>
      </h2>
      <a href="#timetable">
        <button>Horario</button>
      </a>
      <a href="#location">
        <button>Ubicación</button>
      </a>
      <a href="/ponentes">
        <button>Call For Papers</button>
      </a>
    </main-text>
    <HackersWeekMonochrome height="400" />
  </section>
  <section id="timetable">
    <h2>Horario</h2>
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Lunes</th>
          <th scope="col">Martes</th>
          <th scope="col">Miércoles</th>
          <th scope="col">Jueves</th>
          <th scope="col">Viernes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">10:45 - 11:30</th>
          <td rowspan="2">
            Quijotes contra Gigantes: los nuevos retos de la Ciberseguridad
          </td>
          <td rowspan="2">
            Hackers en Wall Street: Tecnología de Trading y Ciberseguridad en
            Cripto y Mercados Financieros
          </td>
          <td>Bits y bases: de la secuencia genética al dato</td>
          <td>Informática forense aplicada a imágenes</td>
          <td rowspan="2">Podcasteando con Amigos</td>
        </tr>
        <tr>
          <th scope="row">11:45 - 12:30</th>
          <td>
            IA y LLMs: Un Atajo Eficiente entre los Datos y las Decisiones
          </td>
          <td>
            Robótica Móvil y Percepción Artificial en el Ámbito de la Salud
          </td>
        </tr>
        <tr>
          <th scope="row">17:30 - 18:15</th>
          <td rowspan="2">
            Ciberinteligencia 101; de tener un VPS a detectar una ciberoperación
            rusa
          </td>
          <td rowspan="2">Trading Cripto: Desde las APIs hasta el Código</td>
          <td>Descubre el Poder de la IA Generativa con Microsoft Azure</td>
          <td>Computación Cuántica: un nuevo reto en Ciberseguridad</td>
          <td rowspan="2">-</td>
        </tr>
        <tr>
          <th scope="row">18:30 - 19:15</th>
          <td>Privacidad y Anonimato para Dummies</td>
          <td>Ingeniería de la Salud: Del aula a la industria</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section id="location">
    <h2>Zona</h2>
    <enhanced:img
      src="$lib/assets/map.webp"
      alt="Mapa desde arriba de la Escuela Técnica Superior de Ingeniería Informática"
    />
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
    &:nth-child(odd) {
      background-color: var(--main-background);
    }
  }

  #banner {
    display: flex;
    height: 500px;
    align-items: center;
    justify-content: center;
    & > main-text {
      margin: 0 0 0 100px;
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
      & > :is(h1, h2) {
        margin: 0;
      }
      & > h1 {
        font-size: 5em;
        padding-top: 30px;
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
    }
    & > :global(svg) {
      color: light-dark(#e6e6e6, #333333);
      transform: rotate(10deg);
    }
  }

  #timetable {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 75px;
    align-items: center;
    justify-content: center;
    & > h2 {
      color: var(--primary);
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
      font-size: 4em;
      margin: 0 0 0.5em 0;
    }
    & > table {
      table-layout: fixed;
      width: 75%;
      border-collapse: collapse;
      & > tbody > tr {
        & > th {
          font-size: 1.25em;
        }
        &:nth-child(odd) {
          background-color: light-dark(#eeeeee, #333333);
        }
        &:nth-child(even) {
          background-color: light-dark(#ffffff, #3e3e3e);
        }
      }
      th,
      td {
        padding: 0.6em;
        text-align: center;
        text-wrap: balance;
        border: var(--border);
      }
    }
  }

  #location {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 75px;
    align-items: center;
    justify-content: center;
    & > h2 {
      color: var(--primary);
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
      font-size: 4em;
      margin: 0 0 0.5em 0;
    }
    /* cannot use & > here because its technically inside a <picture> element */
    picture {
      max-width: 75%;
      margin-bottom: 50px;
    }
    enhanced\:img {
      display: block;
      max-width: 100%;
      height: auto;
    }
    & > div {
      display: grid;
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
