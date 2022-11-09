import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'

import {
  createField,
  Input,
  Textarea,
  GetStringKeys,
} from '../../common/FormsControls/FormsControls'
import { ProfileType } from '../../../types/types'

import s from './ProfileInfo.module.css'
import style from '../../common/FormsControls/FormsControls.module.css'
import { Typography } from 'antd'

type PropsType = {
  profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  error,
}) => {
  const { Text } = Typography
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <Text strong>Full name </Text>:{' '}
        {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input)}
      </div>
      <div>
        <Text strong>Looking for a job </Text>:
        {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {
          type: 'checkbox',
        })}
      </div>
      <div>
        <Text strong>My professional skills </Text>:
        {createField<ProfileTypeKeys>(
          'My professional skills',
          'lookingForAJobDescription',
          [],
          Textarea,
        )}
      </div>
      <div>
        <Text strong>About me</Text>:
        {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea)}
      </div>
      <div>
        <Text strong>Contacts</Text>:{' '}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <Text strong>
                {key}: {createField(key, 'contacts.' + key, [], Input)}
              </Text>
            </div>
          )
        })}
      </div>
    </form>
  )
}

const ProfileDataFormReduxFrom = reduxForm<ProfileType, PropsType>({
  form: 'edit-profile',
})(ProfileDataForm)

export default ProfileDataFormReduxFrom
