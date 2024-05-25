$(document).ready(() => {
    it('should toggle the class "glyphicon-triangle-right" to "glyphicon-triangle-left" when the menu button is clicked', () => {
      // Arrange
      const wrapper = shallow(<App />);
      const menuButton = wrapper.find('.menu-big');
      const icon = menuButton.find('span');
  
      // Act
      menuButton.simulate('click');
  
      // Assert
      expect(icon.hasClass('glyphicon-triangle-right')).to.equal(false);
      expect(icon.hasClass('glyphicon-triangle-left')).to.equal(true);
    });
  });