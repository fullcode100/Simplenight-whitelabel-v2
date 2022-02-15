This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# npm version used -> 8.3.0
npm run dev
# or

# yarn version used -> 1.22.17
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Using docker-compose

The docker-compose file is located un `docker/docker-compose.yaml`

To run it detached using a yarn alias use the command:

```bash
# To build, run or reload the container
yarn dev:up

# To stop and remove the container
yarn dev:down
```

To reload the page after files have changed just execute the command again

To run it attached and without yarn use the command:

```bash
docker-compose -f docker/docker-compose.yaml up --build
```

## Using the Dockerfile

The Dockerfile for this project is located in `docker/Dockerfile`

To run it use:

```bash
# Build the image
docker build -t simplenight-whitelabel-v2 . -f docker/Dockerfile

# Deploy the container
docker run -d -p 3000:3000 simplenight-whitelabel-v2
```

## Docs available in this repo

#### [Complete Folder](docs)

- [Generic request to python backend](docs/sequence_diagrams/genericRequestToBackend.txt)


  ![Generic request to python backend](docs/sequence_diagrams/Generic%20request%20to%20python%20backend.png)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
