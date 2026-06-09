# HR Management Backend - FastAPI

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:
```bash
mongod
```

### 3. Run the FastAPI Server
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

## API Endpoints

- POST `/api/auth/signup` - Create new user
- POST `/api/auth/login` - Login user

## Features

- Password hashing with bcrypt
- MongoDB async operations with Motor
- Email validation
- CORS enabled for frontend
