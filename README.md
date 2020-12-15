# skyspecs-code-challenge

## Backend Setup

### DB Setup

- Install PostgreSQL
- Modify the `postgres` user password to be `SkySpecs4078ExtraordinarilySecure`
  - Or update `setup-db.sh` and `index.js` to replace `SkySpecs4078ExtraordinarilySecure` with your `postgres` user's password.
- Run bash scripts/setup-db.sh

### Server/API Setup

- Install Node.js + NPM

```sh
cd backend
npm install
`node index.js` # assumes port 3001 is available
```

## Frontend Setup

- Install Yarn

```sh
cd frontend
yarn install
yarn start # assumes port 3000 is available to hot reload and serve the frontend bundle
```
