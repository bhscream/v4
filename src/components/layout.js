// Layout.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import BackgroundSlider from './backgroundslider'; // Import the BackgroundSlider

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isHome) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isHome]);

  return (
    <>
      <Head />

      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <BackgroundSlider />

        <StyledContent>
          <Nav isHome={isHome} />
          <Social isHome={isHome} />
          <Email isHome={isHome} />

          <div id="content">
            {children}
            <Footer />
          </div>
        </StyledContent>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
