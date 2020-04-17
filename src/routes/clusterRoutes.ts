import { Router } from 'express';
import clusterController from '../controllers/clusterController'

const router: Router = Router();

router.get('/', clusterController.getClusters);
router.get('/:clusterid', clusterController.getCluster);

router.post('/new', clusterController.addCluster);

router.put('/:clusterid', clusterController.editCluster);

export default router;