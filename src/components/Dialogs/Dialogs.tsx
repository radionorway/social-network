import { MobileOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import React from 'react'
import { InitialStateType } from '../../redux/dialogs-reducer'
import AddMessageForm from './AddMessageForm/AddMessageForm'
import s from './Dialogs.module.css'
import Message from './Message/Message'

type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage

  let messagesElements = state.messages.map((m) => <Message message={m.message} key={m.id} />)

  let addNewMessage = (values: NewMessageFormValuesType) => {
    if (values.newMessageBody) {
      props.sendMessage(values.newMessageBody)
      values.newMessageBody = ''
    }
  }

  const { Text } = Typography

  return (
    <div className={s.container}>
      <div className={s.name}>
        <div className={s.avatar}>
          <Avatar
            size={40}
            style={{
              fontSize: '20px',
              color: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(28, 38, 97)',
            }}>
            A
          </Avatar>
        </div>
        <div className={s.userName}>
          <Text strong>Andrew Sokolov</Text>
        </div>
        <div className={s.status}>
          <Text>online</Text> <MobileOutlined />
        </div>
      </div>
      <div className={s.dialogs}>
        <div>{messagesElements}</div>
      </div>
      <div className={s.form}>
        <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  )
}

export default Dialogs
