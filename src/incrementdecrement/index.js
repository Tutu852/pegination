const incrementCount = document.getElementById("increment-count")
const decrementCount = document.getElementById("decrement-count")

const totalCount = document.getElementById("total-count")

var count = 0;
totalCount.innerHTML = count;


function Increment(){
    count++
    totalCount.innerHTML = count;
}

function Decrement(){
   
    count--;
    totalCount.innerHTML = count;
}