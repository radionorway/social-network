import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../../../utilities/validators/validators.ts";
import { Input } from "../../../common/FormsControls/FormsControls.tsx";
import {
  createField,
  GetStringCase,
} from "../../../common/FormsControls/FormsControls.tsx";

type PropsType = {};

export type AddPostFormValuesType = {
  newPostText: string;
};

type AddPostFormValuesTypeKeys = GetStringCase<AddPostFormValuesType>;
const AddPostForm: React.FC<
  InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>(
          "Your post",
          "newPostText",
          [required],
          Input
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<AddPostFormValuesType, PropsType>({
  form: "profile-add-post",
})(AddPostForm);
