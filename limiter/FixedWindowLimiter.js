
const fixed_window_size=5
const fixed_window_limit=5

const request_map=new Map()


// console.log(request_map.keys().next().value)

function fixedWindow(request){
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
        }

        else{

        if(timestamp<start_time+fixed_window_size){

        if(count<fixed_window_limit){
            count+=1
            console.log("Request accepted")
        }
        else{
            console.error("Request Limit Reached")

        }
    }

    else{
        count=1
        start_time=Math.floor(timestamp/fixed_window_size)*fixed_window_size
        console.log("Request Accepted")
    }
}
console.log(
  `User ${user_id} | Window: ${start_time} -> ${start_time + fixed_window_size} | Count: ${count}`
)
request_map.set(user_id,{start_time,count})
}

fixedWindow({user_id:1,timestamp:1})
fixedWindow({user_id:1,timestamp:1.1})
fixedWindow({user_id:1,timestamp:1.2})
fixedWindow({user_id:1,timestamp:1.3})
fixedWindow({user_id:1,timestamp:1.3})
fixedWindow({user_id:1,timestamp:1.5})
fixedWindow({user_id:2,timestamp:1})
fixedWindow({user_id:1,timestamp:1})
fixedWindow({user_id:2,timestamp:1.1})
fixedWindow({user_id:2,timestamp:1.2})
fixedWindow({user_id:2,timestamp:1.3})
fixedWindow({user_id:2,timestamp:1.4})
fixedWindow({user_id:2,timestamp:1.5})
fixedWindow({user_id:'a',timestamp:1})