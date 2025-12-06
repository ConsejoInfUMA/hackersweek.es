<!--
  workaround for static export
  https://github.com/sveltejs/kit/issues/10880
-->

<svelte:head>
  <title>404 | Hackers Week</title>
</svelte:head>

<main>
  <enhanced:img src="$lib/assets/404.jpg" alt="Gato escondido. 404 Not Found" />
  <p>Parece que la página que buscas no existe.</p>
  <p>Si lo deseas, puedes <a href="/">volver a la página principal</a>.</p>
</main>

<style>
  main {
    text-align: center;
  }
  enhanced\:img {
    height: auto;
    max-width: 100%;
  }
</style>
