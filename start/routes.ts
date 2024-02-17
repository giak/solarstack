/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SessionController = () => import('#controllers/session_controller')

import { middleware } from '#start/kernel'

router.on('/').render('pages/dashboard/index').use(middleware.auth()).as('dashboard')

router.on('/login').render('pages/login')

router.post('/login', [SessionController, 'store']).as('login')
