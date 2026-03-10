<script lang="ts">
  // if you aren't me and you're reading the code: good luck!

  // super duper bleeding edge
  import { Temporal } from "temporal-polyfill-lite";

  interface ArticlePage {
    title: string;
    presenter: string;
    organization?: string;
    type: "ponencia" | "taller" | "actividad" | "torneo";
    draft?: boolean;
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

  const articles: Record<string, (Article | Article[])[]> = {};
  const activities: Article[] = [];
  const tournaments: Article[] = [];
  for (const time of times) {
    articles[time.toString({ smallestUnit: "minute" })] = [];
  }

  const SLUG_REGEX = /[^/]+(?=\/\+page\.svx$)/;
  for (const [path, metadata] of Object.entries(files)) {
    if (metadata.draft) {
      continue;
    }

    const slug = SLUG_REGEX.exec(path)?.[0]!;

    const date = Temporal.PlainDate.from(metadata.date);
    const start = Temporal.PlainTime.from(metadata.start);
    const end = Temporal.PlainTime.from(metadata.end);

    if (metadata.type === "actividad" || metadata.type === "torneo") {
      let i = 0;
      if (metadata.type === "actividad") {
        while (
          i < activities.length &&
          Temporal.PlainDateTime.compare(
            `${metadata.date}T${metadata.start}`,
            `${activities[i].date}T${activities[i].start}`,
          ) > 0
        ) {
          i++;
        }
        activities.splice(i, 0, { ...metadata, slug, date, start, end });
      } else {
        while (
          i < tournaments.length &&
          Temporal.PlainDateTime.compare(
            `${metadata.date}T${metadata.start}`,
            `${tournaments[i].date}T${tournaments[i].start}`,
          ) > 0
        ) {
          i++;
        }
        tournaments.splice(i, 0, { ...metadata, slug, date, start, end });
      }
      continue;
    }

    let i = 0;
    const dates = Object.keys(articles);
    while (
      dates[i] in articles &&
      Temporal.PlainTime.compare(start, times[i]) > 0
    ) {
      i++;
    }

    // meet potential article
    const potentialArticle = articles[dates[i]][date.dayOfWeek - 1];
    if (Array.isArray(potentialArticle)) {
      (articles[dates[i]][date.dayOfWeek - 1] as Article[]).push({
        ...metadata,
        slug,
        date,
        start,
        end,
      });
    } else if (potentialArticle) {
      articles[dates[i]][date.dayOfWeek - 1] = [
        {
          ...metadata,
          slug,
          date,
          start,
          end,
        },
        potentialArticle,
      ];
    } else {
      articles[dates[i]][date.dayOfWeek - 1] = {
        ...metadata,
        slug,
        date,
        start,
        end,
      };
    }
  }

  function getSpan(duration: Temporal.Duration): number {
    const comparison = Temporal.Duration.compare(
      duration,
      Temporal.Duration.from({ minutes: 45 }),
    );
    return comparison > 0 ? 2 : 1;
  }
</script>

<h3>Ponencias y Talleres</h3>
<table-container>
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
            {#if Array.isArray(article)}
              <td rowspan={getSpan(article[0].end.since(article[0].start))}>
                {#each article as articleForReal}
                  <div>
                    <p>
                      <a href="/events/{articleForReal.slug}">
                        {articleForReal.title}
                      </a>
                    </p>
                    {#if articleForReal.organization}
                      <small>{articleForReal.organization}</small>
                    {/if}
                  </div>
                {/each}
              </td>
            {:else}
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
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</table-container>
<secondary-events>
  <div>
    <h3>Actividades</h3>
    {#each activities as activity}
      <article>
        <span>
          <a href="/events/{activity.slug}">
            <h4>{activity.title}</h4>
          </a>
          {#if activity.organization}
            <small>{activity.organization}</small>
          {/if}
        </span>
        <strong>
          <p>
            {activity.date.toLocaleString("es", {
              weekday: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <time
              datetime="{activity.date.toString()}T{activity.start.toString()}"
            >
              {activity.start.toString({ smallestUnit: "minutes" })}
            </time>
            -
            <time
              datetime="{activity.date.toString()}T{activity.end.toString()}"
            >
              {activity.end.toString({ smallestUnit: "minutes" })}
            </time>
          </p>
        </strong>
      </article>
    {/each}
  </div>
  <div>
    <h3>Torneos</h3>
    {#each tournaments as tournament}
      <article>
        <span>
          <a href="/events/{tournament.slug}">
            <h4>{tournament.title}</h4>
          </a>
          {#if tournament.organization}
            <small>{tournament.organization}</small>
          {/if}
        </span>
        <strong>
          <p>
            {tournament.date.toLocaleString("es", {
              weekday: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <time
              datetime="{tournament.date.toString()}T{tournament.start.toString()}"
            >
              {tournament.start.toString({ smallestUnit: "minutes" })}
            </time>
            -
            <time
              datetime="{tournament.date.toString()}T{tournament.end.toString()}"
            >
              {tournament.end.toString({ smallestUnit: "minutes" })}
            </time>
          </p>
        </strong>
      </article>
    {/each}
  </div>
</secondary-events>

<style>
  table-container {
    display: block;
    height: auto;
    max-width: 75%;
    overflow-x: auto;
    @media (width < 768px) {
      max-width: calc(100% - 16px);
    }
  }

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
        background-color: light-dark(#eeeeee, #222222);
      }
      &:nth-child(even) {
        background-color: light-dark(#fafafa, #2e2e2e);
      }
    }
    th,
    td {
      padding: 0.6em;
      text-align: center;
      text-wrap: balance;
      border: var(--border);
      div {
        display: table-cell;
        vertical-align: middle;
      }
    }
    p {
      margin: 0;
    }
  }

  small {
    color: light-dark(#111111, lightgray);
  }

  secondary-events {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: center;
    width: 100%;
    & > div {
      width: min(400px, 100%);
    }
    h3 {
      text-align: center;
    }
    span {
      margin: 1em 0;
    }
    small {
      margin-top: 0.4em;
    }
    h4 {
      font-size: 1.2em;
      margin: 0;
      max-width: 400px;
    }
    strong {
      text-transform: capitalize;
      text-align: end;
    }
    p {
      margin: 14px 0;
      &:last-child {
        text-wrap: nowrap;
      }
    }
    article {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1em;
      padding: 0 16px;
      justify-content: space-between;
      border: var(--border);
      border-bottom: none;
      background-color: light-dark(#eeeeee, #222222);
      &:nth-child(odd) {
        background-color: light-dark(#fafafa, #2e2e2e);
      }
      &:last-child {
        border-bottom: var(--border);
      }
    }
  }
</style>
