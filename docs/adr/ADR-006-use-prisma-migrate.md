ADR-006: Use Prisma Migrate

Status

Accepted

Context

Database schema changes must be version-controlled, reproducible and easy to apply on every development environment.

The migration history should become part of the project history.

Decision

Use Prisma Migrate as the primary mechanism for database schema evolution.

Every intentional schema change will generate a migration committed to the repository.

Alternatives Considered

prisma db push

Useful for experimentation but unsuitable as the primary workflow because it does not maintain migration history.

Manual SQL migrations

Provides maximum flexibility but increases maintenance effort and complexity for this project.

Consequences

Positive

- Version-controlled schema
- Reproducible environments
- Easy onboarding
- Reliable migration history

Negative

- Additional migration files
- Requires migration discipline
