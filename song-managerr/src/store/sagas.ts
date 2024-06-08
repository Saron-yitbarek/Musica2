import { call, put, takeLatest, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { fetchSongs, createSong, updateSong, deleteSong, fetchStatistics } from '../api';
import { 
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
  fetchSongStatisticsRejected
} from './songsSlice';
import { PayloadAction } from '@reduxjs/toolkit';

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


function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}


function* fetchAllSongsSaga(): Generator<any, void, AxiosResponse<Song[]>> {
  try {
    const response = yield call(fetchSongs);
    yield put(fetchAllSongsFulfilled(response.data));
  } catch (error) {
    yield put(fetchAllSongsRejected(getErrorMessage(error)));
  }
}


function* createNewSongSaga(action: PayloadAction<Partial<Song>>): Generator<any, void, AxiosResponse<Song>> {
  try {
    const response = yield call(createSong, action.payload);
    yield put(createNewSongFulfilled(response.data));
  } catch (error) {
    yield put(createNewSongRejected(getErrorMessage(error)));
  }
}


function* updateExistingSongSaga(action: PayloadAction<Song>): Generator<any, void, AxiosResponse<Song>> {
  try {
    const response = yield call(updateSong, action.payload._id, action.payload);
    yield put(updateExistingSongFulfilled(response.data));
  } catch (error) {
    yield put(updateExistingSongRejected(getErrorMessage(error)));
  }
}


function* removeSongSaga(action: PayloadAction<string>): Generator<any, void, void> {
  try {
    yield call(deleteSong, action.payload);
    yield put(removeSongFulfilled(action.payload));
  } catch (error) {
    yield put(removeSongRejected(getErrorMessage(error)));
  }
}


function* fetchSongStatisticsSaga(): Generator<any, void, AxiosResponse<Statistics>> {
  try {
    const response = yield call(fetchStatistics);
    yield put(fetchSongStatisticsFulfilled(response.data));
  } catch (error) {
    yield put(fetchSongStatisticsRejected(getErrorMessage(error)));
  }
}

function* watchAll() {
  yield all([
    takeLatest(fetchAllSongs.type, fetchAllSongsSaga),
    takeLatest(createNewSong.type, createNewSongSaga),
    takeLatest(updateExistingSong.type, updateExistingSongSaga),
    takeLatest(removeSong.type, removeSongSaga),
    takeLatest(fetchSongStatistics.type, fetchSongStatisticsSaga),
  ]);
}

export default function* rootSaga() {
  yield all([watchAll()]);
}
