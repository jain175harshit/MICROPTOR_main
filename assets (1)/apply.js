// assets/apply.js

// 1) Prefill position from query string (e.g. apply.html?position=Embedded%20Engineer)
(function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const pos = params.get("position");
    const subj = params.get("subject");
    
    // Prefill position field
    if (pos) {
      const posEl = document.getElementById("position");
      if (posEl) posEl.value = pos;
    }
    
    // Also support "subject" parameter for backward compatibility
    if (subj && !pos) {
      const posEl = document.getElementById("position");
      if (posEl) posEl.value = subj.replace(/^Apply\s+/i, '');
    }
  } catch (e) {
    console.warn("Could not prefill position from URL", e);
  }
})();

// 2) Handle form submission with redirect to thanks page
(function () {
  const form = document.getElementById("application-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    
    console.log("Application form submitted – sending to Google Forms…");
    
    // Get form data
    const formData = new FormData(form);
    const googleFormURL = form.action;
    
    // Submit to Google Forms using fetch (in the background)
    fetch(googleFormURL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms
    })
    .then(() => {
      // Redirect to thanks page after submission
      window.location.href = 'thanks.html';
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      // Still redirect to thanks page even if there's an error
      window.location.href = 'thanks.html';
    });
  });
})();
