# Aiogram Bot with PostgreSQL via Async SQLAlchemy and Alembic

## Overview
This project implements a Telegram bot using Aiogram 3.x with PostgreSQL database integration through async SQLAlchemy and Alembic for database migrations.

## Features
- Async Aiogram 3.x implementation
- PostgreSQL database with async SQLAlchemy
- Alembic for database migrations
- APScheduler for background tasks
- Redis-based caching
- Pydantic configuration management
- Structured logging with Loguru
- Web interface using Next.js for enhanced user interaction

## Setup

### Development Build

To set up the development environment, run:

```bash
make dev
```

### Production Build

To set up the production environment, run:

```bash
make prod
```

### Stopping All Containers

To stop all running containers, execute:

```bash
make prod
```

### Deep Cleaning Environment

To clean all, execute:

```bash
make clean
```
