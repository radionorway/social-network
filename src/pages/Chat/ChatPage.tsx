import { Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../api/chat-api'
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'
import s from './ChatPage.module.css'

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === 'error' && <div>Some error occured. Please refresh the page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  )
}

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      if (messagesAnchorRef.current !== null) {
        messagesAnchorRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [messages])
  return (
    <div className={s.chat} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  const { Text } = Typography
  return (
    <div className={s.message}>
      <img className={s.avatar} src={message.photo} style={{ width: '30px' }} />
      <div className={s.name}>
        <Text strong>{message.userName}</Text>
      </div>
      <div className={s.text}>{message.message}</div>
    </div>
  )
})

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendMessageHandler = () => {
    if (!message) {
      return
    }

    dispatch(sendMessage(message))
    setMessage('')
  }
  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      </div>
      <div>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
