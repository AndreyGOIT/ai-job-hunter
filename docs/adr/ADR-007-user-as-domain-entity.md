ADR-007: User as a Domain Entity

Status

Accepted

Context

AI Job Hunter needs a domain representation of the person using the application.

The user is not only a persistence record. The user represents an identifiable participant in the application’s domain and will be referenced by other domain concepts, including the professional profile, vacancies, applications, and generated documents.

The application therefore needs a domain-level User abstraction with a stable identity and a clearly defined set of domain properties.

The domain model should distinguish between:

- the identity of the user;
- the user’s email address;
- the user’s preferred language;
- other professional information that will be introduced later.

Decision

We will model User as the first domain Entity of the AI Job Hunter application.

The User Entity will have its own identity represented by the UserId Value Object.

The initial User model contains:

- UserId — unique identity of the user;
- Email — user’s email address;
- Language — user’s preferred application language.

The initial relationship between the Entity and its Value Objects is:

User
├── UserId
├── Email
└── Language

UserId is created outside the User Entity and passed to User.create(...).

This follows the chosen approach where the caller is responsible for generating the identity, while the User Entity is responsible for representing a valid user with that identity.

User equality is based on identity:

User A.id == User B.id
↓
same Entity

Two users with different UserId values are considered different Entities, regardless of whether their other properties are equal.

Consequences

Positive

- User has a stable and explicit domain identity.
- Entity equality follows standard DDD identity semantics.
- UserId is isolated from persistence-specific identifiers.
- Email and language validation remain encapsulated in their respective Value Objects.
- The User Entity remains small and focused.
- Other domain Entities can reference the user through UserId.
- The model is independent of Prisma and PostgreSQL.

Negative

- The domain model contains more types than a simple database-oriented model.
- Creating a user requires constructing the appropriate Value Objects.
- Persistence mapping will later require explicit mapping between Prisma models and domain objects.

These costs are accepted because they preserve the domain boundary and make business logic easier to test independently from infrastructure.

Alternatives Considered

1. Use a primitive string as the user identifier

For example:

type User = {
id: string;
email: string;
};

Rejected because primitive strings do not communicate their domain meaning and allow unrelated identifiers to be mixed accidentally.

2. Use database-generated IDs directly

For example, letting PostgreSQL or Prisma generate the identifier.

Rejected at the domain-model level because the domain should not depend on the persistence mechanism.

Database-generated identifiers may still be used as part of the infrastructure implementation, provided that the domain remains independent from Prisma and PostgreSQL.

3. Use email as the user’s identity

Rejected because an email address represents contact information, not necessarily the permanent identity of the domain Entity.

An email address may change during the lifetime of a user.

4. Generate UserId inside User.create()

Rejected for the current design.

The application layer or another responsible component will create the identity and pass it to the Entity.

This keeps identity generation separate from the Entity’s responsibility and makes the creation process explicit and testable.

Domain Model

The initial domain model is:

┌──────────────────────────────┐
│ User │
│ │
│ identity: UserId │
│ email: Email │
│ language: Language │
└──────────────────────────────┘
│
├── UserId
├── Email
└── Language

Implementation Notes

The initial User Entity intentionally contains only the information required at this stage.

Professional information such as:

- desired position;
- professional summary;
- skills;
- work experience;
- education;
- projects;

will not be added to User preemptively.

These concepts will be modeled separately when the corresponding domain requirements are introduced.

Related Decisions

- ADR-002: Clean Architecture
- ADR-004: PostgreSQL
- ADR-006: Prisma

Date

2026-08-09
