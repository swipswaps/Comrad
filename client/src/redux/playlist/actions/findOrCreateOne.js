import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const findOrCreateOne = (startTime, endTime) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.LOADING });

    const doc = await playlistAPI.findOrCreateOne(startTime, endTime);

    dispatch({ type: playlistTypes.FIND_ONE, payload: doc.data });
  } catch (err) {
    console.log('Playlist Find Or Create One Error: ', err);
  }
};
