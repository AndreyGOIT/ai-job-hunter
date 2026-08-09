ADR-008: ProfessionalProfile as a Separate Domain Entity

Status

Accepted

Context

The User Entity represents the identity of a person using the AI Job Hunter application.

The application also needs to represent professional information used for job searching, vacancy matching, CV generation, and cover-letter generation.

This information is conceptually different from user identity and is expected to evolve independently.

Potential professional information includes:

- desired position;
- professional summary;
- skills;
- work experience;
- education;
- projects;
- employment preferences;
- other information relevant to job matching and document generation.

Adding these properties directly to the User Entity would gradually give User responsibilities beyond user identity.

The domain therefore requires a separate concept representing the user’s professional profile.

Decision

We will model ProfessionalProfile as a separate Domain Entity associated with User.

The initial ProfessionalProfile will contain only the information required at the current stage of the project:

- ProfileId — unique identity of the professional profile;
- UserId — identity of the associated user;
- DesiredPosition — the position or type of position the user is seeking;
- Summary — a short professional summary.

The initial relationship is:

User
│
│ 1
│
│ owns
│
│ 0..1
▼
ProfessionalProfile

A User may exist without a ProfessionalProfile.

ProfessionalProfile has its own identity and lifecycle.

The profile will reference the user through UserId rather than holding a direct reference to the User Entity.

Domain Model

The initial model is:

┌───────────────────────────┐
│ User │
│ │
│ UserId │
│ Email │
│ Language │
└─────────────┬─────────────┘
│
│ owns
│
▼
┌───────────────────────────┐
│ ProfessionalProfile │
│ │
│ ProfileId │
│ UserId │
│ DesiredPosition │
│ Summary │
└───────────────────────────┘

Responsibilities

ProfessionalProfile is responsible for representing professional information belonging to a user.

It is not responsible for:

- authentication;
- authorization;
- persistence;
- vacancy searching;
- AI processing;
- CV document rendering;
- cover-letter generation.

Those responsibilities belong to other application or infrastructure components.

Value Objects

The initial implementation will use the following Value Objects:

ProfileId

Provides type-safe identity for the ProfessionalProfile Entity.

DesiredPosition

Represents the type of position the user is seeking.

The Value Object will encapsulate validation and normalization rules instead of exposing a primitive string directly in the Entity.

Summary

Represents the user’s professional summary.

The Value Object will encapsulate validation rules such as acceptable length and empty-value handling.

Consequences

Positive

- User remains focused on identity and account-level concerns.
- Professional information has an explicit domain boundary.
- The profile can evolve independently from the user identity.
- Vacancy matching can operate on professional information without making User responsible for matching.
- CV and cover-letter generation can consume the profile as a domain concept.
- The model remains independent of Prisma and PostgreSQL.
- Additional professional concepts can be introduced incrementally.

Negative

- The domain contains an additional Entity.
- Persistence requires a relationship between users and profiles.
- Some application use cases will need to work with both UserId and ProfileId.
- Additional mapping code will eventually be required between the domain model and Prisma.

These costs are accepted because they provide a clearer domain boundary and prevent the User Entity from becoming a large aggregate of unrelated concerns.

Alternatives Considered

1. Store professional information directly in User

Rejected because this would mix identity/account concerns with professional-domain concerns and make User increasingly difficult to maintain.

2. Model ProfessionalProfile as a Value Object

Rejected because the profile has its own identity and lifecycle and is expected to evolve independently.

3. Create all professional sub-entities immediately

For example:

ProfessionalProfile
├── Skills
├── Experiences
├── Education
├── Projects
└── Preferences

Rejected because those concepts are not yet required by an implemented use case.

They will be introduced when the corresponding domain requirements become concrete.

This follows the YAGNI principle.

Identity

ProfileId will be generated outside the ProfessionalProfile Entity, following the same approach already established for UserId.

The Entity receives an already-created ProfileId during construction.

Testing Strategy

The initial implementation will follow a TDD-oriented approach.

The Value Objects will be developed first:

ProfileId
DesiredPosition
Summary

For each Value Object:

1. Define expected behavior.
2. Write tests.
3. Implement the minimum required behavior.
4. Run the tests.
5. Refactor if necessary.

After the Value Objects are established, tests will be written for the ProfessionalProfile Entity itself.

Related Decisions

- ADR-002: Clean Architecture
- ADR-006: Prisma
- ADR-007: User as a Domain Entity

Date

2026-08-09
