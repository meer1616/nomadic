# Nomadic

**Nomadic** is a platform that allows users to explore and book various travel packages and share their travel experiences through blog posts. Whether you're an adventurer, leisure traveler, or cultural explorer, Nomadic offers a user-friendly experience to plan your perfect trip while connecting with a community of like-minded travelers.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [NodeJS](https://nodejs.org/en) `v16.x`
- [npm](https://www.npmjs.com/) `v9.x`
  OR
- [yarn](https://www.npmjs.com/) `v1.x`

## Getting Started

### Languages and Frameworks Used

```
1. React
2. Node and npm
3. Typescript
```

```
Libraries Used
1) Material UI
2) Tailwind css
3) Chakra UI
4) Axios
5) react-hook-form
```

```
Database
1) Postgres
```

### Installation steps

Follow these steps to set up and run the project locally.

#### 1. Clone the Repository

Clone with HTTPS:

```bash
 git clone https://github.com/meer1616/nomadic.git
```

OR

Clone with SSH:

```bash
git clone git@github.com:meer1616/nomadic.git
```

### Installation for Frontend

#### 1. Navigate to the frontend directory

```bash
cd nomadic/frontend
```

#### 2. Install required dependencies

```bash
npm install
```

OR

```bash
yarn
```

#### 3. Run the project

```bash
npm run dev
```

Open your web browser and navigate to http://localhost:5173.

### Installation for Backend

#### 1. open another terminal

```bash
cd nomadic/backend
```

#### 2. Create .env file and add these fields with its value

```bash
DATABASE_URL=
JWT_SECRET =
MAIL_USERNAME =
MAIL_PASSWORD =
MAIL_HOST=
```

#### 3. Install dependencies

```bash
npm install
```

OR

```bash
yarn
```

#### 4. Start the backend development server

```bash
npm run dev
```

OR

```bash
yarn dev
```

- Server will start on [http://localhost:8000](http://localhost:8000).

## Built With

- [Node.js](https://nodejs.org/en) - Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

- [React.js](https://react.dev/) - React.js is a popular JavaScript library for building user interfaces.

## External Dependencies

- [express](https://www.npmjs.com/package/express) - npm package that provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.
- [Material UI](https://material-ui.com/) - Material UI is a popular React UI framework that provides pre-built components and styling for creating modern and responsive user interfaces.
- [Chakra UI](https://chakra-ui.com/) - Chakra UI is a simple and modular component library for building React applications.
- [Axios](https://www.npmjs.com/package/axios) Axios is JS library used for making HTTP requests from the browser or Node.js. It provides an easy-to-use API and supports features like request and response interception, automatic JSON parsing, and error handling.
- [React hook form](https://react-hook-form.com/) React Hook Form is a lightweight library for managing form state in React. It provides an intuitive API for handling form validation, error messages, and form submission.
- [Prisma ORM](https://www.prisma.io/) - Prisma is an open-source database toolkit that provides an Object-Relational Mapping (ORM) layer for Node.js and TypeScript.
- [Postgres](https://www.postgresql.org/) - Postgres is a powerful open-source relational database management system.

## Tools and Technology used

- Vite - Javascirpt bundler to build frontend artifacts [1].
- Netlify - Hosting frontend artifacts [2].
- Docker - Container technology to ship backend images [3].
- AWS RDS - Managed database service [4]
- GCP Cloud Run - Deploying backend docker containers [5].
- GCP Cloud Build - Running backed CI CD pipeline [6].
- GCP Artifact Registry - To store backend docker images [7].
