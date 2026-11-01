// Zero-dependency Node.js static file server for UI Runway

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const ROOT_DIR = path.resolve(__dirname);

const server = http.createServer((req, res) => {
    // Decode URL safely and strip query string
    let rawUrl = (req.url || '/').split('?')[0];
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(rawUrl);
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('400 Bad Request');
        return;
    }

    const relativePath = decodedUrl === '/' ? 'index.html' : decodedUrl.replace(/^[/\\]+/, '');
    const filePath = path.resolve(ROOT_DIR, relativePath);

    // Prevent directory traversal attacks (strict boundary check)
    if (filePath !== ROOT_DIR && !filePath.startsWith(ROOT_DIR + path.sep)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT' || error.code === 'EISDIR') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 File Not Found</h1>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Internal Server Error: ${error.code}\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 UI Runway Server Running at: http://localhost:${PORT}/`);
    console.log(`======================================================`);
    console.log(`Press Ctrl+C to stop the server\n`);
});
