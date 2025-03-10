# BASIC banking project 

## Features

1. Add income
2. Add expenses
3. Track Balance
4. Basic Reports

## Mysql Schema

1. User
   1. id (uuid/int)
   2. name (varchar)
   3. email (varchar)
   4. email_verified_at (timestamp)
   5. password (varchar)
   6. created_at (timestamp)
   7. updated_at (timestamp)
   
2. Balance
   1. id (uuid / int)
   2. user_id
   3. amount (integer [should be stored in cents])
   4. description (varchar)
   5. type (enum [deposit / withdraw])
   6. created_at (timestamp)

## Stack

### Backend
1. Express
2. MySQL
3. SequelizeORM

### Frontend
1. React
2. TBD

### Others
1. Jest for testing
2. E2E testing [Playwright / Cypress]
3. Github actions (For Fun)
4. Static Analysis

POSTMAN API: https://www.postman.com/winter-equinox-993840/workspace/test-project-express