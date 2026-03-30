import { config } from "../config/config.js"
import { FixedWindow } from "../limiter/FixedWindowLimiter.js"
import { SlidingWindow } from "../limiter/SlidingWindowLimiter.js"
import { TokenBucket } from "../limiter/TokenBucketLimiter.js"

export const rateLimiterMiddleware=(req,res,next)=>{
    let user_id=req.body.user_id
    let timestamp= req.body.timestamp !==undefined? req.body.timestamp: Date.now()/1000

    console.log(`[Rate Limiter] Request received - User ID: ${user_id}, Timestamp: ${timestamp}`)

    if(!user_id){
       console.error("[Rate Limiter] Error: User ID is missing")
       return res.status(400).json({error:"User Id is required"})
    }

    let request={user_id,timestamp}
    console.log(`[Rate Limiter] Using algorithm: ${config.algorithm}`)

    if(config.algorithm==='TokenBucket'){
        console.log(`[Rate Limiter] Checking TokenBucket for user ${user_id}`)
        if(TokenBucket(request)) {
            console.log(`[Rate Limiter] TokenBucket allowed - User ${user_id}`)
            next()
        }
        else {
            console.warn(`[Rate Limiter] TokenBucket denied - User ${user_id} rate limited`)
            return res.status(429).json({error:"Too Many Requests"})
        }
    }

    else if(config.algorithm==='SlidingWindow'){
        console.log(`[Rate Limiter] Checking SlidingWindow for user ${user_id}`)
        if(SlidingWindow(request)) {
            console.log(`[Rate Limiter] SlidingWindow allowed - User ${user_id}`)
            next()
        }
        else {
            console.warn(`[Rate Limiter] SlidingWindow denied - User ${user_id} rate limited`)
            return res.status(429).json({error:"Too Many Requests"})
        }
    }
    else{
        console.log(`[Rate Limiter] Checking FixedWindow for user ${user_id}`)
        if(FixedWindow(request)) {
            console.log(`[Rate Limiter] FixedWindow allowed - User ${user_id}`)
            next()
        }
        else {
            console.warn(`[Rate Limiter] FixedWindow denied - User ${user_id} rate limited`)
            return res.status(429).json({error:"Too Many Requests"})
        }
    }

}
