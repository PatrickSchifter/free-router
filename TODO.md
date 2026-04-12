# TODO: free-router Project Functionalities

This document outlines the core functionalities to be implemented in the `free-router` NestJS project.

## Core Features:

1.  **Webhook Registration Endpoint:**
    - Description: Allow clients to register a unique URL where they wish to receive asynchronous AI processing results.
    - API: `POST /webhooks/register`
    - Input: `{"url": "https://your-callback-url.com/ai-results"}`
    - Output: `{"message": "Webhook registered successfully.", "webhookId": "uuid-string"}`
    - Persistence: Store `webhookId` and `url` in PostgreSQL via Prisma.

2.  **Asynchronous AI Request Endpoint:**
    - Description: Clients send AI prompts to this endpoint. The request is immediately accepted, and a transaction ID is returned.
    - API: `POST /ai/request`
    - Input: `{"prompt": "What is the capital of France?", "webhookId": "uuid-string", "model": "optional-model-name"}`
    - Output: `{"message": "AI request accepted for processing.", "transactionId": "uuid-string"}`
    - Flow: Saves initial transaction details to DB, then dispatches the request to a BullMQ queue for background processing.

3.  **BullMQ/Redis Message Queue Integration:**
    - Description: Utilizes BullMQ with Redis as the message broker to handle AI requests asynchronously.
    - Components: `AiQueueProducerService` (to add jobs) and `AiQueueConsumerService` (to process jobs).
    - Resilience: Configured with retry mechanisms (exponential backoff) for job processing in case of transient failures.

4.  **Background AI Processing Worker:**
    - Description: A dedicated worker (BullMQ consumer) that fetches AI request jobs from the queue.
    - Logic: Implements retry and fallback logic across multiple AI providers (initially a Mock provider) if delays or 429 errors occur.
    - State Management: Updates the `AiTransaction` status (PENDING, IN_PROGRESS, COMPLETED, FAILED) and stores the AI response/error in PostgreSQL.

5.  **Mock AI Provider with Retry/Fallback Logic:**
    - Description: A `MockAiProvider` that simulates external AI API calls, including variable delays and occasional HTTP 429 (Too Many Requests) or 500 (Internal Server Error) responses.
    - Purpose: Facilitates testing the retry and fallback mechanism without external dependencies.

6.  **Webhook Notification Gateway:**
    - Description: A service (`AiWebhookGateway`) responsible for sending the final AI response or error back to the client's registered webhook URL.
    - Trigger: Called by the background worker upon successful completion or definitive failure of an AI request.
    - Resilience: Includes basic error handling for webhook delivery (e.g., timeouts), with potential for future retry logic.

7.  **Prisma & PostgreSQL for Data Persistence:**
    - Entities:
      - `Webhook`: Stores registered webhook URLs and their unique IDs.
      - `AiTransaction`: Stores details of each AI request, its current status, associated `webhookId`, and the final AI response/error.
    - ORM: Prisma Client for all database interactions.
    - Database: PostgreSQL for reliable data storage.

## Infrastructure (Docker Compose):

- **PostgreSQL Container:** For the database.
- **Redis Container:** For the BullMQ message queue.
- **Docker Compose Configuration:** `docker-compose.yml` to simplify setup and management of these services.

## Next Steps (for User):

1.  **Start Docker Containers:** Run `docker-compose up -d` in the root of the project.
2.  **Run Prisma Migrations:** Execute `npx prisma migrate dev --name init` to create database tables.
3.  **Start NestJS Application:** Run `npm run start:dev` to launch the backend.
