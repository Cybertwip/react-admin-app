import { IS_PRODUCTION } from "./settings"

export const CRUD_URL_USERS = IS_PRODUCTION ? 
'https://postgres-api-server.herokuapp.com/crud/users' : 
"http://localhost:5000/crud/users"

export const CRUD_URL_TASKS = IS_PRODUCTION ? 
'https://postgres-api-server.herokuapp.com/crud/tasks' : 
"http://localhost:5000/crud/tasks"

export const GRAPHQL_URL = IS_PRODUCTION ? 
'https://postgres-api-server.herokuapp.com/graphql' : 
"http://localhost:5000/graphql"
