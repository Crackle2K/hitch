<div align="center">

# Hitch

**A ride-sharing platform built with React, Flask, and Mapbox.**

[![Build](https://img.shields.io/github/actions/workflow/status/Crackle2K/Hitch/ci.yml?branch=main&label=build)](https://github.com/Crackle2K/Hitch/actions)
[![License](https://img.shields.io/github/license/Crackle2K/Hitch)](LICENSE)
[![React](https://img.shields.io/badge/react-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Flask](https://img.shields.io/badge/flask-3-black?logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![Supabase](https://img.shields.io/badge/supabase-database-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

## Overview

Hitch is a web application for coordinating rides between drivers and passengers. The frontend is built with React and renders live maps via Mapbox GL; the backend is a Flask REST API backed by Supabase.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, react-map-gl, Mapbox GL |
| Backend | Python, Flask, JWT auth |
| Database | Supabase (PostgreSQL) |

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
npm run api
```

### Environment Variables

Create a `.env` file in the project root:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
SECRET_KEY=your_jwt_secret
VITE_MAPBOX_TOKEN=your_mapbox_token
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run api` | Start the Flask API |
