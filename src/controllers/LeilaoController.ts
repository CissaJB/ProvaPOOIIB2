import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import LeilaoService from "../services/LeilaoService";

class LeilaoController {

       async createLeilao(req: Request, res: Response) {
        const leilaoData: Prisma.LeilaoCreateInput = req.body;

        try {
            const newLeilao = await LeilaoService.createLeilao(leilaoData);

            res.status(200).json({
                status: 'ok',
                newLeilao: newLeilao
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao criar leilao'
            });
        }
    }

    async listLeilao(req: Request, res: Response) {
        const leilao = await LeilaoService.listLeilao(); 

        res.status(200).json({
            status: 'ok',
            leilao: leilao
        });
    }

    async updateLeilao(req: Request, res: Response) {
        const leilaoId = req.params.id; 
        const leilaoData: Prisma.LeilaoUpdateInput = req.body;

        try {
            const updatedLeilao = await LeilaoService.updateLeilao(leilaoId, leilaoData);

            if (updatedLeilao) {
                res.status(200).json({
                    status: 'ok',
                    updatedLeilao: updatedLeilao
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Leilao não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao atualizar Leilão'
            });
        }
    }
   
    async deleteLeilao(req: Request, res: Response) {
        const leilaoId = req.params.id; 

        try {
            const deletedLeilao = await LeilaoService.deleteLeilao(leilaoId);

            if (deletedLeilao) {
                res.status(200).json({
                    status: 'ok',
                    deletedLeilao: deletedLeilao
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Leilão não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao excluir leilão'
            });
        }
    }
}

export default new LeilaoController;