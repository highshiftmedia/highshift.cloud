# Social OAuth Backend & Post API

A unified social media API that handles OAuth2 authentication, token management, and cross-platform publishing. Designed to be a drop-in "One API" solution for your content management needs.

## 🚀 Features

*   **Unified OAuth Flow**: Connect Twitter, Facebook, Instagram, LinkedIn, and YouTube.
*   **Token Management**: Automatically handles refresh tokens and secure storage (AES-256).
*   **Simple API**: One endpoint to post to all connected platforms.
*   **Dashboard**: Included React frontend to manage connections.
*   **Secure**: API Key authentication for external clients.

## 📚 Documentation

Full API documentation, including authentication details and endpoint usage, is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🛠️ Setup & Running Locally

1.  **Backend Setup**
    ```bash
    # Install dependencies
    npm install
    
    # Configure Environment
    cp .env.example .env
    # Edit .env with your MongoDB URI and Social Client credentials
    
    # Start Server
    npm run dev
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  **Visit Dashboard**
    Open `http://localhost:5173` to connect your accounts and generate your API Key.

## 🐳 Production Deployment

The project is containerized using Docker.

1.  **Build & Run with Docker Compose**
    ```bash
    docker-compose up --build -d
    ```
    The application will be available at `http://localhost:3000`.

2.  **Manual Build**
    ```bash
    # Build Frontend
    cd frontend && npm install && npm run build
    
    # Build Backend
    cd .. && npm install --production
    
    # Start
    npm start
    ```
