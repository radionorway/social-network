import { AppStateType } from './redux-store'

export const selectIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppStateType) => {
  return state.auth.login
}

export const getProfilePhoto = (state: AppStateType) => {
  return state.profilePage.profile?.photos.small
}

export const getUserName = (state: AppStateType) => {
  return state.profilePage.profile?.fullName
}
