import dummy_posts from "../../dummy_data/dummy_posts";

const initialState = {
  posts: dummy_posts
};

const postReducer = (state = initialState, action) => {
  return state;
};

export default postReducer;
