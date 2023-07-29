# Backend Data Handling

## Start server

1. Copy .env.example to .env and update values in .env

```bash
cp .env.example .env
```

2. Run application

```bash
npm run start # for already running pg database

# OR

docker compose up --build

```

3. Test endpoints

- open in browser: `http://localhost:8080/api/v1/docs/` and test on swagger ui
- OR open file `api.http` and test with [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) on VS Code

## How to use

First of all open prefered client to test endpoints. for example Swagger UI/Postman/Rest Client/curl.

### Examples using CURL

1. Register user

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v1/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "dev@pafin.com",
  "name": "developer",
  "password": "stringPassword123"
}'

```

2. Login user

```bash
curl -X 'POST' \
  'http://localhost:8080/api/v1/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "dev@pafin.com",
  "password": "stringPassword123"
}'
```

3. Create User using access token received by loged in

```bash

export token = "<TOKEN HERE FROM STEP 2>"

curl -X 'POST' \
  'http://localhost:8080/api/v1/users' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer '${token}'' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "newuser@pafin.com",
  "name": "new-user",
  "password": "stringPassword123"
}'

```

3. List Users

```bash

curl -X 'GET' \
  'http://localhost:8080/api/v1/users' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer '${token}'' \
  -H 'Content-Type: application/json'
```
