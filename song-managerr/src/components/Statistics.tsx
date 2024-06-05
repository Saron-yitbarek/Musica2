import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchSongStatistics } from '../store/songsSlice';
import {
  StatsContainer,
  StatsHeader,
  StatsItem,
  StatsList,
  StatsListItem,
  NoDataMessage,
  ToggleButton,
  BackgroundOverlay,
  ButtonContainer,
  StyledButton,
} from './StatisticsStyles';

const Statistics: React.FC = () => {
  const statistics = useSelector((state: RootState) => state.songs.statistics);
  const dispatch = useDispatch<AppDispatch>();
  const [showStatistics, setShowStatistics] = useState(false);

  useEffect(() => {
    dispatch(fetchSongStatistics());
  }, [dispatch]);

  const toggleStatisticsVisibility = () => {
    setShowStatistics(!showStatistics);
  };

  if (!statistics) {
    return <StatsContainer>Loading...</StatsContainer>;
  }

  const {
    totalSongs = 0,
    totalArtists = 0,
    totalAlbums = 0,
    totalGenres = 0,
    songsPerGenre = {},
    artistStats = {},
    songsPerAlbum = {},
  } = statistics;

  return (
    <>
      <ButtonContainer>
        <StyledButton onClick={toggleStatisticsVisibility}>Statistics</StyledButton>
      </ButtonContainer>
      {showStatistics && (
        <>
          <BackgroundOverlay />
          <StatsContainer>
            <ToggleButton onClick={toggleStatisticsVisibility}>x</ToggleButton>
            <StatsHeader>Statistics</StatsHeader>
            <StatsItem>Total Songs: {totalSongs}</StatsItem>
            <StatsItem>Total Artists: {totalArtists}</StatsItem>
            <StatsItem>Total Albums: {totalAlbums}</StatsItem>
            <StatsItem>Total Genres: {totalGenres}</StatsItem>

            <StatsHeader>Songs by Genre</StatsHeader>
            {Object.entries(songsPerGenre).length > 0 ? (
              <StatsList>
                {Object.entries(songsPerGenre).map(([genre, count]) => (
                  <StatsListItem key={genre}>
                    <span>{genre}:</span> <span>{count} songs</span>
                  </StatsListItem>
                ))}
              </StatsList>
            ) : (
              <NoDataMessage>No data available</NoDataMessage>
            )}

            <StatsHeader>Songs & Albums by Artist</StatsHeader>
            {Object.entries(artistStats).length > 0 ? (
              <StatsList>
                {Object.entries(artistStats).map(([artist, { totalSongs, totalAlbums }]) => (
                  <StatsListItem key={artist}>
                    <span>{artist}:</span>
                    <span>
                      
                      {totalSongs} {totalSongs === 1 ? 'song' : 'songs'}, {totalAlbums}{' '}
                      {totalAlbums === 1 ? 'album' : 'albums'}
                    </span>
                  </StatsListItem>
                ))}
              </StatsList>
            ) : (
              <NoDataMessage>No data available</NoDataMessage>
            )}

            <StatsHeader>Songs by Album</StatsHeader>
            {Object.entries(songsPerAlbum).length > 0 ? (
              <StatsList>
                {Object.entries(songsPerAlbum).map(([album, count]) => (
                  <StatsListItem key={album}>
                    <span>{album}:</span> <span>{count} songs</span>
                  </StatsListItem>
                ))}
              </StatsList>
            ) : (
              <NoDataMessage>No data available</NoDataMessage>
            )}
          </StatsContainer>
        </>
      )}
    </>
  );
};

export default Statistics;