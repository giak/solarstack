// import { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  async index({ view }: HttpContext) {
    return view.render('login')
  }

  async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    response.redirect('/')
  }
}
