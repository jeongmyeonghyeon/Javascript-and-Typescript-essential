function double(x){
    return x*2;
}

function calcValue(a, b, cb){
    setTimeout(() => {
        cb(a + b);
    }, 100)
}

const x = double(100);
const y = x;

const r = calcValue(10,20, (result) => {
    console.log(result);
});
const z = r;

