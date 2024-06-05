import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  border: 1px solid #282828;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  background-color: #121212;
`;

export const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #282828;
  color: #b3b3b3;

  &:last-child {
    border-bottom: none;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EditIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: #b3b3b3;
  cursor: pointer;

  &:hover {
    color: #1db954;
  }
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  color: #b3b3b3;
  cursor: pointer;

  &:hover {
    color: #ff4d4d;
  }
`;

export const MusicIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  margin-right: 15px;
  color: #1db954;
`;

export const SongTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #ffffff;
`;

export const SongDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #b3b3b3;
`;

export const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  border-radius: 20px;
  background-color: #1db954;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1ed760;
  }
`;

export const EditButton = styled(Button)`
  background-color: #535353;

  &:hover {
    background-color: #636363;
  }
`
