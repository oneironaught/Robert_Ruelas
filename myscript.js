('Slider function does not throw error with multiple images', () => {
  // Arrange
  const sliderImages = [
    document.createElement('img'),
    document.createElement('img'),
    document.createElement('img'),
  ];

  // Act
  slider();

  // Assert
  expect(sliderImages[0].style.opacity).toBe('1');
  expect(sliderImages[1].style.opacity).toBe('0');
  expect(sliderImages[2].style.opacity).toBe('0');
});

// Google Capthca 
  function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ', {action: 'LOGIN'});
    });
  }

  // Fetch
  fetch('https://recaptchaenterprise.googleapis.com/v1/projects/my-project-6774-1717554360401/assessments?key=6LcTPvEpAAAAAFpUM_cZh5EWZzAFzYAoA_jW2cMZ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key1: 'value1',
      key2: 'value2'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  