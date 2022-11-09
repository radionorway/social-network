import React from 'react'
import { useSelector } from 'react-redux'

import { getProfile } from '../../../redux/auth-selectors'
import { PostType } from '../../../types/types'
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import Post from './Post/Post'

import s from './MyPosts.module.css'

export type MapPropsType = {
  posts: Array<PostType>
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = [...props.posts].reverse().map((p) => <Post key={p.id} message={p.message} />)

  let onAddPost = (values: AddPostFormValuesType) => {
    if (values.newPostText) {
      props.addPost(values.newPostText)
      values.newPostText = ''
    }
  }

  const profile = useSelector(getProfile)
  if (!profile) {
    return <></>
  }

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostForm onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  )
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized
