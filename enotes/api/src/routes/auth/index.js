import { Router } from 'express';
import routePostCreateUser from './route-post-create-user.js';
import routePostLogin from './route-post-login.js';
import routePostUserDetails from './route-post-user-details.js';

const router = Router();

router.use(routePostCreateUser,
  routePostLogin,
  routePostUserDetails);

export default router
;
