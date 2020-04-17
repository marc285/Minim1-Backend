import { Router } from 'express';
import clusterRouter from './clusterRoutes';

const router: Router = Router();

router.use('/clusters', clusterRouter);

export default router;