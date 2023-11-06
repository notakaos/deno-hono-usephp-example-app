/** @jsx jsx */
import { Context, Hono } from "https://deno.land/x/hono@v3.9.2/mod.ts";
import { FC, html, jsx } from "https://deno.land/x/hono@v3.9.2/middleware.ts";
import { usePHP } from "https://deno.land/x/use_php@v1/mod.ts";

const app = new Hono();

const Layout: FC = ({ children }) => {
  return html`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
};

app.get("/", (c: Context) =>
  c.html(
    <Layout>
      <h1>Hello, Hono!</h1>
      <a href="/phpinfo">phpinfo</a>
    </Layout>,
  ));

app.get("/phpinfo", async (c: Context) => {
  const php = await usePHP(c.req.raw, jsx);
  return c.html(
    <Layout>
      {await php`
        <?php phpinfo(); ?>
      `}
    </Layout>,
  );
});

Deno.serve(app.fetch);
