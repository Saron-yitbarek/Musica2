
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/songs';

export const fetchSongs = () => axios.get(API_URL);
export const createSong = (song: any) => axios.post(API_URL, song);
export const updateSong = (id: string, song: any) => axios.put(`${API_URL}/${id}`, song);
export const deleteSong = (id: string) => axios.delete(`${API_URL}/${id}`);
export const fetchStatistics = () => axios.get(`${API_URL}/stats`);
