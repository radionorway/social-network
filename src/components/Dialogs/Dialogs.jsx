import React from "react";
import { Navigate } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import DialogsItem from "./DialogItem/DialogsItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogsItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));
  //let newMessageBody = state.newMessageBody;

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Navigate to={"/login"} />;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
