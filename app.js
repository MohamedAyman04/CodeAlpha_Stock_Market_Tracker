"use strict";
const api_key = "Y61B2WWBC1LXK0HV";
const selection = document.querySelector("select");
const body = document.querySelector("body");
const main1 = document.createElement("main");
const main2 = document.createElement("main");
const main3 = document.createElement("main");
const paraghraph = document.createElement("div");

// Create two canvas elements
const canvas1 = document.createElement("canvas");
canvas1.width = 400;
canvas1.height = 400;
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.createElement("canvas");
canvas2.width = 400;
canvas2.height = 400;
const ctx2 = canvas2.getContext("2d");

let myChart1; // Declare a global variable to hold the first chart instance
let myChart2; // Declare a global variable to hold the second chart instance

const daily = async () => {
  const date = new Date();
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selection.value}&apikey=${api_key}`;
  const response = await fetch(url);
  const result = await response.json();
  const form = date.toISOString().split("T")[0];
  console.log(result["Time Series (Daily)"]);
  console.log(form);
  paraghraph.innerHTML = "";
  if (result["Time Series (Daily)"] != null) {
    const day = result["Time Series (Daily)"]["2024-05-24"];
    Object.keys(day).forEach((key) => {
      const item = document.createElement("div");
      item.classList.add("data-item");
      item.innerHTML = `<strong>${key}: $${(
        Math.round(day[key] * 100) / 100
      ).toFixed(2)}</strong>`;
      paraghraph.appendChild(item);
    });
    createCharts(day);
  } else {
    paraghraph.textContent = result.Information;
  }
  paraghraph.classList.add("paraghraph");
  main1.appendChild(paraghraph);
  main2.appendChild(canvas1);
  main3.appendChild(canvas2);
  body.appendChild(main1);
  body.appendChild(main2);
  body.appendChild(main3);
  scroll();
};

const scroll = () => {
  main1.setAttribute("id", "main");
  window.location.href = "#main";
};

const createCharts = (day) => {
  // Destroy old charts if they exist
  if (myChart1) {
    myChart1.destroy();
  }
  if (myChart2) {
    myChart2.destroy();
  }

  // Create first chart for low and high
  myChart1 = new Chart(ctx1, {
    type: "line",
    data: {
      labels: ["Low", "High"],
      datasets: [
        {
          label: "Low and High",
          data: [day["3. low"], day["2. high"]],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });

  // Create second chart for open and close
  myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Open", "Close"],
      datasets: [
        {
          label: "Open and Close",
          data: [day["1. open"], day["4. close"]],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });
};
