
function PromisePollyfill(executor){
    let onResolve, onReject, rejected = false;
    let Value;
    function resolve( value ){
        if(typeof onResolve==='function'){
            onResolve(value);
        }
        Value = value;
    }

    function reject(value){
        rejected=true;
         if(typeof onReject==='function'){
            onReject(value);
        }
        Value = value;
    }

    this.then = function(callback){
        onResolve = callback;
        if(Value!==undefined && !rejected){
            onResolve(Value);
        }
        return this;
    }

     this.catch= function (callback){
        onReject= callback;
        if(Value!== undefined && rejected){
            onReject(Value);
        }
        return this;
     }
    executor(resolve,reject);
}

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise resolved successfully!');
    }, 2000);
});

const promise2 = new PromisePollyfill((resolve, reject) => {
    setTimeout(() => {
        reject('Promise rejected with error!');
    }, 4000);
});


promise1.then((message)=>{
    console.log('promise 1',message);
}).catch((error)=>{
    console.error('Promise 1 rejected with error:', error);
});

promise2.then((message)=>{
    console.log('promise 2',message);
}).catch((error)=>{
    console.error('Promise 2 rejected with error:', error);
});