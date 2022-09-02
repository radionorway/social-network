import React from 'react'
import s from './Message.module.css'

type PropsType = {
  message: string
}
const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={s.message}>
      <div className={s.messageContent}>
        <span>{props.message}</span>
      </div>
    </div>
  )
}

export default Message
