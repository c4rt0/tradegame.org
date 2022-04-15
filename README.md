## Setup Instructions

#### A. MongoDB Database

1. Install MongoDB

Fedora 35 MongoDB installation instruction can be found [HERE](https://c4rt0.github.io/Fedora/), on my GitHub Pages.

2. Install Docker

3. Install docker-compose

#### B. Python/FastAPI Backend

1. Create virtual environment (called "trade_env" or whatever you like)

```bash
python3 -m venv trade_env
```

or \*\*

```bash
virtualenv tradegame_venv
```

3. Activate the virtual environemnt

```bash
trade_env\Scripts\activate.bat
```

or \*\*

```bash
source tradegame_venv/bin/activate
```

4. Navigate to the root directory (where the three directories backend, database and frontend are present)

5. Install Python packages to the virtual environment

```bash
pip install -r backend/requirements.txt
```

If pip doesnt work, use code below and run pip install again:

```bash
python -m pip install -U --force pip
```

#### C. React Frontend

1. Install [Node Package Manager (npm)](https://www.npmjs.com/get-npm)
2. Navigate into /frontend directory (where package.json is present)
3. Install the React dependencies with npm

```bash
npm install
```

<hr>

## Run Instructions

#### A. MongoDB Database

1. Navigate to the root directory (where the three directories backend, database and frontend are present) or start your existing MongoDB server

2. Make sure you have MongoDB installed on your machine and system variable path is set correctly.

Again: [GitHub Pages](https://c4rt0.github.io/Fedora/) regarding MongoDB installation on Fedora 35.

Remember to set up the MongoDB URL and db-name in the /TG-backend/toml.conf file

3. Start MongoDB server with mongod

```bash
mongod --dbpath=database
```

OR

Run :

```bash
docker-compose up
```

This will spin your Docker container with the mongoDB running on it.

(if you modified the docker-compose.yml - also remember to make sure it agrees with the .toml file)

4. The MongoDB server will be hosted at its default port

#### B. Python/FastAPI Backend

1. Navigate into /backend directory (where main.py is present)

2. Activate the virtual environemnt

```bash
trade_env\Scripts\activate.bat
```

or

```bash
trade_env/bin/activate
```

3. Start FastAPI server

```bash
uvicorn main:app --reload
```

If it doesnt work, use:

```bash
python -m uvicorn main:app --reload
```

\*\*\* If above return an error:

```bash
ERROR:    Error loading ASGI app. Could not import module "app".
```

It probably means your database is not running, or you are trying to execute uvicorn server while (with cmd) beeing in the incorrect directory. Your new MongoDB installation might also require super user privelages.

Try:

```bash
sudo mkdir /var/lib/mongodb
sudo mkdir /var/log/mongodb
sudo service mongod start
```

try also:

```bash
sudo service mongod restart
```

then:

```bash
sudo mongod --dbpath=database
```

4. The FastAPI server will be hosted at its default port 3000

5. To access SwaggerUI for API testing and documentation, goto [http://localhost:3000/docs](http://localhost:3000/docs)

#### C. React Frontend

1. Navigate to /frontend directory (where package.json is present)
2. Start React Web Application

```bash
npm start
```

3. The React web application will be hosted at its default port 8000, goto [http://localhost:8000/](http://localhost:8000/)
