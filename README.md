# frinder

Website for finding friends based on your common interests

## Prerequisites

1. Node.js (v19.x or higher)

# How to run

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `npm run start:dev` to start the server

# To create a new profile

1. Run curl -X POST http://localhost:3000/api/profiles/ -H "Content-Type: application/json" -d '{"name":"meow", "email":"valid@email.com", "hobby":"cats"}'
