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