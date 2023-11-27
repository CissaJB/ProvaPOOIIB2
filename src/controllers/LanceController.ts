import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import LanceService from "../services/LanceService";

class LanceController {

       async createLance(req: Request, res: Response) {
        const lanceData: Prisma.LanceCreateInput = req.body;

        try {
            const newLance = await LanceService.createLance(lanceData);

            res.status(200).json({
                status: 'ok',
                newPost: newLance
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao criar um lance'
            });
        }
    }

    async listLance(req: Request, res: Response) {
        const lance = await LanceService.listLances(); 

        res.status(200).json({
            status: 'ok',
            lance: lance
        });
    }

    async updateLance(req: Request, res: Response) {
        const lanceId = req.params.id; 
        const lanceData: Prisma.LanceUpdateInput = req.body;

        try {
            const updatedLance = await LanceService.updateLance(lanceId, lanceData);

            if (updatedLance) {
                res.status(200).json({
                    status: 'ok',
                    updatedLance: updatedLance
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Lance não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao atualizar o Lance'
            });
        }
    }
   
    async deleteLance(req: Request, res: Response) {
        const lanceId = req.params.id; 

        try {
            const deletedLance = await LanceService.deleteLance(lanceId);

            if (deletedLance) {
                res.status(200).json({
                    status: 'ok',
                    deletedLance: deletedLance
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Lance não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao excluir o Lance'
            });
        }
    }
}

export default new LanceController;