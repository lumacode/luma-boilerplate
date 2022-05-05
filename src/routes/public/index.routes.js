import express from 'express';
import { signIn, signUp } from '../../controllers/AuthController';
const router = express.Router();

/* Auth Routes */ 
router.post('/auth/signin', signIn)
router.post('/auth/signup', signUp)


/* Tests Routes */

router.get('/test', async (req, res) => {
  res.status(200).json({status: "ok"});
})

export default router;