import React from "react";
import s from "./Post.module.css";

type PropsType = {
  message: string;
  likesCount: number;
};
const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
