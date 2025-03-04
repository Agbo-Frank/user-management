import { Router } from 'express';
import * as ctrl from './controller';
import valid from "./validator"

const route = Router();

route.delete('/posts/:id', ctrl.deletePost);
route.get('/posts', ctrl.getPosts);
route.post('/posts', valid.createPost, ctrl.createPost);

export default route;
