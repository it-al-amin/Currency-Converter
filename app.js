
import {countryList} from './codes.js'
const BASE_URL = "https://api.exchangerate-api.com/v4/latest";
//"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = parseFloat(amount.value);
    if (isNaN(amtValue) || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }

    let url1 = `${BASE_URL}/${fromCurr.value}`;
    let url2 = `${BASE_URL}/${toCurr.value}`;

    try {
        let response1 = await fetch(url1);
        let data1 = await response1.json();

        let response2 = await fetch(url2);
        let data2 = await response2.json();
        let rate = data2.rates[data1.base];

        let finalAmt = rate * amtValue;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        msg.innerText = "Error fetching data. Please try again later.";
    }
}

for (let select of dropdowns) {
    for (let currCode in countryList) {
        //console.log(code,countryList[code]);//currency code && country code
        let newOPtion = document.createElement("option");
        newOPtion.innerText = currCode;
        newOPtion.value = currCode;
        if (select.name === "from" && currCode === "BDT") {
            newOPtion.selected = "selected";
        }
        else if (select.name === "to" && currCode === "USD") {
            newOPtion.selected = "selected";
        }
        select.append(newOPtion);

    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
        updateExchangeRate();
    });

}
const updateFlag = (element) => {
    //console.log(element);  //print html =>select element 
    let currCode = element.value;
    let countryCode = countryList[currCode];
    //console.log(currCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;


}



btn.addEventListener("click", (event) => {
    event.preventDefault();//to prevent reload whole page 
    updateExchangeRate();
});

window.addEventListener("DOMContentLoaded", () => {
    updateExchangeRate();
});




