
# API Rate Limiter

## Overview
A robust API rate limiting solution that controls request frequency to prevent abuse and ensure fair resource allocation.

## Motivation
I am trying to learn API Limiter Algorithms and basically hand coding in age of AI and its over bros, i have tried implementing three algorithms, the first one is a fixed window which basically allows x rates per y seconds, the problem with this is burst at boundary, the second is the good old classic sliding window, it doesnt allows burst at boundary but it has a memory problem since we need to store queue of the last requests, the last and most used one is token bucket algorithm, it is simple and intuitive, it basically replicates a bucket with capacity C and a refill rate of x tokens/second, every time a request hits, it looks if more then 1 token is present and also adds token according to elapsed time(current-last_refill), it is memory conscious and efficient

## How to start
clone the repo in your local machine, npm install and you are good to go, main.js is the entry file and node start can be used to start the server and the hosting is done on local host:3000 and api calls are POST type made on endpoint localhost:3000/limiter, you can check when you are hitting the reject, console logs are helpful and good excercise for mental learning

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
