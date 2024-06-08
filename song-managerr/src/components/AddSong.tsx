import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { createNewSong, updateExistingSong } from '../store/songsSlice';
import {
  PageBackground,
  FormContainer,
  Input,
  Button,
  ButtonContainer,
  StyledButton,
} from './AddSongStyles';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface AddSongProps {
  song?: Song;
  isEditing?: boolean;
  onSubmit?: () => void;
}

const AddSong: React.FC<AddSongProps> = ({ song, isEditing = false, onSubmit }) => {
  const [title, setTitle] = useState(song?.title || '');
  const [artist, setArtist] = useState(song?.artist || '');
  const [album, setAlbum] = useState(song?.album || '');
  const [genre, setGenre] = useState(song?.genre || '');
  const [isFormVisible, setFormVisible] = useState(isEditing);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isEditing) {
      setFormVisible(true);
    }
  }, [isEditing]);

  const toggleFormVisibility = () => setFormVisible(!isFormVisible);

  const handleSubmit = async () => {
    const newSong: Partial<Song> = {
      _id: isEditing ? song?._id || '' : '',
      title,
      artist,
      album,
      genre,
    };

    try {
      if (isEditing) {
        await dispatch(updateExistingSong(newSong as Song));
      } else {
        await dispatch(createNewSong(newSong));
      }
      if (onSubmit) onSubmit();
      setFormVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {isFormVisible && (
        <PageBackground onClick={toggleFormVisibility}>
          <FormContainer onClick={(e) => e.stopPropagation()}>
            <h2>{isEditing ? 'Edit Song' : 'Add Song'}</h2>
            <button className="close-button" onClick={toggleFormVisibility}>x</button>
            <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <Input type="text" placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
            <Input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <Button onClick={handleSubmit}>{isEditing ? 'Update' : 'Add'}</Button>
          </FormContainer>
        </PageBackground>
      )}

      {!isEditing && (
        <ButtonContainer>
          <StyledButton onClick={toggleFormVisibility}>Add Song</StyledButton>
        </ButtonContainer>
      )}
    </>
  );
};

export default AddSong;