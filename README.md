# corona-atlas
Here we forge a new way to organize testing for the dangerous Corona virus. Knowledge is key in this battle to save our endangered grandparents.

## Deployment
1) Clone the repo. Make sure `docker`, `docker-compose` & `certbot` is installed on your server.
2) Fetch your server's SSL certificates using [certbot](https://certbot.eff.org/).
3) Configure your `.env` file & set the `SESSION_SECRET_KEY` (used by the database to encrypt session cookies).
4) Modify `frontend/nginx-config/corona-atlas.conf` and replace all instances of `www.cotip.de` with your domain, as well as all occurences of `/etc/letsencrypt/live/www.cotip.de-0002/` with your relevant certificate path.

To start the container in detached mode, simply run from within the `corona-atlas` directory.
```
sudo docker-compose up -d
```
Your app will now be exposed on ports `80` (301 redirect to port `443`) and port `443`.

## Python backend

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
