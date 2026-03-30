
# API Rate Limiter

## Overview
A robust API rate limiting solution that controls request frequency to prevent abuse and ensure fair resource allocation.

## Features
- Multiple rate limiting algorithms
- Configurable time windows
- Per-user and global limits
- Real-time tracking

## Algorithms

### 1. Token Bucket
Tokens refill at a constant rate; requests consume tokens.

```
┌─────────────────────────────┐
│   Token Bucket Algorithm    │
├─────────────────────────────┤
│  START                      │
│    │                        │
│    ├─> Check tokens avail?  │
│    │   ├─> YES: Allow req   │
│    │   └─> NO: Reject req   │
│    │                        │
│    ├─> Refill tokens        │
│    │   (constant rate)      │
│    │                        │
│  END                        │
└─────────────────────────────┘
```

### 2. Sliding Window
Tracks requests in a moving time window.

```
┌──────────────────────────────┐
│  Sliding Window Algorithm    │
├──────────────────────────────┤
│  START                       │
│    │                         │
│    ├─> Get current time      │
│    │                         │
│    ├─> Remove old requests   │
│    │   (outside window)      │
│    │                         │
│    ├─> Count requests < limit│
│    │   ├─> YES: Allow        │
│    │   └─> NO: Reject        │
│    │                         │
│  END                         │
└──────────────────────────────┘
```

### 3. Fixed Window
Divides time into fixed intervals.

```
┌────────────────────────────┐
│  Fixed Window Algorithm    │
├────────────────────────────┤
│  START                     │
│    │                       │
│    ├─> Get current window  │
│    │                       │
│    ├─> Check counter       │
│    │   ├─> < Limit: Allow  │
│    │   └─> >= Limit: Reject│
│    │                       │
│    ├─> Increment counter   │
│    │                       │
│  END                       │
└────────────────────────────┘
```

## Installation
```bash
npm install api-rate-limiter
```

## Usage
```javascript
const limiter = new RateLimiter({ maxRequests: 100, windowMs: 60000 });
```

## License
MIT
