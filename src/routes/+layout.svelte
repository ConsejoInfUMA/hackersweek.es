<script lang="ts">
  import Moon from "@lucide/svelte/icons/moon";
  import Sun from "@lucide/svelte/icons/sun";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import type { FormEventHandler } from "svelte/elements";
  import favicon from "$lib/assets/icon.svg";
  import Logo from "$lib/components/Logo.svelte";

  const oninput: FormEventHandler<HTMLInputElement> = (e) =>
    localStorage.setItem("theme", e.currentTarget.id);

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="color-scheme" content="light dark" />
</svelte:head>

<header>
  <a href="/"><Logo height="34" /></a>
  <nav>
    <a href="/">Noticias</a>
    <a href="/">Prensa</a>
    <a href="/">Noticias 2</a>
    <a href="/">Archivos</a>
  </nav>
  <theme-picker aria-label="Selector de temas" role="radiogroup">
    <label aria-label="Predeterminado">
      <input type="radio" name="theme" id="system" {oninput} checked />
      <SunMoon />
    </label>
    <label aria-label="Claro">
      <input type="radio" name="theme" id="light" {oninput} />
      <Sun />
    </label>
    <label aria-label="Oscuro">
      <input type="radio" name="theme" id="dark" {oninput} />
      <Moon />
    </label>
  </theme-picker>
  <script>
    // needs to be an inline script so that it runs asap
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.getElementById(theme).checked = true;
    }
  </script>
</header>
{@render children()}

<style>
  @font-face {
    font-family: "Nevis";
    src: url("/fonts/Nevis.woff2") format("woff2");
    font-display: swap;
  }

  /*
    theme selector in pure css. yes, really
    adapted from https://lyra.horse/blog/2025/08/you-dont-need-js/
  */
  :global :root {
    &:has(#light:checked) {
      color-scheme: light;
    }
    &:has(#dark:checked) {
      color-scheme: dark;
    }

    --primary: light-dark(#15274c, white);
    --secondary: light-dark(#1da0ba, white);
    --main-background: light-dark(#ffffff, #1a1a1a);
    --secondary-background: light-dark(#f0f0f0, #222222);

    --border: 1px solid gray;

    font-family: sans-serif;
    background-color: var(--secondary-background);
  }

  :global body {
    margin: 0;
  }

  :global button {
    border-radius: 0;
    border: var(--border);
    background-color: var(--secondary-background);
    font-size: 1.5em;
    font-weight: bold;
    padding: 10px 20px;
    &:hover {
      background-color: color-mix(
        in oklab,
        var(--secondary-background),
        currentColor 15%
      );
    }
    &:active {
      background-color: color-mix(
        in oklab,
        var(--secondary-background),
        currentColor 20%
      );
    }
  }

  header {
    height: 60px;
    background-color: var(--main-background);
    border-bottom: var(--border);
    display: flex;
    position: sticky;
    top: 0;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    gap: 4px;
    & > a {
      padding: 8px;
      margin-left: -8px;
    }
    & > nav {
      font-family: Nevis, sans-serif;
      text-transform: uppercase;
    }
  }

  theme-picker {
    display: flex;
    & > label {
      padding: 10px;
      background-color: #00000022;
      box-shadow: inset 0px 0px 1.2px 0px black;
      cursor: pointer;
      &:first-child {
        border-radius: 0.5rem 0 0 0.5rem;
      }
      &:last-child {
        border-radius: 0 0.5rem 0.5rem 0;
      }
      &:has(input:focus-visible) {
        outline: 2px solid #000;
      }
      &:hover {
        background-color: #0004;
      }
      &:active {
        background-color: #0006;
      }
      & > input {
        /* allow screen reader to still access these */
        opacity: 0;
        position: absolute;
        pointer-events: none;
      }
      & > :global(svg) {
        display: block;
      }
    }
  }
</style>
