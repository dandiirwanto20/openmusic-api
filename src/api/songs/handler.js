/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    const songValidated = this._validator.validateSongPayload(request.payload);

    const songId = await this._service.addSong(songValidated);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const queryParams = request.query;

    const songs = await this._service.getSongs(queryParams);

    const response = h.response({
      status: 'success',
      data: {
        songs,
      },
    });
    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      data: {
        song,
      },
    });
    return response;
  }

  async putSongByIdHandler(request, h) {
    const songValidated = this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, songValidated);

    const response = h.response({
      status: 'success',
      message: 'Song berhasil diperbarui',
    });
    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    const response = h.response({
      status: 'success',
      message: 'Song berhasil dihapus',
    });
    return response;
  }
}

module.exports = SongHandler;
