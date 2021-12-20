## Setup Instructions

#### A. MongoDB Database

1. Install MongoDB

#### B. Python/FastAPI Backend

1. Create virtual environment (called "farm_env" or whatever you like) using the requirements.txt

```bash
python3 -m venv farm_env
```

3. Activate the virtual environemnt

```bash
farm_env\Scripts\activate.bat
```

4. Navigate to the root directory (where the three directories backend, database and frontend are present)
5. Install Python packages to the virtual environment

```bash
pip install -r backend/requirements.txt
```

6. Deactivate the virtual environment

```bash
deactivate
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
2. Start MongoDB server

```bash
mongod --dbpath=database
```

3. The MongoDB server will be hosted at its default port 27017

#### B. Python/FastAPI Backend

1. Navigate into /backend directory (where main.py is present)
2. Activate the virtual environemnt

```bash
farm_env\Scripts\activate.bat
```

3. Start FastAPI server

```bash
uvicorn main:app --reload
```

4. The FastAPI server will be hosted at its default port 8000
5. To access SwaggerUI for API testing and documentation, goto [http://localhost:8000/docs](http://localhost:8000/docs)

#### C. React Frontend

1. Navigate to /frontend directory (where package.json is present)
2. Start React Web Application

```bash
npm start
```

3. The React web application will be hosted at its default port 3000, goto [http://localhost:3000/](http://localhost:3000/)
