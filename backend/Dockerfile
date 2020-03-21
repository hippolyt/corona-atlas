FROM python:3.7

RUN pip install pipenv

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

RUN pipenv install --deploy

COPY . .

CMD ["pipenv", "run", "gunicorn", "app:app", "--bind", "0.0.0.0:8080"]
