import { crudRepository } from './crud.repository.js'
import User from '../schema/users.js'
import { get } from 'mongoose'
export const userRepository = {
  ...crudRepository(User),
  getByEmail: async function (email) {
    const user = await User.findOne({ email })
    return user
  },
  getByUsername: async function (username) {
    const user = await User.findOne({ username })
    return user
  }
}
