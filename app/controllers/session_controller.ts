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

    await auth.use('web').login(user, !!request.input('remember_me'))

    response.redirect('/')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect('/login')
  }

  // // list all async methods
  // async list({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async create({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async show({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async edit({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async update({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async delete({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async store({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async destroy({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async login({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async logout({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async dashboard({ view }: HttpContext) {
  //   return view.render('login')
  // }
  // async twitterRedirect({ view }: HttpContext) {
  //   return view.render('login')
  // }
  async signin({ view, response }: HttpContext) {
    // return view.render('login')

    response.redirect('/login')
  }
}
