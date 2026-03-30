import { config } from "../config/config"

const maxCapacity=config.TokenBucket.capacity
const refillRate=config.TokenBucket.refillRate

const reqMap=new Map()
//userId->{tokens,last_refill time}

export function TokenBucket(request){
    const userId=request.userId
    const timestamp=request.timestamp

    if(!reqMap.has(userId)){
        reqMap.set(userId,{tokens:maxCapacity,lastRefillTime:timestamp})
    }

    let user=reqMap.get(userId)
    let lastRefillTime=user.lastRefillTime
    let tokens=user.tokens
    let elapsedTime=timestamp-lastRefillTime
    let tokensToBeAdded=elapsedTime*refillRate
    

    tokens=Math.min(tokens+tokensToBeAdded,maxCapacity)
    lastRefillTime=timestamp
    if(tokens>=1){
        tokens-=1
        console.log("Request Accepted")
        reqMap.set(userId,{tokens,lastRefillTime})
        return true
    }
    else{
        console.log("Request Rejected")
        return false
    }
}

TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:1,timestamp:2})
TokenBucket({userId:2,timestamp:1})
TokenBucket({userId:2,timestamp:1})

export {TokenBucket}