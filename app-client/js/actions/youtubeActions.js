import handleFetchErrors from 'util/handleFetchErrors';

export const FETCH_VIDEOS_BEGIN   = 'FETCH_VIDEOS_BEGIN';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';
export const SET_CURR_VIDEO = 'SET_CURR_VIDEO';
export const SET_CURR_VIDEO_SUCCESS = 'SET_CURR_VIDEO_SUCCESS';
export const SET_CURR_VIDEO_BEGIN = 'SET_CURR_VIDEO_BEGIN';
export const SET_CURR_VIDEO_FAILURE = 'SET_CURR_VIDEO_FAILURE';
export const INIT_ROOM = 'INIT_ROOM';

export const fetchVideosBegin = () => ({
  type: FETCH_VIDEOS_BEGIN
});

export const fetchVideosSuccess = ({items, nextPageToken, pageInfo}) => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: {items, nextPageToken, pageInfo}
});

export const fetchVideosFailure = error => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: { error }
});

export const selectVideoSuccess = video => ({
  type: SET_CURR_VIDEO_SUCCESS,
  payload: video
})

export const selectVideoBegin = () => ({
  type: SET_CURR_VIDEO_BEGIN
})

export const selectVideoFailure = error => ({
  type: SET_CURR_VIDEO_FAILURE,
  payload: error
})

export const selectVideo = (video) => {
  return {
    type: SET_CURR_VIDEO,
    payload: video
  }

};

export const initRoom = initData => ({
  type: INIT_ROOM,
  payload: initData
})

export function searchYouTube(searchQuery) {
  var url = new URL("https://www.googleapis.com/youtube/v3/search"),
  params = { maxResults: '20', part: 'snippet', q: searchQuery, type: 'video', key: 'AIzaSyD8G85GHRd4tcsbj1pNErWlgnqcw-jWO1U'}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  // const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=moana&key=AIzaSyD8G85GHRd4tcsbj1pNErWlgnqcw-jWO1U'

  return dispatch => {
    dispatch(fetchVideosBegin());
    return fetch(url)
      .then(handleFetchErrors)
      .then(res => res.json())
      .then(youtubeJSON => {
        dispatch(fetchVideosSuccess(youtubeJSON))
        return youtubeJSON;
      })
      .catch(error => dispatch(fetchVideosFailure(error)));
  };
}
