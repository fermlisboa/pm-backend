# PM-Backend



## Getting started

```
git clone https://github.com/fermlisboa/pm-backend.git
```

```
code pm-backend
```

### DevContainer
If you want to use DevContainer, intall the Dev Container extension by Microsoft, and then chose to reopen the application in container.

In this case, the entire environment with Postgres database is available. 

This DevContainer uses all envs setted in the .env.example file

```
yarn install or npm install
```
```
config your .env based in .env.example
```
```
yarn start:dev or npm run dev to run in dev mode
```


## Routes

### User Routes

| Method | Path                                   |
| ------ | -------------------------------------- |
| GET    | http://localhost:3333/user/all         |
| GET    | http://localhost:3333/user/:username   |
| POST   | http://localhost:3333/user             |
| PATCH  | http://localhost:3333/user/:id         |
| DELETE | http://localhost:3333/user/:id         |


### Projects Routes

| Method | Path                                   |
| ------ | -------------------------------------- |
| GET    | http://localhost:3333/project/all      |
| GET    | http://localhost:3333/project          |
| GET    | http://localhost:3333/project/:id      |
| POST   | http://localhost:3333/project          |
| PATCH  | http://localhost:3333/project/:id/done |
| PUT    | http://localhost:3333/project/:id      |
| DELETE | http://localhost:3333/project/:id      |

### Auth Routes

| Method | Path                                   |
| ------ | -------------------------------------- |
| POST   | http://localhost:3333/auth/login       |