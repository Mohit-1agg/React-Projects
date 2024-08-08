import { Router } from 'express';

import routeGetNote from './route-get-all-notes.js';
import routePostNote from './route-post-note.js';
import routePutNote from './route-put-notes.js';
import routeDeleteNote from './route-delete-note.js';

const router = Router();

router.use(routePostNote,
  routeGetNote,
  routeDeleteNote,
  routePutNote);

export default router
;
