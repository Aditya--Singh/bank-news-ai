# Bank News AI — Deployment

## 1. Current Status

The application is currently running in a local development environment.

Current components:

```text
React / Vite
        |
        v
FastAPI
        |
        v
SQLAlchemy
        |
        v
SQLite
```

## 2. Local Backend

The backend is currently served at:

```text
http://127.0.0.1:8000
```

FastAPI provides the API endpoints used by the React frontend.

## 3. Local Frontend

The frontend is implemented with React and Vite.

The development frontend is served by Vite, currently using the standard development setup.

The frontend communicates with the FastAPI backend using Axios.

## 4. Current Configuration

The frontend API client currently contains a development base URL:

```javascript
const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});
```

### Planned improvement

Move this to an environment variable, for example:

```text
VITE_API_BASE_URL
```

## 5. Source Control

The project is maintained in Git.

Current branch:

```text
main
```

The project has a GitHub remote configured.

The current development checkpoint is intended to serve as a baseline before the next feature phase.

## 6. Production Deployment — Planned

Production deployment has not yet been implemented.

The eventual deployment should address:

- Production database
- Backend hosting
- Frontend hosting
- Environment configuration
- Secrets management
- CORS
- HTTPS
- Logging
- Monitoring
- Scheduled scraper jobs
- AI processing jobs
- Database backups

## 7. Containerization — Planned

Dockerization has not yet been completed.

A potential production structure is:

```text
+----------------------+
| React frontend       |
+----------+-----------+
           |
           v
+----------------------+
| FastAPI backend      |
+----------+-----------+
           |
     +-----+------+
     |            |
     v            v
 Database     AI pipeline
     ^
     |
 Scraper jobs
```

The final infrastructure and hosting platform have not yet been selected.

## 8. Security

Production security requirements are still pending, including:

- Restricted CORS origins
- Secret/API-key management
- Authentication/authorization where required
- HTTPS
- Database access controls
- Logging and audit controls
