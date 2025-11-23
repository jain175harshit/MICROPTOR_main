// assets/contactus.js

// 1) Prefill subject from query string (e.g. contactus.html?subject=Apply%20Embedded)
(function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const subj = params.get("subject");
    if (subj) {
      const el = document.getElementById("subject");
      if (el) el.value = subj;
    }
  } catch (e) {
    console.warn("Could not prefill subject from URL", e);
  }
})();

// 2) Handle form submission with redirect to thanks page
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    
    console.log("Contact form submitted – sending to Google Forms…");
    
    // Get the submit button and disable it to prevent double submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="truncate">Sending...</span>';
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }
    
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
      console.log('Form submitted successfully to Google Forms');
      // Small delay to ensure submission is complete
      setTimeout(() => {
        window.location.href = 'thanks.html';
      }, 500);
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      // Still redirect to thanks page even if there's an error
      // (no-cors mode means we can't detect actual errors anyway)
      setTimeout(() => {
        window.location.href = 'thanks.html';
      }, 500);
    });
  });
})();
