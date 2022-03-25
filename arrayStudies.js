let argnums = [...process.argv.splice(2).map(elem => Number.parseFloat(elem))];

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
function select(transformFn, reducerFn, compareFn, ...values) {
    const arrays = partition(transformFn, ...values);

    let selectedArray, selectedValue, element, reducedElement, previousValue;

    for (let i = 0; i < arrays.length; i++) {
        element = arrays[i];
        reducedElement = reducerFn(...element);
        console.log(reducedElement, '\t===>\t', element);
        if (i === 0 || compareFn(reducedElement, previousValue)) {
            selectedArray = element;
            selectedValue = reducedElement;
            previousValue = reducedElement;
        }
    }
    return {selectedArray, selectedValue};
}


function transformConcat(arr) {
    return Number.parseFloat(arr.join(''));
}

function transformDiff(arr) {
    return Number.parseFloat(arr.reduce((a, b) => Math.abs(a - b)));
}

function transformSum(arr) {
    return Number.parseFloat(arr.reduce((a, b) => Math.abs(a + b)));
}

function reducerSumTimesProduct(...arr) {
    return arr.reduce((prev, curr) => prev + curr) + arr.reduce((prev, curr) => prev * curr);
}

function reducerSum(...arr) {
    return arr.reduce((prev,curr) => prev + curr);
}

function reducerCosine(...arr) {
    if (arr.length === 1) return Math.abs(Math.cos(arr[0]));
    return arr.reduce((a,b) => Math.abs(Math.cos(a+b)));
}

function toName(...arr) {
    return arr.map(e => ((e % 26) + 9).toString(36)).join('');
}

function toNumbers(str) {
    return Array.from(str).map(elem => Number.parseInt(elem, 36) - 9);
}
console.log(`Selection: ${
    JSON.stringify(select(
        transformSum, 
        reducerCosine, 
        (a,b) => a < b, 
        ...argnums
    ))}`
);
//console.log(partition(transformDiff, ...argnums).sort((a,b) => a.length - b.length));
if(1)
partition(transformConcat, ...argnums).forEach(
    elem => console.log(elem, '\t===>\t', toName(...elem))
)