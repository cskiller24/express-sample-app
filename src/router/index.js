import express from 'express';
import HomeController from "../Controller/HomeController";

const router = express.Router();

router.get('/', HomeController.index);

export default router;