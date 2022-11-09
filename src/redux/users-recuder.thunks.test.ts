import { APIResponseType, ResultCodesEnum } from './../api/api'
import { actions, follow, unfollow } from './users-reducer'
import { usersAPI } from '../api/users-api'

jest.mock('../api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
  const thunk = follow(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))

  expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
  const thunk = unfollow(1)

  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))

  expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
