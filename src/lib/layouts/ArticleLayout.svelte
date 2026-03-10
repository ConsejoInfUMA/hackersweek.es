<script lang="ts">
  import type { Snippet } from "svelte";
  import { Temporal } from "temporal-polyfill-lite";

  interface Props {
    title: string;
    description: string;
    children: Snippet;
    presenter?: string;
    location?: string;
    organization?: string;
    date: string;
    start: string;
    end: string;
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
    <event-info>
      {#if props.presenter}
        <address>
          👥
          {props.presenter}
          {#if props.organization}
            ({props.organization})
          {/if}
        </address>
      {/if}
      {#if props.location}
        <p>📍 {props.location}</p>
      {/if}
      <p>
        📅
        <time datetime="{props.date}T{props.start}">
          {Temporal.PlainDateTime.from(props.date).toLocaleString("es", {
            day: "numeric",
            month: "long",
          })}
          {props.start}
        </time>
        -
        <time datetime={props.end}>{props.end}</time>
      </p>
    </event-info>
    {@render props.children?.()}
  </article>
</main>
<hr role="none" />

<style>
  * {
    --transparent-border: 1px solid color-mix(in srgb, gray 50%, Canvas);
  }

  article {
    display: flow-root;
    border-left: var(--transparent-border);
    border-right: var(--transparent-border);
    margin: 0 auto;
    width: 1000px;
    max-width: calc(100% - 96px);
    text-align: justify;
    padding: 32px;
    padding-bottom: 16px;
    h1:first-of-type {
      text-align: center;
      text-wrap: balance;
      color: var(--primary);
      font-size: 2.5em;
      margin-top: 0;
    }
    address {
      font-size: larger;
    }
    @media (width < 768px) {
      padding: 16px;
      max-width: calc(100% - 64px);
    }

    & > :global(picture) {
      float: right;
      max-width: 100%;
      height: auto;
      border: var(--border);
      margin: 20px;
      margin-top: 0;
      :global(img) {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }

  main {
    display: block;
    border-top: var(--transparent-border);
    border-bottom: var(--transparent-border);
  }

  event-info {
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    font-weight: bold;
    text-align: center;
    & > p {
      font-size: 1.2em;
      margin: 10px 0;
    }
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
