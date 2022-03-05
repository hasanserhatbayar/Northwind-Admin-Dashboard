const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"), 
pInput = pField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (eInput.value == "") ? eField.classList.add("error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("error") : checkPass();



  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup

  function checkEmail(){ //checkEmail function

    if(eInput.value !=="andrewfuller")
    {
      eField.classList.add("error");

    }
  }

  function checkPass()
  {
    if(pInput.value!=="123Abc")
    {
      pField.classList.add("error");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(/*!eField.classList.contains("error") && !pField.classList.contains("error") &&*/ eInput.value == "andrewfuller" && pInput.value == "123Abc"){
    window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}