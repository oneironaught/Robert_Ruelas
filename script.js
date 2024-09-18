// Toggle for Experience section //
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.closest('.accordion-item').querySelector('.accordion-content');
            if (!accordionContent) {
                console.error('Accordion content not found for this button.');
                return;
            }

            button.classList.toggle('active');

            if (button.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });
});

// Photo scroll container
const slider = document.querySelector('.slider');
if (slider) {
    let speed = 10; // Initial scroll speed

    // Function to change the scroll speed (animation duration)
    function changeSpeed(newSpeed) {
        slider.style.animationDuration = `${newSpeed}s`;
    }

    // Example: Change the speed after 5 seconds
    setTimeout(() => {
        changeSpeed(40); // Slower speed (longer duration = slower)
    }, 5000);
}

// Function to change scroll speed based on screen width
function adjustScrollSpeed() {
    const slider = document.querySelector('.slider');
    const screenWidth = window.innerWidth;
  
    if (screenWidth < 480) {
      // Slower speed for very small screens (e.g., phones)
      slider.style.animationDuration = '60s';
    } else if (screenWidth < 768) {
      // Medium speed for tablets
      slider.style.animationDuration = '40s';
    } else {
      // Normal speed for larger screens
      slider.style.animationDuration = '20s';
    }
  }
  
  // Call adjustScrollSpeed on page load and when the window is resized
  window.addEventListener('load', adjustScrollSpeed);
  window.addEventListener('resize', adjustScrollSpeed);

// Hamburger for nav bar (smaller screens)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}