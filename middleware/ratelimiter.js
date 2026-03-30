import { config } from "../config/config.js"
import { FixedWindow } from "../limiter/FixedWindowLimiter.js"
import { SlidingWindow } from "../limiter/SlidingWindowLimiter.js"
import { TokenBucket } from "../limiter/TokenBucketLimiter.js"

export const rateLimiterMiddleware=(req,res,next)=>{
    let user_id=req.body.user_id
    let timestamp=Date.now()/1000

    if(!user_id){
       return res.status(400).json({error:"User Id is required"})
    }

    let request={user_id,timestamp}

    if(config.algorithm==='TokenBucket'){
        if(TokenBucket(request)) next()
        else return res.status(429).json({error:"Too Many Requests"})
    }

    else if(config.algorithm==='SlidingWindow'){
        if(SlidingWindow(request)) next()
        else return res.status(429).json({error:"Too Many Requests"})
    }
    else{
        if(FixedWindow(request)) next()
        else return res.status(429).json({error:"Too Many Requests"})
    }

}
export {rateLimiterMiddleware}