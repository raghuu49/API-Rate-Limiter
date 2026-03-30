import { config } from "../config/config"

const fixed_window_size=config.FixedWindow.windowSize
const fixed_window_limit=config.FixedWindow.limit

const request_map=new Map()


// console.log(request_map.keys().next().value)

export function FixedWindow(request){
    //{user_id,request_id,timestamp}
    let user_id=request.user_id
    let timestamp=request.timestamp

    if(!request_map.has(user_id)){
        request_map.set(user_id,{start_time:null,count:0})
    }

        let user=request_map.get(user_id)
        let start_time=user.start_time
        let count=user.count

        if(start_time===null){
            start_time=Math.floor(timestamp/fixed_window_size)*fixed_window_size
            count=1
            console.log('Request Accepted')
            return true
        }

        else{

        if(timestamp<start_time+fixed_window_size){

        if(count<fixed_window_limit){
            count+=1
            console.log("Request accepted")
            return true
        }
        else{
            console.error("Request Limit Reached")
            return false

        }
    }

    else{
        count=1
        start_time=Math.floor(timestamp/fixed_window_size)*fixed_window_size
        console.log("Request Accepted")
        return true
    }
}
console.log(
  `User ${user_id} | Window: ${start_time} -> ${start_time + fixed_window_size} | Count: ${count}`
)
request_map.set(user_id,{start_time,count})
}

FixedWindow({user_id:1,timestamp:1})
FixedWindow({user_id:1,timestamp:1.1})
FixedWindow({user_id:1,timestamp:1.2})
FixedWindow({user_id:1,timestamp:1.3})
FixedWindow({user_id:1,timestamp:1.3})
FixedWindow({user_id:1,timestamp:1.5})
FixedWindow({user_id:2,timestamp:1})
FixedWindow({user_id:1,timestamp:1})
FixedWindow({user_id:2,timestamp:1.1})
FixedWindow({user_id:2,timestamp:1.2})
FixedWindow({user_id:2,timestamp:1.3})
FixedWindow({user_id:2,timestamp:1.4})
FixedWindow({user_id:2,timestamp:1.5})
FixedWindow({user_id:'a',timestamp:1})

export {FixedWindow}