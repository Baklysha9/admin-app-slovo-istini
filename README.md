## Description

Admin panel

## Installation
1. Open terminal in folder where docker-compose.yml

2.
```bash
$ docker compose up -d
```

3. Open minio container -> open browser (http://localhost:8051) -> login (username and password in .env) -> create keys -> change keys in .env file -> restart

4.
```bash
$ docker compose down
```

5.
```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$  docker compose up -d

open localhost:3000
```
