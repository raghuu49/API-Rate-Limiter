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

const fixed_window_size=5
const fixed_window_limit=5
const request_map=new Map()

function SlidingWindow(request){
   let user_id=request.user_id
   let timestamp=request.timestamp

    if(!request_map.has(user_id)){
        request_map.set(user_id, new Queue())
    }

    let request_queue=request_map.get(user_id)
    
    while(!request_queue.isEmpty() && request_queue.peek()<=timestamp-fixed_window_size) request_queue.dequeue()
    
    if(request_queue.size()<fixed_window_limit) {
        request_queue.enqueue(timestamp)
        console.log("Request Accepted")
    }
    else{
        console.log("Request Rejected")
    }

    console.log(
  `User ${user_id} | Queue: [${request_queue.items.join(", ")}]`
)

    
}

SlidingWindow({user_id:1,timestamp:1})
SlidingWindow({user_id:1,timestamp:1.1})
SlidingWindow({user_id:1,timestamp:1.2})
SlidingWindow({user_id:1,timestamp:1.3})
SlidingWindow({user_id:1,timestamp:1.3})
SlidingWindow({user_id:1,timestamp:1.5})
SlidingWindow({user_id:2,timestamp:1})
SlidingWindow({user_id:1,timestamp:1})
SlidingWindow({user_id:2,timestamp:1.1})
SlidingWindow({user_id:2,timestamp:1.2})
SlidingWindow({user_id:2,timestamp:1.3})
SlidingWindow({user_id:2,timestamp:1.4})
SlidingWindow({user_id:2,timestamp:1.5})
SlidingWindow({user_id:'a',timestamp:1})