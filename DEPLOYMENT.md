# Self-hosting Beyond Radio on an Ubuntu VPS (Node.js + Nginx)

This project builds to a standalone Node.js server (Nitro `node-server` preset).

## 1. Build

```sh
npm ci
npm run build
```

Output: `.output/` (server bundle at `.output/server/index.mjs`, static assets in `.output/public/`).

## 2. Run

```sh
PORT=3000 HOST=127.0.0.1 npm start
```

`PORT` (default `3000`) and `HOST` are read at runtime — no rebuild needed to change them.

## 3. systemd service

`/etc/systemd/system/beyond-radio.service`:

```ini
[Unit]
Description=Beyond Radio
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/beyond-radio
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=127.0.0.1
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now beyond-radio
```

## 4. Nginx reverse proxy

`/etc/nginx/sites-available/beyond-radio`:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
```

```sh
sudo ln -s /etc/nginx/sites-available/beyond-radio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com -d www.example.com
```

## Notes

- Node.js 20+ is required.
- Deploy by copying `.output/` (plus `package.json` if you use `npm start`) to the server, or build on the server.
- The live audio stream is fetched directly by the browser, so no extra proxy config is needed for it.
