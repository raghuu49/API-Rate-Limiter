import { config } from "../config/config.js"

class Queue{
    constructor(){
        this.items=[]
    }
    enqueue(element){
        this.items.push(element)
    }
    dequeue(){
        return this.isEmpty() ? "Queue is empty": this.items.shift()
    }
    isEmpty(){
        return this.items.length===0
    }
    size(){
        return this.items.length
    }
    peek(){
        return this.isEmpty()? null : this.items[0]
    }
}

const fixed_window_size=config.SlidingWindow.windowSize
const fixed_window_limit=config.SlidingWindow.limit
const request_map=new Map()

export function SlidingWindow(request){
   let user_id=request.user_id
   let timestamp=request.timestamp

    if(!request_map.has(user_id)){
        request_map.set(user_id, new Queue())
    }

    let request_queue=request_map.get(user_id)

     if (config.debug) {
        console.log("\n----- SLIDING WINDOW DEBUG -----")
        console.log(`User: ${user_id}`)
        console.log(`Timestamp: ${timestamp.toFixed(3)}`)
        console.log(`Window Size: ${fixed_window_size}`)
        console.log(`Queue BEFORE cleanup: [${request_queue.items.map(t => t.toFixed(2)).join(", ")}]`)
    }
    while(!request_queue.isEmpty() && request_queue.peek()<=timestamp-fixed_window_size) request_queue.dequeue()
    let allowed=false
    if(request_queue.size()<fixed_window_limit) {
        request_queue.enqueue(timestamp)
        console.log("Request Accepted")
        allowed= true
    }
   
    else{
        console.log("Request Rejected")
        allowed= false
    }
    
    if (config.debug) {
        console.log(`Current Size: ${request_queue.size()}`)
        console.log(`Limit: ${fixed_window_limit}`)
        console.log(`Decision: ${allowed ? "✅ ALLOWED" : "❌ REJECTED"}`)
        console.log(`Queue FINAL: [${request_queue.items.map(t => t.toFixed(2)).join(", ")}]`)
        console.log("--------------------------------\n")
    }

    return allowed
  
}

// SlidingWindow({user_id:1,timestamp:1})
// SlidingWindow({user_id:1,timestamp:1.1})
// SlidingWindow({user_id:1,timestamp:1.2})
// SlidingWindow({user_id:1,timestamp:1.3})
// SlidingWindow({user_id:1,timestamp:1.3})
// SlidingWindow({user_id:1,timestamp:1.5})
// SlidingWindow({user_id:2,timestamp:1})
// SlidingWindow({user_id:1,timestamp:1})
// SlidingWindow({user_id:2,timestamp:1.1})
// SlidingWindow({user_id:2,timestamp:1.2})
// SlidingWindow({user_id:2,timestamp:1.3})
// SlidingWindow({user_id:2,timestamp:1.4})
// SlidingWindow({user_id:2,timestamp:1.5})
// SlidingWindow({user_id:'a',timestamp:1})

