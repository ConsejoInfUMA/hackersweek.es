<script lang="ts">
  import { PUBLIC_EVENT_ONGOING } from "$env/static/public";
  import { Temporal } from "temporal-polyfill-lite";

  interface ArticlePage {
    title: string;
    description: string;
    presenter?: string;
    organization?: string;
    draft?: boolean;
    date: string;
    start: string;
    end: string;
  }

  const files = import.meta.glob<true, string, ArticlePage>("./*/+page.svx", {
    import: "metadata",
    eager: true,
  });

  const articles: Record<string, (ArticlePage & { slug: string })[]> = {};
  const SLUG_REGEX = /[^/]+(?=\/\+page\.svx$)/;

  for (const [path, metadata] of Object.entries(files)) {
    if (metadata.draft) {
      continue;
    }

    const slug = SLUG_REGEX.exec(path)?.[0]!;
    articles[metadata.date] ??= [];

    let i = 0;
    while (
      i < articles[metadata.date].length &&
      Temporal.PlainTime.compare(
        metadata.start,
        articles[metadata.date][i].start,
      ) > 0
    ) {
      i++;
    }

    articles[metadata.date].splice(i, 0, { ...metadata, slug });
  }
</script>

<svelte:head>
  <title>Eventos | Hackers Week</title>
  <meta
    name="description"
    content="Información sobre actividades de la Hackers Week"
  />
</svelte:head>

<main>
  <h1>Eventos</h1>
  {#if PUBLIC_EVENT_ONGOING}
    <opinion-form>
      <p>
        Si ya has acudido a alguno de los eventos de esta edición, rellena
        nuestra encuesta de calidad!
      </p>
      <a href="https://u.uma.es/hAm" target="_blank">
        <button>Encuesta de Calidad</button>
      </a>
    </opinion-form>
  {/if}
  {#each Object.entries(articles).toSorted() as [date, articleList]}
    <h2>
      <time datetime={date}>
        {Temporal.PlainDate.from(date).toLocaleString("es", {
          day: "numeric",
          weekday: "long",
          month: "long",
        })}
      </time>
    </h2>
    {#each articleList as article}
      <article>
        <a href="/events/{article.slug}">
          <h3>{article.title}</h3>
        </a>
        <strong>
          <time datetime={article.start}>{article.start}</time> -
          <time datetime={article.end}>{article.end}</time>
        </strong>
        <address>
          {#if article.presenter}
            {article.presenter}
            {#if article.organization}
              ({article.organization})
            {/if}
          {:else if article.organization}
            {article.organization}
          {/if}
        </address>
        <p>{article.description}</p>
      </article>
    {/each}
  {/each}
</main>

<style>
  main {
    margin: 0 auto;
    margin-bottom: 32px;
    width: 1000px;
    max-width: 100%;
  }
  article {
    padding: 16px;
    background-color: var(--secondary-background);
  }
  opinion-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    border: var(--border);
    background-color: var(--secondary-background);
    padding-bottom: 12px;
  }
  h1 {
    font-size: 3em;
    font-family: "Nevis";
    color: var(--primary);
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
  h2 {
    text-transform: capitalize;
    margin-left: 20px;
  }
  h3 {
    font-size: x-large;
    margin: 5px 0;
  }
  article {
    border: var(--border);
    &:has(+ article) {
      border-bottom: 0;
    }
    padding: 20px;
  }
  strong {
    font-size: larger;
  }
</style>
