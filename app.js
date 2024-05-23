"use strict";
const api_key = "Y61B2WWBC1LXK0HV";
const selection = document.querySelector("select");
const body = document.querySelector("body");
const main = document.createElement("main");
const paragragh = document.createElement("p");

const daily = async () => {
  const date = new Date();
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selection.value}&apikey=${api_key}`;
  const response = await fetch(url);
  const result = await response.json();
  const form = date.toISOString().split("T")[0];
  console.log(result);
  console.log(form);
  if (result["Time Series (Daily)"] != null) {
    const day = result["Time Series (Daily)"][form];
    Object.keys(day).forEach((key) => {
      paragragh.textContent += key + " " + day.key + "\n";
    });
  } else {
    paragragh.textContent = result.Information;
  }
  paragragh.classList.add("paraghraph");
  main.appendChild(paragragh);
  body.appendChild(main);
  scroll();
};

const scroll = () => {
  main.setAttribute("id", "main");
  window.location.href = "#main";
};
