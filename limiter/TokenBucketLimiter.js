import { config } from "../config/config.js"

const maxCapacity=config.TokenBucket.capacity
const refillRate=config.TokenBucket.refillRate

const reqMap=new Map()
//userId->{tokens,last_refill time}

export function TokenBucket(request){
    const userId=request.user_id
    const timestamp=request.timestamp

    if(!reqMap.has(userId)){
        reqMap.set(userId,{tokens:maxCapacity,lastRefillTime:timestamp})
    }

    let user=reqMap.get(userId)
    let lastRefillTime=user.lastRefillTime
    let tokens=user.tokens
    let elapsedTime=timestamp-lastRefillTime
    let tokensToBeAdded=elapsedTime*refillRate

    if(config.debug){
    console.log("\n----- TOKEN BUCKET DEBUG -----")
    console.log(`User: ${userId}`)
    console.log(`Timestamp: ${timestamp.toFixed(3)}`)
    console.log(`Last Refill Time: ${lastRefillTime.toFixed(3)}`)
    console.log(`Elapsed Time: ${elapsedTime.toFixed(3)} sec`)

    console.log(`Tokens Before Refill: ${tokens.toFixed(3)}`)
    console.log(`Tokens To Be Added: ${tokensToBeAdded.toFixed(3)}`)
    }

    let allowed=false
    

    tokens=Math.min(tokens+tokensToBeAdded,maxCapacity)

    console.log(`Tokens After Refill (capped): ${tokens.toFixed(3)}`)
    lastRefillTime=timestamp
    if(tokens>=1){
        tokens-=1
        allowed= true
        console.log("Decision: ✅ ALLOWED")
    }
    else{
        console.log("Decision: ❌ REJECTED")
        allowed= false
    }
     reqMap.set(userId,{tokens,lastRefillTime})
     console.log("-------------------------------\n")
     return allowed
}

// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:1,timestamp:2})
// TokenBucket({userId:2,timestamp:1})
// TokenBucket({userId:2,timestamp:1})

