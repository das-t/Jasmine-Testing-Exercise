window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }

  function getCurrentUIValues() {
    return {
      amount: +(document.getElementById("loan-amount").value),
      years: +(document.getElementById("loan-years").value),
      rate: +(document.getElementById("loan-rate").value),
    }
  };

  // Call a function to calculate the current monthly payment

function setupIntialValues() {
  // Put some default values in the inputs
  const values = { amount: 15000, years: 5, rate: 4.85 };

  // Get the inputs from the DOM.
  const principleAmount = document.getElementById("loan-amount");
  principleAmount.value = values.amount;

  const termYears = document.getElementById("loan-years");
  termYears.value = values.years;

  const yearlyRate = document.getElementById("loan-rate");
  yearlyRate.value = values.rate;

  update();
};


function update() {
  // Get the current values from the UI
  const currentValuesFromUI = getCurrentUIValues();

  // Update the monthly payment
  updateMonthly(calculateMonthlyPayment(currentValuesFromUI)); 
};

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string

//monthly payment=(𝑃 * i) / [1-(1+𝑖)−𝑛
// P = amount; i = rate * 12; n = years * 12; 
// [amount * (rate * 12)] / [1 - (1 + [rate * 12]^(years * 12))]

function calculateMonthlyPayment(values) {
  const monthlyPymnts = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12); //total number of payments (years * 12)
    
  return (
    (monthlyPymnts * values.amount) /
    (1 - Math.pow((1 + monthlyPymnts), -n))
  ) .toFixed(2); // that always has 2 decimal places
};

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const showMonthlyPymnt = document.getElementById('monthly-payment');
  showMonthlyPymnt.innerText = "$" + monthly;
};

});





