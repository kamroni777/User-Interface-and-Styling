import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    ${Sidebar} {
      position: absolute;
      z-index: 10;
      transform: ${({ sidebarOpen }) => 
        sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
      transition: transform 0.3s ease;
    }
  }
`;