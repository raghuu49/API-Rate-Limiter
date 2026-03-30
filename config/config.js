

export const config={
    algorithm:"TokenBucket", //"FixedWindow" | "SlidingWindow"

    debug:true,

    FixedWindow: {
        windowSize:5,
        limit:5
    },

    SlidingWindow:{
        windowSize:5,
        limit:5
    },

    TokenBucket:{
        capacity:5,
        refillRate:2.5
    }
}