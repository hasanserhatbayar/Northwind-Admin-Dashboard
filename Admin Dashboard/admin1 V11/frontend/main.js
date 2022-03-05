const baseURL = "http://localhost:3000";

async function fetchOrders(ab, searchTxt) {
  const response = await fetch(`${baseURL}/orders`);
  const orders = await response.json();
  render(orders, ab, searchTxt);
}

async function fetchEmployee() {
  const response = await fetch(`${baseURL}/employees`);
  const employee = await response.json();
  render1(employee);
}
const num = document.querySelector(".orderIDCount");
const sumPrice = document.querySelector(".sumTotalPrice");
const avgUnitPrice = document.querySelector(".avgUnitPrice");
var LastOrders = [];
var SortedOrders = [];

const source = document.querySelector(".searchtxt");

const inputHandler = function (searchText) {
  var li = document.querySelectorAll(".topic li");
  li.forEach((li) => {
    li.remove();
  });

  var searchTxt = source.value;
  fetchOrders(ab, searchTxt);
};

source.addEventListener("input", inputHandler);

function fillList(topic, text) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.innerText = text;
  li.append(a);
  document.querySelector(topic).append(li);
}

var ab = 0;

function selectedEmpID(chosen) {
  var li = document.querySelectorAll(".topic li");
  li.forEach((li) => {
    li.remove();
  });

  ab = parseInt(chosen);
  fetchOrders(ab);
}
var sumTotalPrice = 0;
function render(orders, ab, searchTxt) {
  sumTotalPrice = 0;
  if (ab == null && searchTxt == null) {
    Listview(orders);
    console.log(orders);
  } else if (searchTxt == null && ab !== null) {
    var orderArr = orders.filter(function (order) {
      return ab === order.employeeId;
    });

    Listview(orderArr);
  } else {
    var searchCustomerID = [];
    orders.forEach((order3) => {
      if (order3.customerId.toUpperCase().includes(searchTxt.toUpperCase())) {
        searchCustomerID.push(order3);
      }
    });
    console.log(searchCustomerID);
    Listview(searchCustomerID);
  }
}

var comboBox = document.querySelector("#selectNumber");

function render1(employee) {
  employee.forEach((emp) => {
    var name = document.createElement("option");
    name.textContent = emp.employeeName;
    name.value = emp.id;
    comboBox.appendChild(name);
  });
}

function FillBoxes() {
  var ordLen = parseInt(LastOrders.length);
  num.innerText = ordLen;
  sumPrice.innerText = `$${sumTotalPrice.toLocaleString()}`;
}

function Listview(orders) {
  orders.map((order) => {
    fillList(".topic1", order.id);
    fillList(".topic2", order.customerId);
    fillList(".topic3", order.employeeName);
    fillList(".topic4", order.orderDate.slice(0, 10));
    fillList(".topic5", `$${order.totalPrice}`);
  });

  sumTotalPrice = orders.reduce(
    (acc, order) => acc + parseInt(order.totalPrice),
    0
  );

  LastOrders = orders;
  FillBoxes();
}
var sortbutton = document.querySelector(".sort");
sortbutton.addEventListener("click", SortArrays);

function SortArrays() {
  console.log("sort");
  console.log(LastOrders);

  SortedOrders = LastOrders.sort((a, b) => a.totalPrice - b.totalPrice);

  var li = document.querySelectorAll(".topic li");
  li.forEach((li) => {
    li.remove();
  });

  for (let index = 0; index < SortedOrders.length; index++) {
    console.log(SortedOrders[index].totalPrice);
    fillList(".topic1", SortedOrders[index].id);
    fillList(".topic2", SortedOrders[index].customerId);
    fillList(".topic3", SortedOrders[index].employeeName);
    fillList(".topic4", SortedOrders[index].orderDate);
    fillList(".topic5", SortedOrders[index].totalPrice);
  }
}

fetchOrders();
fetchEmployee();
