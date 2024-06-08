import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  artistStats: Record<string, { totalSongs: number; totalAlbums: number }>;
  songsPerAlbum: Record<string, number>;
}

interface SongsState {
  songs: Song[];
  statistics: Statistics;
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  statistics: {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    songsPerGenre: {},
    artistStats: {},
    songsPerAlbum: {},
  },
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchAllSongs: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllSongsFulfilled: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchAllSongsRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createNewSong: (state,error) => {
      state.loading = true;
      state.error = null;
      
    },
    createNewSongFulfilled: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.push(action.payload);
    },
    createNewSongRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateExistingSong: (state, action: PayloadAction<Song>) => {
      state.loading = true;
      state.error = null;
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false; 
    },
    updateExistingSongFulfilled: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateExistingSongRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeSong: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    removeSongFulfilled: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    removeSongRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongStatistics: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongStatisticsFulfilled: (state, action: PayloadAction<Statistics>) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    fetchSongStatisticsRejected: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllSongs,
  fetchAllSongsFulfilled,
  fetchAllSongsRejected,
  createNewSong,
  createNewSongFulfilled,
  createNewSongRejected,
  updateExistingSong,
  updateExistingSongFulfilled,
  updateExistingSongRejected,
  removeSong,
  removeSongFulfilled,
  removeSongRejected,
  fetchSongStatistics,
  fetchSongStatisticsFulfilled,
  fetchSongStatisticsRejected,
} = songsSlice.actions;

export default songsSlice.reducer;
