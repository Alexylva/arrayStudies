function sumTimesProduct(...arr) {
    return arr.reduce((prev, curr) => prev + curr) * arr.reduce((prev, curr) => prev * curr);
}

function partition(...arr) {
    const pow = Math.pow(2, arr.length - 1);
    let ret = [], curr, a = 0;
    for (let i = 0; i < pow; i++) {
        curr = arr.join('');
        for (let k = 0, a = 1; k < arr.length - 1; k++, a++) {
            if ((1 << k) & i) { curr = curr.substring(0, a) + ',' + curr.substring(a); a++;}
        }
        ret.push(eval(`Array.from([${curr}])`));
    }
    return ret;
}


//Bruteforce Search of which partition maximizes sumTimesProduct
function maximize(...arr) {
    const arrays = partition(...arr);
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

console.log(`Maximum: ${maximize(...argnums)}`);
//console.log(partition(...argnums).sort((a,b) => a.length - b.length));