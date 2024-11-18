# Setup

* create a virtualenv:
    
        python -m venv .venv

* activate the virtual environment:

        .venv\Scripts\activate

* install the required dependencies:

        pip install -r requirements.txt

* create a database:
  * postgres:
    
        psql -U <your_username> -c "create database <your_db_name>"

* create a .env and replace the values:

        DB_NAME=
        DB_USERNAME=
        DB_PASSWORD=
        DB_HOST=
        DB_PORT=
        SECRET_KEY=<secret_key_used_to_sign_the_jwt>

# Development

* after completing the setup step, apply the database migrations


      python manage.py migrate

* you can create a superuser with:

      
    python manage.py createsuperuser

* to start the server run:

    
      python manage.py runserver

* **admin** site is available at **/admin**, **swagger** at **/docs** 