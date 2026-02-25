<script lang="ts">
  import { Temporal } from "temporal-polyfill-lite";

  interface ArticlePage {
    title: string;
    description: string;
    presenter: string;
    organization?: string;
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
          {article.presenter}
          {#if article.organization}
            ({article.organization})
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
