/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SessionController = () => import('#controllers/session_controller')

router.on('/login').render('pages/login')

router.post('/login', [SessionController, 'store']).as('login')

router.post('/logout', [SessionController, 'destroy']).use(middleware.auth()).as('logout')

router.on('/').render('pages/dashboard/index').use(middleware.auth()).as('dashboard')

router
  .get('/twitter/redirect', ({ ally }) => {
    return ally.use('twitter').redirect()
  })
  .as('twitter/redirect')

router.on('/signin').render('pages/signin')


router.post('/signin', [SessionController, 'signin']).as('signin')
