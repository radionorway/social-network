import React from 'react';
import s from './Post.module.css';
import UserPhoto from '../../../../assets/images/user.png';

type PropsType = {
  message: string;
  likesCount: number;
};
const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src={UserPhoto} />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
