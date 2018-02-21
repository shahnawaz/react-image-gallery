import {
  PHOTOS_DELETE_FAIL,
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_GET_FAIL,
  PHOTOS_GET_REQUEST,
  PHOTOS_GET_SUCCESS,
  PHOTOS_UPLOAD_FAIL,
  PHOTOS_UPLOAD_REQUEST,
  PHOTOS_UPLOAD_SUCCESS
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const photos_reducer = (state = initialState.photos, action) => {
  let newState = [];
  switch(action.type){
    case PHOTOS_DELETE_FAIL:
      // TODO:
      return state;
    case PHOTOS_DELETE_SUCCESS:
      newState = [...state].filter(function(photo){
        if(photo.id !== action.data){
          return photo;
        }
      });
      return newState;
    case PHOTOS_DELETE_REQUEST:
      // TODO:
      return state;
    case PHOTOS_GET_FAIL:
      // TODO:
      return state;
    case PHOTOS_GET_REQUEST:
      return initialState.photos;
    case PHOTOS_GET_SUCCESS:
      return action.data;
    case PHOTOS_UPLOAD_FAIL:
      // TODO:
      return state;
    case PHOTOS_UPLOAD_REQUEST:
      // TODO:
      return state;
    case PHOTOS_UPLOAD_SUCCESS:
      newState = [...state];
      if(newState.length === 0){
        newState.push(action.data);
      }
      else{
        newState.unshift(action.data);
      }
      return newState;
    default:
      return state;
  }
};

export default photos_reducer;
