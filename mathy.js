function sumTimesProduct(...arr) {
    return arr.reduce((prev, curr) => prev + curr) * arr.reduce((prev, curr) => prev * curr);
}


function partition(transformFn, ...arr) {
    const pow = Math.pow(2, arr.length - 1);
    let ret = [], curr, a = 0;
    for (let i = 0; i < pow; i++) {
        curr = arr;
        for (let k = 0, a = 1; k < arr.length - 1; k++, a++) {
            if ((1 << k) & i) { curr = [curr.slice(0,a-1), transformFn(curr.slice(a-1,a+1)), curr.slice(a+1)].flat(); a--;}
        }
        ret.push(curr);
    }
    return ret;
}


//Bruteforce Search of which partition maximizes sumTimesProduct
function maximize(transform, ...arr) {
    const arrays = partition(transform, ...arr);
    let ret = 0, curr, sum, prev = 0;
    
    for (let i = 0; i < arrays.length; i++) {
        curr = arrays[i];
        sum = sumTimesProduct(...curr);
        console.log(curr,sum);
        if (sum >= prev) {
            ret = curr;
            prev = sum;
        }
    }
    return ret;
}

let argnums = [...process.argv.splice(2).map(elem => Number.parseFloat(elem))];

let transform = (arr) => Number.parseFloat(arr.join(''));
console.log(`Maximum: ${maximize(transform, ...argnums)}`);
//console.log(partition(transform, ...argnums).sort((a,b) => a.length - b.length));