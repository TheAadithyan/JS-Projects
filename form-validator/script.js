const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show error outline

function showError(input,message){       
  const formControl=input.parentElement;
  formControl.className='form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// show success outline

function showSuccess(input,message){       
  const formControl = input.parentElement;
  formControl.className='form-control success';
}
// email verifier

function CheckEmail(input) {
  const char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (char.test(input.value.trim())) {
    showSuccess(input);
  }else {
    showError(input, "Email is not valid");
  }
}

// Password Verifier

function CheckPasswordsMatch(input1,input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
}


// Check Required Fields

function checkRequired(inputArr){
  inputArr.forEach(function(input) {    
    if (input.value.trim()=== '') {
       showError(input, `${getFieldName(input)} is required`);
    }
    else {
      showSuccess(input);
    }
  });
}

// Check Input length

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get Field Name

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Event Listeners
 form.addEventListener('submit', e => {
      e.preventDefault();
      
      checkRequired([username, email, password, password2]);
      checkLength(username, 3, 15);
      checkLength(password, 8, 25);    
      CheckEmail(email);
      CheckPasswordsMatch(password, password2)
});