import { Router } from 'express';
import * as ctrl from './controller';
import valid from "./validator"

const route = Router();

route.get('/users', ctrl.getUsers);
route.get('/users/count', ctrl.getUserCount);
route.get('/users/:id', ctrl.getUserById);
route.post('/users', valid.createUser, ctrl.createUser);

export default route;
