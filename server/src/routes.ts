import express from 'express';
import ClassesControler from './controllers/ClaasesController';
import ConnectionsController from './controllers/ConnectionsController';
import PerformancesController from './controllers/PerfomanceController';

const routes = express.Router();
const classesController = new ClassesControler();
const connectionsController = new ConnectionsController();
const performancesController = new PerformancesController();

routes.get("/classes", classesController.index);
routes.post("/classes", classesController.create);

routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

routes.get("/performances", performancesController.index);
routes.post("/performances", performancesController.create)

export default routes;
