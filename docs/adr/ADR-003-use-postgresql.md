ADR-003: Use PostgreSQL

Status

Accepted

Context

AI Job Hunter is intended to become a production-quality web application with AI integration, structured relational data, and future scalability.

The database should be reliable, well supported, and suitable both for local development and future production deployment.

Decision

Use PostgreSQL as the primary relational database management system.

During development PostgreSQL will run locally inside a Docker container.

The production deployment may use either a managed PostgreSQL service or a self-hosted PostgreSQL instance without requiring application code changes.

Alternatives Considered

MySQL / MariaDB

Well-known and reliable, but PostgreSQL provides stronger support for advanced SQL features and JSON data, making it a better fit for future project evolution.

SQLite

Excellent for prototypes and small applications, but unsuitable as the primary database for the planned architecture and production deployment.

Consequences

Positive

- Excellent Prisma support
- Production-proven
- Rich SQL feature set
- Strong JSON support
- Easy migration from local Docker to production
- Widely used in modern web development

Negative

- Requires a running database server
- Slightly more infrastructure than SQLite
