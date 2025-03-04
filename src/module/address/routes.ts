import { Router } from 'express';
import * as ctrl from './controller';
import valid from "./validator"

const route = Router();

route.post('/addresses', valid.createAddress, ctrl.createAddress);
route.get('/addresses/:user_id', ctrl.getUserAddress);
route.patch('/addresses/:user_id', ctrl.updateUserAddress);

export default route;
