# CoTip
Here we forge a new way to organize testing for the dangerous Corona virus. Knowledge is key in this battle to save our endangered grandparents.

## Deployment
1) Clone the repo. Make sure `docker`, `docker-compose` & `certbot` is installed on your server.
2) Fetch your server's SSL certificates using [certbot](https://certbot.eff.org/).
3) Create a `.env` file & set the following environment variables:
```bash
SESSION_SECRET_KEY=... # Used by the database to encrypt session cookies
POSTGRES_PASSWORD=...
POSTGRES_USER=postgres
POSTGRES_DB=corona_atlas
DB_CREATION_CREDS=postgres://postgres:YOUR_CREDENTIALS@db:5432/corona_atlas
DB_READ_CREDS=postgres://postgres:YOUR_CREDENTIALS@db:5432/corona_atlas
DOMAIN=... # Your domain (e.g. www.cotip.de)
CERTIFICATE_PATH=... # Path to your certificates, e.g. /etc/letsencrypt/live/www.cotip.de
```

To start the container in detached mode, simply run from within the `corona-atlas` directory.
```
sudo docker-compose up -d
```
Your app will now be exposed on ports `80` (301 redirect to port `443`) and port `443`.

## Frontend Development
Frontend development is straightforward. The frontend is built with [`create-react-app`](https://github.com/facebook/create-react-app).
1. Clone the repository
2. `cd` into `frontend`.
3. `npm install`.
4. `npm run start`.

## Backend Development

Build cmd
```bash
docker build -t corona-atlas-backend .
```

Run server locally
```bash
docker run -it --env SESSION_SECRET_KEY="your super secret key" -p 8080:8080 corona-atlas-backend
```

Local development
```bash
# install pipenv
pip install pipenv

# install dependencies
pipenv install

# start local dev server
export FLASK_APP=app.py
export FLASK_DEBUG=1
export SESSION_SECRET_KEY="something"

pipenv run flask run
```
