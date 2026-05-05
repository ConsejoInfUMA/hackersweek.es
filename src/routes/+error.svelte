<script lang="ts">
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>{page.status} | Hackers Week</title>
</svelte:head>

<main>
  {#if page.status === 404}
    <enhanced:img
      src="$lib/assets/404.jpg"
      alt="Gato escondido. 404 Not Found"
    />
    <p>Parece que la página que buscas no existe.</p>
    <p>Si lo deseas, puedes <a href="/">volver a la página principal</a>.</p>
  {:else}
    <h1>Error {page.status}</h1>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/VHw7rEtawsM?si=0kQBlbXpKXb8NP02&amp;start=51"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
    <p>{page.error?.message}</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
  }
  h1 {
    font-size: 3em;
    font-family: "Nevis";
    text-align: center;
    text-transform: uppercase;
  }
  enhanced\:img {
    height: auto;
    max-width: 100%;
  }
  iframe {
    max-width: 100%;
  }
</style>
