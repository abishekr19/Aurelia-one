import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png' };

const server = createServer(async (request, response) => {
  const requestPath = request.url?.split('?')[0] || '/';
  const relativePath = requestPath === '/' ? 'index.html' : requestPath === '/manus-routes.json' ? 'public/manus-routes.json' : requestPath.replace(/^\/+/, '');
  const safePath = normalize(relativePath).replace(/^\.\.(\/|\\|$)/, '');
  let filePath = join(root, safePath);
  try {
    let content;
    try {
      content = await readFile(filePath);
    } catch {
      if (extname(requestPath)) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }
      filePath = join(root, 'index.html');
      content = await readFile(filePath);
    }
    const type = mime[extname(filePath)] || 'text/plain; charset=utf-8';
    response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    response.end(content);
  } catch {
    if (extname(requestPath)) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => console.log(`Aurelia listening on 0.0.0.0:${port}`));
