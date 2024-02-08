/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/login_controller')

router.get('/test', async () => {
  return 'Hello world'
})

// The home page route
router.on('/').render('pages/home')

// The dashboard page route
router.get('/dashboard', [DashboardController, 'index'])

// The login page route
router.get('/login', [LoginController, 'index'])
