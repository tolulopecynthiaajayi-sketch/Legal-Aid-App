# Legal Tech App - Project Management Checklist (Application Creation Flow)

This document serves as the step-by-step roadmap for building the MVP of the Legal Tech App.

## Phase 1: Project Scaffolding & Setup
- [ ] Initialize frontend application (Next.js with TypeScript and TailwindCSS).
- [ ] Initialize backend application (Node.js/Express or Python/FastAPI) *OR* set up Backend-as-a-Service (Supabase/Firebase).
- [ ] Set up the database schema based on the Technical Requirements (PostgreSQL).
- [ ] Configure Git repository, linking frontend and backend (if monolithic) or setting up monorepo/separate repos.
- [ ] Set up CI/CD pipelines (GitHub Actions) for automated testing and deployment.
- [ ] Configure environment variables for development, staging, and production.
- [ ] Implement robust error monitoring and logging (e.g., Sentry).

## Phase 2: Design System & Shared Components (Frontend)
- [ ] Install component library (e.g., shadcn/ui or Radix UI).
- [ ] Define color palette, typography, and spacing variables in Tailwind config.
- [ ] Build reusable UI components (Buttons, Inputs, Modals, Cards, Tables, Navbars).
- [ ] Implement dark/light mode toggle (optional but recommended for modern apps).
- [ ] Create layout wrappers for authenticated vs. unauthenticated pages.

## Phase 3: Authentication & Authorization (Core)
- [ ] Integrate Authentication provider (e.g., Supabase Auth, Firebase Auth, NextAuth).
- [ ] Implement Sign-up/Registration flow (Email/Password, Google/Apple OAuth).
- [ ] Implement Login/Sign-in flow.
- [ ] Implement Password Reset flow.
- [ ] Configure Role-Based Access Control (RBAC):
    - [ ] Role: `Admin` (Full system access)
    - [ ] Role: `Lawyer` (Access to Private Track clients and assigned NGO cases)
    - [ ] Role: `Client` (View-only access for personal case tracking)
    - [ ] Role: `Volunteer/NGO` (Access to intake forms, restricted view of overall cases)
- [ ] Build protected routes/middleware to enforce RBAC on the frontend.

## Phase 4: Primary Core - Legal Aid & Prisoner Intake
- [ ] Build API endpoints for Case Intake (POST /intake).
- [ ] Integrate SMS/USSD provider (e.g., Africa's Talking) for low-tech intake (Prisoners).
- [ ] Create API webhook to receive SMS/USSD inputs and auto-generate basic prisoner case profiles.
- [ ] Develop internal Intake Form for NGO volunteers/Admins to manage prisoner digital files.
- [ ] Develop DIY Intake Form for Private Track Clients (SMEs/Diaspora).

## Phase 5: Secondary Core - Commercial Case & Legal Project Management
- [ ] **Database & APIs:**
    - [ ] Define schemas/models for `Matters`, `Documents`, `Tasks`, `TimelineEvents`.
    - [ ] Build CRUD (Create, Read, Update, Delete) APIs for these entities.
- [ ] **Lawyer Dashboard UI:**
    - [ ] Implement "Case/Matter Assignment" Marketplace view.
    - [ ] Build "My Matters" list view with filtering and sorting.
    - [ ] Create robust "Matter Details" adaptive view (Litigation vs. Non-Litigation).
- [ ] **Interactive Timeline & Tasks:**
    - [ ] Develop UI to log timeline events and audit trails.
    - [ ] Develop Task & Calendar sub-system (To-Dos mapped to deadlines).
- [ ] **Secure Document Vault:**
    - [ ] Integrate cloud storage bucket (AWS S3/Supabase Storage) for file uploads.
    - [ ] Build file upload component (drag & drop support).
    - [ ] Build file listing, categorization, and download features.
- [ ] **Internal Notes & Collaboration:**
    - [ ] Develop private commenting interface tied to specific matters.

## Phase 6: Core Module - Notification & Communication Hub
- [ ] Integrate third-party messaging service (Twilio/WhatsApp/Africa's Talking).
- [ ] Build backend workers/cron jobs to trigger automated reminders (e.g., upcoming hearing).
- [ ] Create webhook endpoints for automated client status checking (WhatsApp bot query).
- [ ] Implement in-app notifications system (Header bell icon) for real-time updates.

## Phase 7: Baseline Sustainability Features (MVP Commerce/Trust)
- [ ] Design and implement simple Lawyer Verification workflow (Admin approval dashboard).
- [ ] Build public Lawyer Profiles and Rating/Review submission UI for clients.
- [ ] Integrate Payment Gateway (Paystack/Flutterwave) for Private Track Subscriptions.
- [ ] Set up subscription webhooks to handle payment successes and failures.

## Phase 8: Testing, Review, & Deployment
- [ ] Write Unit tests for critical backend functions (Auth, Payments, Case creation).
- [ ] Write Integration/End-to-End tests for critical user flows (Login -> Create Case -> Upload Doc).
- [ ] Perform security audit (check RBAC rules, SQL injection, secure headers).
- [ ] Deploy Application to production environments (e.g., Vercel for Frontend, Render/Railway for Backend, managed PostgreSQL).
- [ ] Conduct final User Acceptance Testing (UAT) with stakeholders.
- [ ] Go Live (MVP Launch).
