/* import './SliderStyle.css'



const Slider = ()=>{
    return(<>
                <div class="slider-container">
                    <div class="slider">
                        <div className="slide"><img src="src/assets/images/slide.png" alt=""/></div>
                        <div className="slide"><img src="src/assets/images/slide.png" alt=""/></div>
                        <div className="slide"><img src="src/assets/images/slide.png" alt=""/></div>
                    </div>
                </div>  

           </>)
}

export default Slider */


import React, { useState } from 'react';
import './SliderStyle.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // 3 là số lượng slides
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  };

  return (
    <>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="slide"><img src="src/assets/images/slide.png" alt="" /></div>
          <div className="slide"><img src="src/assets/images/slide.png" alt="" /></div>
          <div className="slide"><img src="src/assets/images/slide.png" alt="" /></div>        
        </div>
        <div id='next-slider'>
            <div id="Prev" onClick={prevSlide}></div>
            <div id="Next" onClick={nextSlide}></div>
        </div> 
      </div>
      
    </>
  );
};

export default Slider;
