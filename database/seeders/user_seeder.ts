import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Bozo Lapin',
        email: 'bozo@lapin.net',
        password: 'secret',
      },
      {
        fullName: 'Giak chris',
        email: 'giak.chris@gmail.com',
        password: 'amiga',
      },
    ])
  }
}
