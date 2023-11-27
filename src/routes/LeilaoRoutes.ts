import LeilaoController from "../controllers/LeilaoController";
import { Router } from "express";

const LeilaoRouter = Router();

LeilaoRouter.get('/leilao', LeilaoController.listLeilao)

LeilaoRouter.post('/leilao', LeilaoController.createLeilao);

LeilaoRouter.put('/leilao', LeilaoController.updateLeilao);

LeilaoRouter.delete('/leilao', LeilaoController.deleteLeilao);

export default LeilaoRouter;