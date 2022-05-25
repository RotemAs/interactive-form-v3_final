// console.log('test')
// globals
const userName = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role");
const jobRole = document.getElementById("title");
const shirtColor = document.getElementById("shirt-colors");
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const childColor = colorSelect.children;
const other = document.getElementById("other");

//Variables for step 6
const registers = document.getElementById("activities");
const rgisterCheckBox = registers.querySelectorAll("input[type=checkbox]");
const totalPayActivities = document.getElementById("activities-cost");
let total = 0;

//Variables for step 7
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//Variables for Step 8

const CardNum = document.getElementById("cc-num");
const ZipCode = document.getElementById("zip");
const CardCcv = document.getElementById("cvv");
const email = document.getElementById("email");
const form = document.querySelector("form");

//STEP 3
userName.focus();

//STEP 4
otherJobRole.style.display = "none";
jobRole.addEventListener("change", (e) => {
  if (jobRole.value == "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

//STEP 5
//shirt design selected
const jspuns = document.getElementsByClassName("jspuns");
// shirtColor.style.display = 'none'
colorSelect.disabled = true;
console.log("test color400", colorSelect);
designSelect.addEventListener("change", (e) => {
  for (let i = 1; i < childColor.length; i++) {
    let targetValue = e.target.value;
    let child = childColor[i];
    let dataTheme = child.getAttribute("data-theme");

    if (dataTheme === targetValue) {
      colorSelect.disabled = false;
      child.hidden = false;
      child.setAttribute("data-theme", dataTheme);
      child.selected = true;
    } else {
      child.hidden = true;
    }
  }
});

//STEP 6
registers.addEventListener("change", (e) => {
  let datacost = parseInt(e.target.getAttribute("data-cost"));
  if (e.target.checked) {
    for (let i = 0; i < rgisterCheckBox.length; i++) {
   timeCallpsPrevent(i,true,e)
    }
    total += datacost;
  } else {
    for (let i = 0; i < rgisterCheckBox.length; i++) {
    
        timeCallpsPrevent(i,false,e)
      }
    total -= datacost;
  }
  totalPayActivities.innerHTML = `Total: $${total}`;
});


//STEP 7 defaults payment method to credit card,
//if other chosen then respected content displayed
paypal.style.display = "none";
bitcoin.style.display = "none";

payment[1].setAttribute("selected", "");

payment.addEventListener("change", (e) => {
  //selected payment method
  let selected = e.target.value;

  if (selected === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (selected === "bitcoin") {
    paypal.style.display = "none";
    creditCard.style.display = "none";
    bitcoin.style.display = "block";
  } else {
    paypal.style.display = "none";
    creditCard.style.display = "block";
    bitcoin.style.display = "none";
  }
});

//STEP 8
//real time checks
createEventDigitStart(userName, isValidName, 3);
createEvent(email, isValidEmail);
createEventDigitStart(CardNum, isValidCardNumber, 13);

createEvent(ZipCode, isValidZipCode);
createEventDigitStart(CardCcv, isValidCvv, 3);

//funcs

function isValidName() {
  const nameRegEx = /(?=.*(^(?!\s*$).+))(?=.*(^[a-zA-Z0-9_ ]*$))/.test(
    userName.value
  );
  if (nameRegEx === true) {
    userName.parentNode.className = "valid";
    userName.parentNode.lastElementChild.style.display = "none";
    return nameRegEx;
  } else {
    userName.parentNode.className = "not-valid";
    userName.parentNode.lastElementChild.style.display = "block";
    userName.parentNode.lastElementChild.textContent =
      "You sure this is your name?";
    return nameRegEx;
  }
}

function isValidEmail() {
  //regex matches beginning of string with any character + @ character + . + letters from a-z
  const emailRegEx =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
      email.value
    );
  if (emailRegEx === true) {
    email.parentNode.className = "valid";
    email.parentNode.lastElementChild.style.display = "none";
    return emailRegEx;
  } else {
    email.parentNode.className = "not-valid";
    email.parentNode.lastElementChild.style.display = "block";
    email.parentNode.lastElementChild.textContent =
      "Please insert correct email";
    return emailRegEx;
  }
}

function isValidActivities() {
  let activitiesBox = document.getElementById("activities-box");
  //if value of activities does not equal 0, returns true
  if (total !== 0) {
    //replaces the not valid class name with valid,
    activitiesBox.parentNode.classList.replace("not-valid", "valid");
    activitiesBox.parentNode.lastElementChild.style.display = "none";
    return true;
  } else {
    //adds not-valid class to activities box
    activitiesBox.parentNode.classList.add("not-valid");
    activitiesBox.parentNode.lastElementChild.style.display = "block";
    activitiesBox.parentNode.lastElementChild.textContent =
      "Please choose at least one";
  }
}

function isValidCardNumber() {
  //regex tests start of string,matches any digits between 13 and 16 characters
  const cardNumberRegEx = /^\d{13,16}$/.test(CardNum.value);
  if (cardNumberRegEx === true) {
    CardNum.parentNode.className = "valid";
    CardNum.parentNode.lastElementChild.style.display = "none";
    return cardNumberRegEx;
  } else {
    CardNum.parentNode.className = "not-valid";
    CardNum.parentNode.lastElementChild.style.display = "block";
    CardNum.parentNode.lastElementChild.textContent =
      "Hmm, this dosent look correct, try again?";
    return cardNumberRegEx;
  }
}
function isValidZipCode() {
  //regex tests start of string, matches number with 5 digits
  const zipRegEx = /^[0-9]{5}$/.test(ZipCode.value);
  if (zipRegEx === true) {
    ZipCode.parentNode.className = "valid";
    ZipCode.parentNode.lastElementChild.style.display = "none";
    return zipRegEx;
  } else {
    ZipCode.parentNode.className = "not-valid";
    ZipCode.parentNode.lastElementChild.style.display = "block";
    ZipCode.parentNode.lastElementChild.textContent =
      "Please insert valid zip code";
    return zipRegEx;
  }
}

function isValidCvv() {
  //regex tests start of string, matches number with 3 digits
  const CvvRegEx = /^\d{3}$/.test(CardCcv.value);
  if (CvvRegEx === true) {
    CardCcv.parentNode.className = "valid";
    CardCcv.parentNode.lastElementChild.style.display = "none";
    return CvvRegEx;
  } else {
    CardCcv.parentNode.className = "not-valid";
    CardCcv.parentNode.lastElementChild.style.display = "block";
    CardCcv.parentNode.lastElementChild.textContent = "Please insert valid ccv";
    return CvvRegEx;
  }
}

//tests for payment section, returns true if all payment items are correct

function isValidPayment() {
  if (payment.value === "credit-card") {
    if (isValidCardNumber() && isValidCvv() && isValidZipCode()) {
      return true;
    } else {
      return false;
    }
  } else if (payment.value === "paypal") {
    return true;
  } else if (payment.value === "bitcoin") {
    return true;
  }
}

// Event listener for submitting the form

form.addEventListener("submit", (e) => {
  if (
    isValidName() &&
    isValidEmail() &&
    isValidActivities() &&
    isValidPayment()
  ) {
    console.log("correct");
    alert("correct");
  } else {
    e.preventDefault();
    isValidName();
    isValidEmail();
    isValidPayment();
    isValidActivities();
    isValidCvv();
    isValidZipCode();
    alert("Incorrect user inputs");
  }
});
//  Recent Activities Accessibility
for (let i = 0; i < rgisterCheckBox.length; i++) {
  rgisterCheckBox[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });

  rgisterCheckBox[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}
