import React, { ChangeEvent, useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm'
import { ContactsType, ProfileType } from '../../../types/types'
import { Button, Spin, Tabs, Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false)
  const { Title } = Typography

  if (!profile) {
    return <Spin size='large' />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0])
      console.log(e)
    }
  }

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }

  return (
    <div className={s.profileWrapper}>
      <div className={s.nameBlock}>
        <Title>
          <span>{profile.fullName}</span>
        </Title>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
      <input className={s.file} type={'file'} id='file' onChange={onMainPhotoSelected} />
      <div className={s.avatarBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && (
          <Button>
            <label htmlFor='file' className={s.label}>
              <span>Upload Photo</span>
            </label>
          </Button>
        )}
      </div>

      <div className={s.descriptionBlock}>
        {editMode ? (
          <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true)
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
      </div>
    </div>
  )
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  const { TabPane } = Tabs

  const operations = <EditOutlined onClick={goToEditMode} />

  const { Text } = Typography

  return (
    <div>
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab='Information' key='1'>
          <div>
            <Text strong>Looking for a job </Text>: {profile.lookingForAJob ? 'yes' : 'no'}
          </div>
          {profile.lookingForAJob && (
            <div>
              <Text strong>My professional skills </Text>: {profile.lookingForAJobDescription}
            </div>
          )}
          <div>
            <Text strong>About me</Text>: {profile.aboutMe}
          </div>
        </TabPane>
        <TabPane tab='Contacts' key='2'>
          <div>
            {Object.keys(profile.contacts).map((key) => {
              return (
                <Contact
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof ContactsType]}
                />
              )
            })}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  const { Text } = Typography
  return (
    <div className={s.contact}>
      <Text strong>{contactTitle}</Text>: {contactValue}
    </div>
  )
}
export default ProfileInfo
