import { crudRepository } from './crud.repository.js'
import Channel from '../schema/channel.js'
export const channelRepository = {
  ...crudRepository(Channel)
}
