function promiseAll(iterators){
    return new Promise((resolve,reject)=>{
        let count=0;
        let ans=[]
        if(iterators.length==0){
            resolve(ans);
        }
        iterators.map((item,index)=>{
            Promise.resolve(item).then((value)=>{
                count++;
                ans[index]=value;
                if(count==iterators.length){
                    resolve(ans);
                }
            }).catch((error)=>{
                reject("Error");
            })
        })
    })
}

console.log(promiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]).then((value)=>{
      console.log(value);
  }));

  console.log(promiseAll([
    Promise.resolve(1),
    Promise.reject('error'),
    Promise.resolve(3)
  ]).then((value)=>{
      console.log(value);
  }).catch((error)=>{
      console.log('Error is', error);
  }))