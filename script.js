// AOS Initialization (Animate on Scroll)
AOS.init();

// Toggle Mobile Navigation Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
}

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}

// Toggle the mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('open'); // Toggle the 'open' class to show/hide the menu
}

  // Function to open the modal and display the clicked image
  function openModal(src, x, y) {
    const modal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');
    const enlargedPhoto = document.getElementById('enlargedPhoto');

    enlargedPhoto.src = src;
    
    // Display the modal
    modal.style.display = 'flex'; // Ensure the modal is displayed
    modal.style.opacity = '1'; // Make the modal visible

    // Set initial position where the image was clicked
    modalContent.style.transformOrigin = `${x}px ${y}px`; // Set the origin based on the click position
    modalContent.style.transform = 'scale(1)'; // Reset the scale for the image

    // Add the "show" class for smooth transition
    setTimeout(() => {
      modal.classList.add('show'); // Make the modal visible with transition
      modalContent.classList.add('show'); // Make the image grow smoothly
    }, 10); // Add a slight delay to ensure the display and opacity are applied before transition
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.classList.remove('show'); // Hide the image smoothly

    setTimeout(() => {
      modal.style.opacity = '0'; // Fade out the modal
      modal.style.display = 'none'; // Completely hide after transition
    }, 300); // Delay matches the transition duration
  }

  // Add click event listeners to all images
  const photoContainers = document.querySelectorAll('.photo-container');
  photoContainers.forEach(container => {
    container.addEventListener('click', function (event) {
      const imgSrc = this.querySelector('img').src;
      const x = event.clientX; // Get the X position of the click
      const y = event.clientY; // Get the Y position of the click
      openModal(imgSrc, x, y); // Pass the click position to the modal
    });
  });

  // Close the modal when clicking outside of the image
  const modal = document.getElementById('photoModal');
  modal.addEventListener('click', function (event) {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent.contains(event.target)) {
      closeModal(); // Close the modal if clicked outside the image
    }
  });
