import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Importing images
import background1 from '../images/background1.png';
import background2 from '../images/background2.png';
import background3 from '../images/background3.png';
import background4 from '../images/background4.png';
import background5 from '../images/background5.png';
import background6 from '../images/background6.png';

const images = [background1, background2, background3, background4, background5, background6];

const StyledBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  transition: opacity 1.25s ease-in-out; // Match the jQuery fade duration
  opacity: 0; // Starts as invisible
`;

const Overlay = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Black with 0.7 opacity */
  z-index: 1; /* Adjust the z-index if necessary */
`;

const BackgroundSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1); // Start with full opacity

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out the current image
      setOpacity(0);

      setTimeout(() => {
        // Change the image and fade in
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        setOpacity(1);
      }, 1250); // Transition time for fade effect, matches the jQuery fade duration
    }, 10000 + 1250); // Total duration includes full visibility plus fade time

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledBackground>
      <BackgroundImage
        style={{ backgroundImage: `url(${images[currentImageIndex]})`, opacity: opacity }}
      />
      <Overlay /> {/* The overlay div */}
    </StyledBackground>
  );
};

export default BackgroundSlider;
