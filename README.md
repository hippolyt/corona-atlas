# corona-atlas
Here we forge a new way to organize testing for the dangerous Corona virus. Knowledge is key in this battle to save our endangered grandparents.


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