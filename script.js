/*
Tip Amount: ( 142.55 x 15% ) / 5
Total: 142.55 / 5 + 4.27
*/
const card = document.querySelectorAll(".card");
const error_message = document.querySelector("#error");

// Bill 
var billValue = document.querySelector(".bill-customize");

// Bill Customize
var custBillValue = document.querySelector(".tip-6");

// Number of People
var people = document.querySelector(".input-people");

// Change element of number
var tipAmount = document.querySelector("#harga-tipamount");
var total = document.querySelector("#harga-total");

function convertPercent(Passing){
    let Char = Passing.slice(0, Passing.length - 1);
    let final = parseFloat(Char) / 100;
    return final;
}

function countPercent(Percent, Value_bill){
    let answer = (Value_bill * Percent);
    return answer;
}

function countFinal(Res, Divisor){
    let result = Res/Divisor;
    return result.toFixed(2);
}

function getTotal(Value_bill, Divisor, TipAmount){
    let answer = (Value_bill / Divisor) + parseFloat(TipAmount);
    return answer.toFixed(2);
}

var Percentage_temp, Multiple, Final;
for(let i=0; i<card.length; i++){
    card[i].addEventListener("click", function(){
        Percentage_temp = convertPercent(card[i].firstChild.nextSibling.innerHTML);
        Multiple = countPercent(Percentage_temp, billValue.value);
        Final = countFinal(Multiple, people.value);
        displayTip();
    });
}

function displayTip(){
    tipAmount.textContent = `${countFinal(Multiple, people.value)}`;
    total.textContent = `${getTotal(billValue.value, people.value, countFinal(Multiple, people.value))}`;
}

var Multiple_cust;
function countCustom(){
    Multiple_cust = (countPercent(parseFloat(custBillValue.value/100), billValue.value))/people.value;
    return Multiple_cust.toFixed(2);
}

function displayCustom(){
    tipAmount.textContent = `${countCustom()}`;
    total.textContent = `${getTotal(billValue.value, people.value, countFinal(Multiple, people.value))}`;
}

// ------ start of error message ------ 
function displayError(){
    error_message.style.display = "block";
    people.style.boxShadow = "0 0 0 2pt rgb(209 81 72)";
    people.style.borderRadius = "5px";
}

people.addEventListener("input", function(){
    if(this.value == 0)
        displayError();
    else{
        error_message.style.display = "none";
        people.style.boxShadow = "none";
        if(parseFloat(custBillValue.value) >= 0)
            displayCustom();
        else
            displayTip();
    }
});
// ------- end of error message -------

// Tombol Reset
const reset = document.querySelector(".reset-button");
let tip_amount = 0, total_amount = 0.00;
reset.addEventListener("click", function(){
    tipAmount.innerHTML = "0.00";
    total.innerHTML = "0.00";
});
