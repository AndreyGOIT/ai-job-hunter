ADR-010: Job Posting Domain Model

Status

Accepted

Context

AI Job Hunter needs to represent job vacancies as domain objects.

The ProfessionalProfile entity represents the candidate and their professional preferences, but it does not represent individual job opportunities.

Job vacancies may originate from different external sources such as job boards, company career pages, APIs, or future integrations.

The domain model must therefore represent a job vacancy independently from the source from which it was obtained.

The application will later need to compare job vacancies with a candidate's ProfessionalProfile. This matching logic should operate on explicit domain concepts rather than raw external API responses.

Decision

We will introduce JobPosting as the domain representation of a job vacancy.

JobPosting will represent the essential information required by the domain for job discovery and matching.

The initial model will contain:

1. JobPostingId
2. Title
3. Company
4. Location
5. WorkMode
6. EmploymentType
7. Description
8. Source

JobPostingId

JobPostingId uniquely identifies a job posting inside the domain.

The identifier must be independent of any external job-board identifier.

Title

Title represents the advertised position title.

Company

Company represents the organization offering the position.

Location

Location represents the geographical location associated with the position.

WorkMode

WorkMode represents how the work is performed:

- REMOTE
- HYBRID
- ONSITE

The existing WorkMode Value Object will be reused.

EmploymentType

EmploymentType represents the employment arrangement:

- FULL_TIME
- PART_TIME
- CONTRACT

The existing EmploymentType Value Object will be reused.

Description

Description contains the job description available to the domain.

The initial implementation will not attempt to parse or structure every part of a job description.

Source

Source identifies where the job posting originated.

The domain will represent the source explicitly but will not depend on a particular job board, API, scraper, or infrastructure implementation.

Design Principles

The JobPosting domain model will not depend on:

- Prisma models;
- database-specific types;
- external job-board API response types;
- scraping implementations;
- UI-specific types.

External adapters are responsible for translating external job data into JobPosting.

JobPosting will not contain references to ProfessionalProfile.

Matching between a candidate and a job posting will be implemented as separate domain behavior.

Initial Scope

The initial implementation will focus on representing a valid JobPosting.

The model will not initially include:

- salary;
- benefits;
- required skills as structured objects;
- seniority;
- application deadline;
- recruiter information;
- application URL;
- detailed geographic constraints;
- AI-generated matching scores.

These concepts may be introduced later when actual application requirements justify them.

Implementation Strategy

The implementation will follow TDD.

For each new domain concept:

1. Write the failing test.
2. Implement the minimum behavior required to pass the test.
3. Refactor while keeping all tests green.
4. Run the complete test suite and lint.
5. Commit the coherent change.

The initial implementation order will be:

JobPostingId
↓
JobPosting Entity
↓
JobPosting behavior
↓
Integration with future job-source adapters

Existing domain Value Objects such as WorkMode and EmploymentType will be reused rather than duplicated.

Consequences

Positive

- Job vacancies become explicit domain concepts.
- The domain remains independent from external job boards.
- Future job-source adapters can translate external data into a stable domain model.
- Job matching can be implemented independently from data acquisition.
- Existing Value Objects can be reused.

Negative

- The domain gains another Entity and additional tests.
- Some fields may require refinement as real job sources are integrated.
- The initial model deliberately contains less information than external job postings may provide.

Alternatives Considered

Store external job-board responses directly

Rejected.

External API and scraping models should not become the application's domain model.

Store jobs as generic database records

Rejected.

The domain requires explicit concepts and invariants rather than infrastructure-shaped data structures.

Put matching logic inside ProfessionalProfile

Rejected.

ProfessionalProfile represents the candidate. Matching is a relationship between a candidate and a JobPosting and should therefore remain separate from either entity.

Introduce an AI-generated JobMatch object immediately

Rejected for now.

Matching behavior should be introduced only after JobPosting and the candidate profile have stable domain representations.

Related Decisions

- ADR-007: User Entity
- ADR-008: ProfessionalProfile Entity
- ADR-009: Job Search Preferences
