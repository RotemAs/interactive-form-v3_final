// userName.addEventListener('input',(e) =>{
//     isValidName()
// })

function createEvent(LocalVar, validFunction) {
  LocalVar.addEventListener("input", (e) => {
    validFunction();
  });
}

function createEventDigitStart(LocalVar, validFunction, startDigit) {
  LocalVar.addEventListener("input", (e) => {
    if (LocalVar.value.length >= startDigit) {
      validFunction();
    } else {
      LocalVar.parentNode.classList.remove("not-valid", "valid");
    }
  });
}
function timeCallpsPrevent(i,bool,e){
    if (
        rgisterCheckBox[i].getAttribute("data-day-and-time") ===
          e.target.getAttribute("data-day-and-time") &&
        e.target.getAttribute("name") !==
          rgisterCheckBox[i].getAttribute("name")
      ) {
        rgisterCheckBox[i].disabled = bool;
        if(bool===true){
            rgisterCheckBox[i].parentNode.classList.add("darkChoose");
        }else if(bool===false){
            rgisterCheckBox[i].parentNode.classList.remove("darkChoose")
        }
        
      } 
}