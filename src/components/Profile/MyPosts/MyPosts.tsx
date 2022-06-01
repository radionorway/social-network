import React from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { PostType } from "../../../types/types";
import {
  maxLengthCreator,
  required,
} from "../../../utilities/validators/validators.ts";
import { Textarea } from "../../common/FormsControls/FormsControls.tsx";
import AddPostForm, {
  AddPostFormValuesType,
} from "./AddPostForm/AddPostForm.tsx";
import s from "./MyPosts.module.css";
import Post from "./Post/Post.tsx";

export type MapPropsType = {
  posts: Array<PostType>;
};
export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};
const MyPostsMemorized = React.memo(MyPosts);

export default MyPosts;
