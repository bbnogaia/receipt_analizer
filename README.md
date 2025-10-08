# Receipt Analyzer

## Overview

This is a full-stack web application designed to **extract and digitize text from receipt images** using Optical Character Recognition (**OCR**).

It leverages:
* **FastAPI** for a fast and robust Python backend.
* **EasyOCR** for accurate text recognition.
* **Next.js (React)** for a modern and responsive frontend interface.

---

## Local Setup

### Prerequisites

The following should have already been installed:
* **Python 3.8+**
* **Node.js (LTS)** and **npm** or **yarn**

---

### 1. Backend Setup (FastAPI + EasyOCR)

First, set up and launch the API server that handles the OCR processing.

1.  Navigate into the backend directory:
    ```bash
    cd backend
    ```

2.  Create and activate a virtual environment (recommended):
    * **macOS/Linux:**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
    * **Windows (Command Prompt):**
        ```bash
        python -m venv venv
        venv\Scripts\activate
        ```

3.  Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4.  Start the FastAPI server:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The backend API will be available at `http://localhost:8000`.

---

### 2. Frontend Setup (Next.js)

Next, launch the client-side application.

1.  Open a **new terminal tab/window** and navigate into the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install the Node.js dependencies:
    ```bash
    npm install
    # or yarn install
    ```

3.  Start the Next.js development server:
    ```bash
    npm run dev
    # or yarn dev
    ```

---

## Access the Application

The web application will automatically be available in your browser at:

**[http://localhost:3000](http://localhost:3000)**

Make sure both the backend (port 8000) and the frontend (port 3000) are running concurrently for the app to function correctly.
