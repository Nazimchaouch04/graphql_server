# Enterprise Unified GraphQL Gateway

An enterprise-ready, high-performance API Gateway designed to unify heterogeneous data structures (Legacy REST APIs & Predictive Microservices) into a single, secure, and optimized GraphQL endpoint.

## 🚀 Key Architectural Features Implemented

*   **Clean Architecture:** Strict decoupling between the network layer (GraphQL Type Definitions), business logic (Resolvers), and data infrastructure (Services).
*   **N+1 Performance Fix (DataLoader):** Implemented request batching and caching mechanisms via Facebook's `dataloader`. Reduced downstream microservice traffic from N+1 network requests down to a single optimized batch execution.
*   **API Security (Contextual Guard):** Secured API orchestration layer using standard GraphQL Error protocols and conditional context filters to parse incoming HTTP headers for explicit authentication.

## 🛠️ Tech Stack & Protocols

*   **Runtime:** Node.js (v24+) with native ES Modules (ESM)
*   **API Server:** Apollo Server v4
*   **Performance Engineering:** DataLoader (Batching & Caching)
*   **Security:** API Key Validation / HTTP Header Inspection

## 📦 Local Setup & Execution

1. Clone the repository and install the production dependencies:
   ```bash
   npm install
   ```

2. Execute the production gateway instance:
   ```bash
   node src/app.js
   ```

3. Open your browser and navigate to `http://localhost:4005/` to interact with the system.

⚠️ **Security Note:** In order to bypass the gateway's security layer and successfully run queries, you must append the following authentication key to your client HTTP headers:
*   **Header Key:** `x-api-key`
*   **Header Value:** `PROD_SECRET_GATEWAY_KEY_2026`

## 📊 Performance Benchmarks (REST vs Optimized GraphQL Gateway)

| Query Context | Database / Microservice Hits | Network Payload Efficiency | Overfetching Risk |
| :--- | :--- | :--- | :--- |
| **Traditional REST Approach** | N + 1 Requests (Unoptimized) | Fixed JSON Block (Heavy) | High (Returns unused data) |
| **Our Unified GraphQL Gateway** | **1 Batched Request (DataLoader)** | **Dynamic Selection (Light)** | **0% (Zero Overfetching)** |
