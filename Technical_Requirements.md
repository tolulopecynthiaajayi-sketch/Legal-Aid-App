# Legal Tech App - Technical Requirements Document

## 1. Product Overview
The Legal Tech App is designed to democratize access to legal representation in Nigeria. It features a low-tech entry point for prisoners (via SMS/USSD) while providing a robust, dual-track case management backend for lawyers, NGOs, and private clients (SMEs/Diaspora).

## 2. Core Features (Phase 1 MVP)

### 2.1 Case Intake & Registration
*   **Low-Tech Access:** SMS/USSD shortcode integration for prisoners or their families to text a code, auto-generating a basic case profile on the backend.
*   **Digital File Creation:** Intake forms for capturing prisoner/client details, location, and known charges.

### 2.2 Lawyer & Admin Dashboard
*   **Case Assignment:** Marketplace-style view for lawyers to see and assign themselves to available cases.
*   **Case & Legal Project Management Module:** 
    *   **Matter Types:** Support for both Litigation (criminal/civil) and Non-Litigation (corporate, advisory, real estate, contract drafting).
    *   **Matter Details Overview:** Adaptive fields depending on type. Litigation (Jurisdiction, Suit Number, Judge, Opposing Counsel) vs. Corporate (Parties, Counterparties, Deal Size, Transaction Type).
    *   **Interactive Timeline & Project Stages:** Visual tracking of the lifecycle. Litigation (Arrest → Arraignment → Trial) vs. Transactional (Drafting → Review → Negotiation → Execution).
    *   **Secure Document Vault:** Folder structures for categorizing files (e.g., Pleadings, Evidence vs. Term Sheets, Draft Contracts). Must support PDF, image, and Word document uploads.
    *   **Task & Calendar Sub-system:** Ability to create deliverables and to-dos linked directly to calendar deadlines (e.g., "Hearing on Nov 5th" or "Due Diligence completion by Dec 1st").
    *   **Internal Notes & Collaboration:** Private commenting system for the legal team and volunteers to share updates or strategy without notifying the client.

### 2.3 Volunteer & Law Student Portal
*   **Support Tools:** Interfaces for data entry, making follow-up calls, and scheduling.
*   **Role-Based Access:** Restricted access to gain supervised experience without compromising sensitive legal data.

### 2.4 Notification & Communication Hub
*   **Client Updates:** Automated status checking and updates via SMS/WhatsApp bot.
*   **Lawyer Reminders:** Automated notifications for upcoming hearing dates, court deadlines, and meetings.

### 2.5 Baseline Sustainability Features
*   **Lawyer Verification:** Simple integration or manual check with the Nigerian Bar Association (NBA) database to ensure only licensed lawyers are accepted.
*   **Lawyer Rating System:** Allowing clients to rate lawyers to build trust.

## 3. Dual-Track Business Model (Phase 1 MVP)

### 3.1 NGO Track (Pro-Bono / Sponsored)
*   **Target:** Detainees without trial, human rights cases.
*   **Users:** Volunteers, NGOs, Human Rights Lawyers.
*   **Flow:** Arrest → Intake → Lawyer Assigned → Tracked → Resolution.
*   **Revenue:** Grants, CSR, Government Partnerships.

### 3.2 Private Track (Revenue Generator)
*   **Target:** Individuals, SMEs, Diaspora Nigerians.
*   **Features:** DIY case creation, secure recordkeeping, lawyer connection, optional video consultations.
*   **Revenue Models:** 
    *   Subscription: ₦2,000–₦5,000/month per individual.
    *   Pay-per-case: ₦10,000–₦20,000 one-time fee.
    *   Firm Package: ₦50,000+/month for law firms (practice management tool).

## 4. Case Management User Flows

We will prioritize the **Hybrid Mode** as the best fit for the Nigerian market:
1.  **Initiation:** Clients (or NGO volunteers on their behalf) start the case profile with basic info.
2.  **Handoff/Connection:** 
    *   If the client has a lawyer, the system notifies the lawyer to take over.
    *   If the client needs a lawyer, the platform (or NGO team) connects them to a vetted pro-bono or private lawyer.
3.  **Management:** The assigned lawyer handles official document uploads, hearing dates, and legal technicalities.
4.  **Transparency:** Clients receive view-only access and automated updates to track progress without overwhelming the lawyer.

## 5. Advanced Integrations & Future Features (Post-MVP Phase)

To ensure the long-term viability and systemic impact of the platform, the following features are planned for future phases:

### 5.1 Systemic Integrations
*   **Prison System Integration:** Direct APIs/portals connecting to the Nigerian Correctional Service databases to auto-flag detainees held past legal limits without trial.
*   **Court System Integration:** Direct sync with specific local court registries for automated docket pulling and electronic filing (e-Filing).

### 5.2 Advanced Sustainability & Commerce Features
*   **Secure Payment Escrow/Milestones:** For pay-per-case models, payments held in escrow and released upon specific milestone completion (e.g., filing a motion).
*   **Automated Invoicing:** Built-in feature for lawyers to generate/send invoices.
*   **Legal Document Templates Library:** A marketplace to sell standard legal documents (NDAs, tenancy agreements) via form-based generation.
*   **Affiliate/Referral Program:** Incentivizing law firms with discounts for bringing clients or other lawyers to the platform.
*   **Advanced Analytics & Reporting:** Firm-level dashboards with metrics (average case length, billing efficiency) for the ₦50,000+/month tier.

## 6. Proposed Technology Stack

### 6.1 Frontend
*   **Framework:** Next.js (React) or Vite (React).
*   **Styling:** TailwindCSS for rapid, responsive UI development.
*   **Components:** Radix UI or shadcn/ui for accessible, premium dashboard components.

### 6.2 Backend & APIs
*   **Framework:** Node.js (Express/NestJS) or Python (FastAPI/Django).
*   **Database:** PostgreSQL (using Prisma or Drizzle ORM) for structured relational data.
*   **Authentication:** Firebase Auth, Supabase Auth, or NextAuth for secure login and role-based access control (RBAC).
*   **File Storage:** AWS S3 or Firebase Cloud Storage for secure legal document uploads.

### 6.3 Third-Party Integrations
*   **Communication:** Africa's Talking or Twilio for SMS/USSD shortcodes and WhatsApp bot integration. Email via SendGrid or Resend.
*   **Payments:** Paystack or Flutterwave for private track subscriptions and firm packages, and potential escrow holding.

## 7. Security & Compliance
*   **Data Privacy:** Strict role-based access (RBAC) ensuring that volunteers, lawyers, and clients only see authorized data.
*   **Compliance:** Adherence to NDPR (Nigeria Data Protection Regulation) for storing user and case data.
*   **Encryption:** At-rest and in-transit encryption for all uploaded legal documents.
