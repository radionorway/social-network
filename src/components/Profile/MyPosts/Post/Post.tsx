import React, { createElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProfilePhoto, getUserName } from '../../../../redux/auth-selectors'
import { Comment, Tooltip } from 'antd'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import moment from 'moment'

type PropsType = {
  message: string
}

const Post: React.FC<PropsType> = (props) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState<string | null>(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,
    <span key='comment-basic-reply-to'>Reply to</span>,
  ]

  const small = useSelector(getProfilePhoto) as string

  const name = useSelector(getUserName)

  return (
    <Comment
      actions={actions}
      author={name}
      avatar={small}
      content={props.message}
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  )
}

export default Post
