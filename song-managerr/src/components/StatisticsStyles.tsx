import styled from '@emotion/styled';

export const StatsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  max-width: 90%; /* or a specific max-width like 600px for better content management */
  max-height: 90%;
  overflow-y: auto; /* Enables scrolling if content overflows */
`;

export const StatsHeader = styled.h2`
  color: #1db954;
  margin-bottom: 10px;
`;

export const StatsItem = styled.p`
  margin-bottom: 5px;
`;

export const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0;
`;

export const StatsListItem = styled.li`
  margin-bottom: 5px;
`;

export const NoDataMessage = styled.p`
  color: #b3b3b3;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10001;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ButtonContainer = styled.div`
  position: fixed;
  top: 95px;
  right: 150px;
  z-index: 10001;
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
