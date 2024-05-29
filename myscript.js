/*Image scrolling */
var sliderImages = document.querySelectorAll('.slider img');

var i = 0;

function slider(){
  for(var j = 0; j < sliderImages.length; j++){
    sliderImages[j].style.opacity = 0;
  }
  sliderImages[i].style.opacity = 1;

  if(i < sliderImages.length - 1){
    i++; 
  } else { 
    i = 0;
  }

}

setInterval(slider, 2000);