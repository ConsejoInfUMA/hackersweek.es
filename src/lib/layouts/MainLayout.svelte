<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    description: string;
    children: Snippet;
    presenter?: string;
    organization?: string;
  }

  let props: Props = $props();
</script>

<svelte:head>
  <title>{props.title} | Hackers Week</title>
  <meta name="description" content={props.description} />
</svelte:head>

<main>
  <article>
    <h1>{props.title}</h1>
    {@render props.children()}
  </article>
</main>

<style>
  main {
    margin: 0 auto;
    width: 1000px;
    max-width: calc(100% - 64px);
    padding: 32px;
  }
  h1:first-of-type {
    font-size: 3em;
    font-family: "Nevis";
    text-align: center;
    text-transform: uppercase;
  }
</style>
