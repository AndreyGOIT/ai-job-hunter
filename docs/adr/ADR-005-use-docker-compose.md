ADR-005: Use Docker Compose for Local Development

Status

Accepted

Context

The project requires a reproducible local development environment that can be started on any machine with minimal setup.

The infrastructure is expected to grow over time and may include additional services such as Redis, Mailpit, n8n or other supporting components.

Decision

Use Docker Compose to orchestrate all local infrastructure services.

Initially Docker Compose will manage only PostgreSQL, but the architecture should allow additional services to be added without changing the development workflow.

Alternatives Considered

Local installation

Simple for a single developer, but introduces differences between environments and complicates onboarding.

Dev Containers

A good solution for some teams, but unnecessary for the current stage of the project.

Consequences

Positive

- Consistent development environment
- Easy onboarding
- Isolated infrastructure
- Easy scaling by adding new services
- No dependency on locally installed database software

Negative

- Requires Docker Desktop
- Slightly higher memory usage
