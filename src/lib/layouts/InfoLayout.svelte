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

<hr role="none" />
<main>
  <article>
    <h1>{props.title}</h1>
    {#if props.presenter}
      <address>
        {props.presenter}
        {#if props.organization}
          ({props.organization})
        {/if}
      </address>
    {/if}
    {@render props.children?.()}
  </article>
</main>
<hr role="none" />

<style>
  * {
    --transparent-border: 1px solid color-mix(in srgb, gray 50%, Canvas);
  }

  article {
    border-left: var(--transparent-border);
    border-right: var(--transparent-border);
    margin: 0 auto;
    width: 1000px;
    max-width: calc(100% - 96px);
    text-align: justify;
    padding: 32px;
    h1:first-of-type {
      text-align: center;
      font-size: 2.5em;
    }
    @media (width < 768px) {
      padding: 16px;
      max-width: calc(100% - 64px);
    }
  }

  main {
    display: block;
    border-top: var(--transparent-border);
    border-bottom: var(--transparent-border);
  }

  hr {
    display: block;
    border-left: var(--transparent-border);
    border-right: var(--transparent-border);
    border-top: none;
    border-bottom: none;
    margin: 0 auto;
    width: 1064px;
    max-width: calc(100% - 32px);
    height: 100px;
    @media (width < 768px) {
      height: 16px;
    }
  }
</style>
