ADR-009: Job Search Preferences

Status

Accepted

Context

The ProfessionalProfile entity currently represents the core professional identity of a candidate.

It contains:

- ProfileId
- DesiredPosition
- Skills

The next step is to represent the candidate’s preferences regarding the type and conditions of employment.

These preferences are part of the candidate’s professional profile because they describe what kind of work the candidate is looking for rather than a specific job vacancy.

The application should be able to evolve its job-matching logic without coupling the domain model to a particular job board, external API, or database representation.

Therefore, job search preferences should be represented explicitly in the domain model.

Decision

We will model job search preferences as part of ProfessionalProfile.

The initial preference model will contain three concepts:

1. LocationPreference
2. WorkMode
3. EmploymentType

LocationPreference

LocationPreference represents where the candidate is willing to work.

It will initially support:

- remote
- onsite location
- hybrid location

The model should remain extensible so that multiple locations and more sophisticated geographic preferences can be introduced later without breaking the core domain model.

WorkMode

WorkMode represents the preferred way of working:

- REMOTE
- HYBRID
- ONSITE

It will be modeled as a Value Object or domain type rather than an arbitrary string.

EmploymentType

EmploymentType represents the preferred employment arrangement.

The initial model will support:

- FULL_TIME
- PART_TIME
- CONTRACT

Additional employment types may be introduced later if required by the domain.

Design Principles

The domain model will not depend on:

- database-specific representations;
- Prisma models;
- external job-board APIs;
- UI-specific types;
- provider-specific terminology.

The domain will use explicit types and invariants so that invalid preference values cannot enter the domain model unnoticed.

The model should also avoid premature complexity.

For example, we will not introduce detailed geographic entities, salary preferences, commuting distance, visa requirements, or complex availability rules until actual application requirements justify them.

Consequences

Positive

- ProfessionalProfile explicitly represents important job-search preferences.
- Job matching will have domain-level concepts instead of raw strings.
- Invalid values can be rejected at the domain boundary.
- The model remains independent of infrastructure and external job boards.
- Future matching functionality can build upon stable domain concepts.

Negative

- Additional Value Objects/domain types increase the number of files and tests.
- The model is initially more explicit than a simple collection of strings.
- Some concepts may need to be refined as the application requirements become clearer.

Implementation Strategy

The implementation will follow TDD.

For each new domain concept:

1. Write the failing test.
2. Implement the minimum behavior required to pass the test.
3. Refactor while keeping all tests green.
4. Integrate the concept into ProfessionalProfile.
5. Run the complete test suite and lint.

The initial implementation order will be:

LocationPreference
↓
WorkMode
↓
EmploymentType
↓
ProfessionalProfile

Each concept will be introduced independently and committed as a coherent change.

Alternatives Considered

Store preferences as strings

Rejected.

Using arbitrary strings such as "remote" or "full-time" would allow invalid domain states and move validation into application or infrastructure code.

Store preferences directly as database enums

Rejected.

The domain model should not depend on Prisma or PostgreSQL implementation details.

Introduce a large JobSearchPreferences object immediately

Rejected for now.

Although such an abstraction may become useful later, introducing it before the actual matching requirements are known would add unnecessary complexity.

We will introduce abstractions when they provide clear domain value.

Related Decisions

- ADR-007: User Entity
- ADR-008: ProfessionalProfile Entity
