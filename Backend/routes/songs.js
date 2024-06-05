const express = require('express');
const router = express.Router();
const Song = require('../models/Songs');

// Create a new song
router.post('/', async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    const newSong = new Song({ title, artist, album, genre });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a song
router.put('/:id', async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, album, genre },
      { new: true }
    );
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a song
router.delete('/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').then(artists => artists.length);
    const totalAlbums = await Song.distinct('album').then(albums => albums.length);
    const totalGenres = await Song.distinct('genre').then(genres => genres.length);

    const genreCount = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]);

    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          totalAlbums: { $addToSet: "$album" }
        }
      },
      {
        $project: {
          totalSongs: 1,
          totalAlbums: { $size: "$totalAlbums" }
        }
      }
    ]);

    const albumCount = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } }
    ]);

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre: genreCount.reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, {}),
      artistStats: artistStats.reduce((acc, cur) => {
        acc[cur._id] = {
          totalSongs: cur.totalSongs,
          totalAlbums: cur.totalAlbums
        };
        return acc;
      }, {}),
      songsPerAlbum: albumCount.reduce((acc, cur) => {
        acc[cur._id] = cur.count;
        return acc;
      }, {})
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
