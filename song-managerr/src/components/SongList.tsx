import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeSong } from '../store/songsSlice';
import SongForm from './AddSong';
import { faMusic, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  ListContainer,
  SongItem,
  IconContainer,
  EditIcon,
  DeleteIcon,
  MusicIcon,
  SongTitle,
  SongDetail,
} from './SongListStyles';


const GenreFilter: React.FC<{ onChange: (genre: string) => void }> = ({ onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '20px' }}>
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" onChange={(e) => onChange(e.target.value)}  style={{ backgroundColor: 'darkgrey', color: 'white' }}>
        <option value="">All Genres</option>
        <option value="Rock">Rock</option>
        <option value="Pop">Pop</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Blues">Blues</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Classical">Classical</option>
        <option value="R&B">R&B (Rhythm and Blues)</option>
   
      </select>
    </div>
  );
};

const SongList: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);
  const dispatch = useDispatch<AppDispatch>();
  const [editingSong, setEditingSong] = useState<any | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    dispatch(removeSong(id));
  };

  const handleEdit = (song: any) => {
    setEditingSong(song);
  };

  const handleSubmit = () => {
    setEditingSong(null);
  };

  const filteredSongs = selectedGenre ? songs.filter(song => song.genre === selectedGenre) : songs;

  return (
    <ListContainer>
      <GenreFilter onChange={setSelectedGenre} />
      {filteredSongs.map((song) => (
        <SongItem key={song._id}>
          <IconContainer>
            <MusicIcon icon={faMusic} />
            <div>
              <SongTitle>{song.title}</SongTitle>
              <SongDetail>Artist: {song.artist}</SongDetail>
              <SongDetail>Album: {song.album}</SongDetail>
              <SongDetail>Genre: {song.genre}</SongDetail>
            </div>
          </IconContainer>
          <div>
            <EditIcon icon={faEdit} onClick={() => handleEdit(song)} />
            <DeleteIcon icon={faTrash} onClick={() => handleDelete(song._id)} />
          </div>
        </SongItem>
      ))}
      {editingSong && <SongForm song={editingSong} isEditing onSubmit={handleSubmit} />}
    </ListContainer>
  );
};

export default SongList;
