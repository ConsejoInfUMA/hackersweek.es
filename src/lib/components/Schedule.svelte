<script lang="ts">
  // if you aren't me and you're reading the code: good luck!

  // super duper bleeding edge
  import { Temporal } from "temporal-polyfill-lite";

  interface ArticlePage {
    title: string;
    presenter: string;
    organization?: string;
    date: string;
    start: string;
    end: string;
  }

  interface Article {
    slug: string;
    title: string;
    presenter: string;
    organization?: string;
    date: Temporal.PlainDate;
    start: Temporal.PlainTime;
    end: Temporal.PlainTime;
  }

  const files = import.meta.glob<true, string, ArticlePage>(
    "../../routes/events/*/+page.svx",
    {
      import: "metadata",
      eager: true,
    },
  );

  const times = ["10:45", "11:45", "17:30", "18:30"].map((t) =>
    Temporal.PlainTime.from(t),
  );

  const articles: Record<string, Article[]> = {};
  for (const time of times) {
    articles[time.toString({ smallestUnit: "minute" })] = [];
  }

  const SLUG_REGEX = /[^/]+(?=\/\+page\.svx$)/;
  for (const [path, metadata] of Object.entries(files)) {
    const slug = SLUG_REGEX.exec(path)?.[0]!;

    const date = Temporal.PlainDate.from(metadata.date);
    const start = Temporal.PlainTime.from(metadata.start);
    const end = Temporal.PlainTime.from(metadata.end);

    let i = 0;
    const dates = Object.keys(articles);
    while (
      dates[i] in articles &&
      Temporal.PlainTime.compare(start, times[i]) > 0
    ) {
      i++;
    }

    articles[dates[i]][date.dayOfWeek - 1] = {
      ...metadata,
      slug,
      date,
      start,
      end,
    };
  }

  function getSpan(duration: Temporal.Duration): number {
    const comparison = Temporal.Duration.compare(
      duration,
      Temporal.Duration.from({ minutes: 45 }),
    );
    return comparison > 0 ? 2 : 1;
  }
</script>

<table>
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Lunes</th>
      <th scope="col">Martes</th>
      <th scope="col">Miércoles</th>
      <th scope="col">Jueves</th>
      <th scope="col">Viernes</th>
    </tr>
  </thead>
  <tbody>
    {#each Object.entries(articles) as [time, articleList]}
      <tr>
        <th>
          {time}
          -
          {Temporal.PlainTime.from(time)
            .add(Temporal.Duration.from({ minutes: 45 }))
            .toString({ smallestUnit: "minutes" })}
        </th>
        {#each articleList as article}
          <td rowspan={getSpan(article.end.since(article.start))}>
            <p>
              <a href="/events/{article.slug}">
                {article.title}
              </a>
            </p>
            {#if article.organization}
              <small>{article.organization}</small>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    table-layout: fixed;
    min-width: 1000px;
    width: 100%;
    border-collapse: collapse;
    & > tbody > tr {
      & > th {
        font-size: 1.25em;
        text-wrap: nowrap;
      }
      &:nth-child(odd) {
        background-color: light-dark(#eeeeee, #333333);
      }
      &:nth-child(even) {
        background-color: light-dark(#ffffff, #3e3e3e);
      }
    }
    th,
    td {
      padding: 0.6em;
      text-align: center;
      text-wrap: balance;
      border: var(--border);
    }
    p {
      margin: 0;
    }
    small {
      color: light-dark(#111111, lightgray);
    }
  }
</style>
