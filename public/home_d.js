// Get the file input and preview image elements
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');

// When the file input changes, update the preview image
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function() {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);
});

// Get the form element and the message element
const form = document.querySelector('form');
const message = document.getElementById('message');

// When the form is submitted, send a POST request to the server
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Show the loading spinner
  message.innerHTML = '<p>Loading...</p>';

  const name = document.getElementById('name').value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('photo', fileInput.files[0]);

  fetch('/process-form', {
    method: 'POST',
    body: formData
  }).then(response => {
    if (response.ok) {
      // If the form was processed successfully, show a success message
      message.innerHTML = '<p>Success!</p>';
    } else {
      // If there was an error, show an error message
      message.innerHTML = '<p>Error. Please try again.</p>';
    }
  });
});
