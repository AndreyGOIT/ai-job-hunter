# AI Job Hunter

AI-powered assistant for job search automation, resume optimization and application tracking.

## Overview

AI Job Hunter is a production-oriented full-stack application designed to help software engineers and other professionals manage their entire job search process in one place.

The application combines modern web technologies with AI capabilities to automate repetitive tasks such as vacancy analysis, resume adaptation, cover letter generation, and application tracking.

Besides solving a real-world problem, this project also serves as a portfolio demonstrating software architecture, clean code principles, testing practices, and modern Full Stack development.

---

## Current Status

🚧 Project is under active development.

Current milestone:

- Project initialization
- Development environment setup
- Architecture preparation

---

## Planned Features

### MVP

- Store job vacancies
- Vacancy management
- AI-based vacancy matching
- Resume optimization
- Cover letter generation
- Application tracking

### Future

- Automatic vacancy import
- AI-powered vacancy analysis
- Skill recommendations
- Analytics dashboard
- Reporting
- Workflow automation (n8n)

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Server Actions

### Database

- PostgreSQL
- Prisma ORM

### Testing

- Vitest
- Playwright

### AI

- OpenAI API

### Infrastructure

- Docker
- Docker Compose

---

## Architecture

The project follows modern software engineering principles:

- Clean Architecture
- Domain Driven Design (DDD)
- SOLID
- DRY
- KISS
- YAGNI

The architecture is intentionally designed to allow future extraction of independent services without major refactoring.

---

## Project Structure

```text
app/
docs/
src/
tests/
```

---

## Development Setup

### Prerequisites

Install the following tools:

- Node.js
- npm
- Docker Desktop
- Git

### Environment Variables

Create a `.env` file in the project root.

Configure the required environment variables according to the project's configuration. Do not commit secrets to Git.

The local database configuration uses:

- PostgreSQL 17
- Host address: `127.0.0.1`
- Host port: `5433`
- PostgreSQL container port: `5432`

Ensure that `DATABASE_URL` points to the PostgreSQL instance on port `5433`.

### Install Dependencies

```bash
npm install
```

### Start PostgreSQL

Start the database container:

```bash
docker compose up -d
```

Check the container status:

```bash
docker compose ps
```

Wait until PostgreSQL reports a healthy status before proceeding.

### Initialize the Database

Apply existing migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

### Run the Application

Start the development server:

```bash
npm run dev
```

### Run Tests

Execute the test suite:

```bash
npm test
```

### Run TypeScript Checks

```bash
npx tsc --noEmit
```

### Database Schema Changes

For intentional schema changes during local development:

1. Update `prisma/schema.prisma`.
2. Create and apply a migration:

   ```bash
   npx prisma migrate dev --name describe_your_change
   ```

3. Commit the migration files together with the corresponding schema and code changes.

Use Prisma Migrate as the primary mechanism for database schema evolution. Do not use `prisma db push` as the standard migration workflow.

---

## Development Roadmap

See:

- `docs/ROADMAP.md`
- `docs/adr/`

---

## Development Philosophy

The project is developed iteratively.

Each feature follows the same workflow:

1. Requirements analysis
2. Architecture discussion
3. Implementation
4. Testing
5. Refactoring
6. Documentation
7. Git commit

---

## License

MIT (planned)
