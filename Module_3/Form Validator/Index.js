const scriptURL = 'https://script.google.com/macros/s/AKfycbzOuwRLOitT_l1lfTMGhguR-RQJQ4ghHbHlbhxkHRhh2C1HlckE6hIMgvmwGoc0emfLrQ/exec'
const form = document.forms['submit-to-google-sheet']
form.addEventListener('submit', e => {
  e.preventDefault()
  validateForm()
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => alert('Success!', response))
    .catch(error => alert('Error!', error.message))
})

document.getElementById('survey-form').addEventListener('submit', function (event) {
  // Prevent the form from submitting
  event.preventDefault();
  // Reset previous error messages
  clearErrors();
  validateForm();
});

function validateForm() {
  let valid = true;

  // Get form fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const number = document.getElementById('number').value;

  // Validate name
  if (name === '') {
    displayError('name', 'Name is required');
    valid = false;
  }

  // Validate email
  if (email === '') {
    displayError('email', 'Email is required');
    valid = false;
  } else if (!isValidEmail(email)) {
    displayError('email', 'Enter a valid email address');
    valid = false;
  }
  if (number === "" && number !== Int32Array) {
    displayError('age', 'Age is required');
  }
  return valid;

}
function isValidEmail(email) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayError(field, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error';
  errorElement.innerText = message;
  document.getElementById(field).parentNode.appendChild(errorElement);
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => element.remove());
}
