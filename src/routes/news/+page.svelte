<script lang="ts">
  import { Temporal } from "temporal-polyfill-lite";

  interface ArticlePage {
    title: string;
    description: string;
    date: string;
  }

  const files = import.meta.glob<true, string, ArticlePage>("./*/+page.svx", {
    import: "metadata",
    eager: true,
  });

  const articles: (ArticlePage & { slug: string })[] = [];
  const SLUG_REGEX = /[^/]+(?=\/\+page\.svx$)/;

  for (const [path, metadata] of Object.entries(files)) {
    const slug = SLUG_REGEX.exec(path)?.[0]!;

    let i = 0;
    while (
      i < articles.length &&
      Temporal.PlainDateTime.compare(metadata.date, articles[i].date) > 0
    ) {
      i++;
    }

    articles.splice(i, 0, { ...metadata, slug });
  }
</script>

<svelte:head>
  <title>Noticias | Hackers Week</title>
  <meta name="description" content="Anuncios recientes de la Hackers Week" />
</svelte:head>

<main>
  <h1>Noticias</h1>
  {#each articles as article}
    <article>
      <a href="/news/{article.slug}">
        <h2>{article.title}</h2>
      </a>
      <strong>
        <time datetime={article.date}
          >{Temporal.PlainDateTime.from(article.date).toLocaleString("es", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</time
        >
      </strong>
      <p>{article.description}</p>
    </article>
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
