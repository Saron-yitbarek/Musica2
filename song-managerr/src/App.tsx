import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllSongs, fetchSongStatistics } from './store/songsSlice';
import SongForm from './components/AddSong';
import SongList from './components/SongList';
import Statistics from './components/Statistics';
import { AppDispatch } from './store/store';
import { AppContainer, Logo } from './AppStyles'; // Import the Logo component and add it to the import statement

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllSongs());
    dispatch(fetchSongStatistics());
  }, [dispatch]);

  return (
    <AppContainer>
      <Logo src="./image.png" alt="Logo" /> 
      <h1>Musica</h1>
      <SongForm />
      <SongList />
      <Statistics />
    </AppContainer>
  );
};

export default App;