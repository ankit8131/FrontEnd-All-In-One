class LRU{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        if(!this.cache.has(key)){
            return -1;
        }
        let value= this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,value);
        return value;
    }

    set(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key);
            this.cache.set(key,value);
        }
        else{
            if(this.cache.size===this.capacity){
                let firstKey= this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            this.cache.set(key,value);
        }
    }
}

const test = new LRU(2);
test.set(1,'Ankit')
test.set(2,'Singh')
console.log(test.get(1))
console.log(test);
test.set(3,'Kumar')
console.log(test.get(2));
console.log(test);