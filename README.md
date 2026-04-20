# AI-First CRM for Healthcare Professionals (HCP)

## Project Overview

This project is an AI-powered Customer Relationship Management (CRM) module designed for healthcare field representatives to log and manage interactions with Healthcare Professionals (HCPs).

Unlike traditional CRM systems that rely on manual form filling, this solution introduces an AI-first interaction model where users can describe interactions in natural language. The system extracts structured data and automatically updates the CRM form in real time.


## Key Features

### Conversational Logging

* Users can log interactions using a chat interface
* Natural language input is converted into structured CRM data

### Smart Form Auto-Fill

The system automatically populates the following fields:

* HCP Name
* Interaction Type
* Date and Time
* Attendees
* Topics Discussed
* Materials Shared
* Samples Distributed
* Sentiment
* Outcomes
* Follow-up Actions

### Real-Time Sync

* Chat input updates the form instantly
* Maintains synchronization between AI and UI

### Chat-Based Editing

* Users can update previously entered data using chat commands

### AI-Driven Insights

* Infers sentiment (Positive, Neutral, Negative)
* Generates follow-up suggestions based on interaction context


## System Architecture

User Chat Input
↓
Frontend (React with Redux)
↓
Backend API (FastAPI)
↓
LangGraph Agent
↓
Tool Execution (Extraction, Logging, Editing)
↓
Structured Data Response
↓
Redux Store Update
↓
Auto-filled CRM Form


## Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Axios
* CSS (Inter font)

### Backend

* FastAPI (Python)
* LangGraph (workflow orchestration)
* Regex-based NLP for data extraction


## LangGraph Agent Design

The system uses a LangGraph agent to process and manage interaction data.

### Tools Implemented

* **Log Interaction** – Captures and stores interaction details from chat input
* **Edit Interaction** – Updates specific fields based on user instructions
* **Extract Entities** – Parses structured data such as name, date, and materials
* **Generate Summary** – Creates a short summary of the interaction
* **Suggest Follow-ups** – Provides follow-up recommendations based on context


## Application Flow

1. User enters interaction details in chat
2. Frontend sends input to backend API
3. LangGraph processes the input
4. Tools extract and structure the data
5. Backend returns structured response
6. Redux updates application state
7. Form UI updates automatically


## AI Capabilities

* Converts unstructured text into structured CRM entries
* Identifies key interaction details
* Infers sentiment from input
* Suggests follow-up actions


## Key Learnings

* Designing AI-first user interfaces
* Using LangGraph for workflow orchestration
* Connecting conversational input with structured systems
* Managing application state using Redux
* Building real-world CRM workflows


## Setup

### Frontend

* Go to frontend folder:
cd frontend

* Install dependencies:
npm install

* Start the app:
npm run dev

Frontend will run at:
http://localhost:5173


### Backend

* Go to backend folder:
cd backend

* Install dependencies:
pip install -r requirements.txt

* Start server:
uvicorn main:app --reload

Backend will run at:
http://127.0.0.1:8000


## Conclusion

This project demonstrates how AI can improve traditional CRM systems by enabling conversational interaction, reducing manual effort, and improving efficiency for healthcare representatives.
