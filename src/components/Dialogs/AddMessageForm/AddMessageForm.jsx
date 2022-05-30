import React from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utilities/validators/validators.ts";
import { Textarea } from "../../common/FormsControls/FormsControls.tsx";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLength50]}
          name="newMessageBody"
          placeholder="Enter your message"
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "dialog-add-message-form" })(AddMessageForm);
