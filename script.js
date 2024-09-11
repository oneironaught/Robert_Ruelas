// Request persistent storage using the standardized API
navigator.storage.persisted().then(persistent => {
    if (!persistent) {
        console.log('Requesting persistent storage...');
        navigator.storage.persist().then(granted => {
            if (granted) {
                console.log('Persistent storage granted');
            } else {
                console.log('Persistent storage not granted');
            }
        });
    } else {
        console.log('Persistent storage has already been granted');
    }
});

// JavaScript for Accordion Interactivity
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            // Ensure smooth transition by setting transition on maxHeight
            accordionContent.style.transition = 'max-height 0.3s ease';
            
            // Set the maxHeight to the scrollHeight for a smooth expansion
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            // Set the maxHeight to 0 to collapse
            accordionContent.style.maxHeight = 0;

            // Ensure transition is smooth on collapse as well
            accordionContent.style.transition = 'max-height 0.3s ease';
        }
    });
});

// Checks if scroll container exists before adding the event listener
const scrollContainer = document.querySelector('.scroll-container');
if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}

// Photo scroll container //
const slider = document.querySelector('.slider');
let speed = 10; // Initial scroll speed

// Function to change the scroll speed (animation duration)
function changeSpeed(newSpeed) {
    const slider = document.querySelector('.slider');
    slider.style.animationDuration = `${newSpeed}s`;
  }
  
  // Example: Change the speed after 5 seconds
  setTimeout(() => {
    changeSpeed(40); // Slower speed (longer duration = slower)
  }, 5000);
  
