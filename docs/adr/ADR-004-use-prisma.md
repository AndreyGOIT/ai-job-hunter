ADR-004: Use Prisma ORM

Status

Accepted

Context

The application requires a modern ORM with excellent TypeScript integration, database migrations, and strong developer experience.

The focus of the project is implementing business functionality rather than writing database infrastructure code.

Decision

Use Prisma ORM together with PostgreSQL.

Prisma will be responsible for:

- schema definition
- database migrations
- type-safe queries
- client generation

Alternatives Considered

Drizzle ORM

Modern and lightweight, but currently has a smaller ecosystem and fewer learning resources.

TypeORM

Mature and familiar, but less aligned with the modern Next.js ecosystem and no longer the preferred choice for new projects of this type.

Consequences

Positive

- Excellent TypeScript support
- Great Developer Experience
- Simple schema management
- Reliable migrations
- Strong Next.js ecosystem integration

Negative

- Additional abstraction layer
- Some complex SQL queries may require raw SQL
