/*
 * Action for feature photos
 * */

import {
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_GET_REQUEST,
  PHOTOS_GET_SUCCESS,
  PHOTOS_UPLOAD_REQUEST,
  PHOTOS_UPLOAD_SUCCESS
} from '../constants/actionTypes';

export function getPhotos() {
  return function (dispatch) {
    return new Promise(function(){{
      dispatch({
        type: PHOTOS_GET_REQUEST
      });
      // remove once API is integrated
      let photos = localStorage.getItem('photos@aig');
      if(!photos){
        photos = [];
      }
      else{
        photos = JSON.parse(photos);
        photos = photos.map(function(photo){
          return JSON.parse(photo);
        });
      }

      // dispatch - and save photos in Redux
      dispatch({
        type: PHOTOS_GET_SUCCESS,
        data: photos
      });

    }});
  };
}

export function uploadPhoto(photo) {
  return function (dispatch) {
    return new Promise(function(){{
      dispatch({
        type: PHOTOS_UPLOAD_REQUEST
      });
      // remove once API is integrated
      let photos = localStorage.getItem('photos@aig');
      if(!photos){
        photos = [];
        photos.push(JSON.stringify(photo));
      }
      else{
        photos = JSON.parse(photos);
        photos.unshift(JSON.stringify(photo));
      }
      localStorage.setItem('photos@aig', JSON.stringify(photos));

      // dispatch - and update Redux as well
      dispatch({
        type: PHOTOS_UPLOAD_SUCCESS,
        data: photo
      });

    }});
  };
}

export function deletePhotos(photoId) {
  return function (dispatch) {
    return new Promise(function(){{
      dispatch({
        type: PHOTOS_DELETE_REQUEST
      });
      // remove once API is integrated
      let photos = localStorage.getItem('photos@aig');
      photos = JSON.parse(photos);
      let photosNew = photos.filter(function(photo){
        photo = JSON.parse(photo);
        if(photo.id !== photoId){
          return JSON.stringify(photo);
        }
      });
      localStorage.setItem('photos@aig', JSON.stringify(photosNew));

      // dispatch - and update Redux as well
      dispatch({
        type: PHOTOS_DELETE_SUCCESS,
        data: photoId
      });

    }});
  };
}
