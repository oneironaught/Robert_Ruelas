// JavaScript for Accordion Interactivity
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            // Set the maxHeight to the scrollHeight for a smooth expansion
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            // Set the maxHeight to 0 to collapse
            accordionContent.style.maxHeight = 0;
        }
    });
});

const scrollContainer = document.querySelector('.scroll-container');
scrollContainer.addEventListener('wheel', (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});