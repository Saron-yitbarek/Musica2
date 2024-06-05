import styled from '@emotion/styled';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #070d17, #1e2432);
  color: #ffffff;
  font-family: 'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;

  h1 {
    font-size: 46px;
    font-weight: 500;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #1db954, #f9e000);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    letter-spacing: 1px;
  }
`;
export const Logo = styled.img`
position: absolute;
top: 50px;
left: 70px;
width: 120px; 
height: auto;
`;