<script>
  import IconMonochrome from "$lib/components/IconMonochrome.svelte";
</script>

<svelte:head>
  <title>Hackers Week</title>
  <meta
    name="description"
    content="Semana cultural de la ETSII sobre informática y nuevas tecnologías."
  />
</svelte:head>

<main>
  <big-banner>
    <main-text>
      <h1>
        <span class="primary">Hackers</span> <span class="secondary">Week</span>
      </h1>
      <h2>
        <time datetime="2026-03-09">09</time> -
        <time datetime="2026-03-13">13 de Marzo 2026</time>
      </h2>
    </main-text>
    <IconMonochrome height="400" />
  </big-banner>
  <h1>Welcome to Hackers Week</h1>
  <p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
  </p>
</main>

<style>
  big-banner {
    display: flex;
    height: 500px;
    background-color: var(--main-background);
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid gray;
    & > main-text {
      margin: 0 0 0 100px;
      font-family: Nevis;
      text-transform: uppercase;
      & > :is(h1, h2) {
        margin: 0;
      }
      & > h1 {
        font-size: 5em;
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
</style>
