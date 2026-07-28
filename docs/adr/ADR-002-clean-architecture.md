ADR-002: Adopt Clean Architecture

Status

Accepted

Context

The project is expected to grow over time and include multiple business domains such as user profiles, vacancies, AI services, and application tracking.

Maintaining a clear separation of concerns is essential to keep the codebase maintainable and testable.

Decision

Adopt Clean Architecture as the primary architectural approach.

The application will be organized into logical layers:

- Domain
- Application
- Infrastructure
- Presentation
- Shared

Consequences

Positive

- Better maintainability
- Easier testing
- Improved scalability
- Reduced coupling

Negative

- More initial project structure
- Slightly higher learning curve
