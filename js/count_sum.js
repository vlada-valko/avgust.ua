

const sum = document.querySelectorAll(".sum-number");
let totalSum = 0;
sum.forEach(element => {
    let number = parseInt(element.textContent); 
   totalSum += number;
});
document.getElementById("total-sum").textContent = totalSum;


