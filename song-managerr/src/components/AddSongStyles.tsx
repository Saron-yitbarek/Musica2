import styled from '@emotion/styled';

export const PageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #282828;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  background-color: #181818;
  color: #b3b3b3;

  .close-button {
    position: absolute;
    top: 3px;
    right: 3px;
    padding: 5px;
    border: none;
    background-color: transparent;
    color: #b3b3b3;
    font-size: 18px;
    cursor: pointer;
  }

  .close-button:hover {
    color: #ffffff;
  }
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 16px;
  background-color: #282828;
  color: #b3b3b3;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #535353;
  color: white;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  top: 55px;
  right: 150px;
  z-index: 9999;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: linear-gradient(135deg, #1db954, #f9e000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 500px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1ed760;
  }

  &:active {
    background-color: #1aa34a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.6);
  }
`;
