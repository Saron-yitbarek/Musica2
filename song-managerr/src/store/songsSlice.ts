import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSongs, createSong, updateSong, deleteSong, fetchStatistics } from '../api';

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

export const fetchAllSongs = createAsyncThunk<Song[]>('songs/fetchAll', async () => {
  const response = await fetchSongs();
  return response.data;
});

export const createNewSong = createAsyncThunk<Song, Partial<Song>>('songs/create', async (song) => {
  const response = await createSong(song);
  return response.data;
});

export const updateExistingSong = createAsyncThunk<Song, Song>('songs/update', async (song) => {
  const response = await updateSong(song._id, song);
  return response.data;
});

export const removeSong = createAsyncThunk<string, string>('songs/delete', async (_id) => {
  await deleteSong(_id);
  return _id;
});

export const fetchSongStatistics = createAsyncThunk<Statistics>('songs/fetchStatistics', async () => {
  const response = await fetchStatistics();
  return response.data;
});

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(fetchAllSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch songs';
      })
      .addCase(createNewSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSong.fulfilled, (state, action: PayloadAction<Song>) => {
        state.loading = false;
        state.songs.push(action.payload);
      })
      .addCase(createNewSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create song';
      })
      .addCase(updateExistingSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingSong.fulfilled, (state, action: PayloadAction<Song>) => {
        state.loading = false;
        const index = state.songs.findIndex((song) => song._id === action.payload._id);
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
      })
      .addCase(updateExistingSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update song';
      })
      .addCase(removeSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSong.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.songs = state.songs.filter((song) => song._id !== action.payload);
      })
      .addCase(removeSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete song';
      })
      .addCase(fetchSongStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongStatistics.fulfilled, (state, action: PayloadAction<Statistics>) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchSongStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch statistics';
      });
  },
});

export default songsSlice.reducer;
