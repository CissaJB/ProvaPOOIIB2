import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import UserService from "../services/UserServices";

class UserController {

    constructor() { }

    async createUser(req: Request, res: Response) {
        const dados: Prisma.UserCreateInput = req.body;

        if (dados.email !== "" && dados.nome !== "") {
            const newuser = await UserService.createUser(dados)
            res.status(200).json({
                status: 'ok',
                newuser: newuser
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Favor inserir os dados no corpo da requisição'
            })
        }
    }

    async listUsers(req: Request, res: Response) {
        const users = await UserService.listUsers(); 

        res.status(200).json({
            status: 'ok',
            users: users
        });
    }

    async updateUser(req: Request, res: Response) {
        const userId = req.params.id; // Supondo que o ID do usuário a ser atualizado está nos parâmetros da URL
        const userData: Prisma.UserUpdateInput = req.body;

        try {
            const updatedUser = await UserService.updateUser(userId, userData);

            if (updatedUser) {
                res.status(200).json({
                    status: 'ok',
                    updatedUser: updatedUser
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Usuário não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao atualizar usuário'
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId = req.params.id; // Supondo que o ID do usuário a ser excluído está nos parâmetros da URL

        try {
            const deletedUser = await UserService.deleteUser(userId);

            if (deletedUser) {
                res.status(200).json({
                    status: 'ok',
                    deletedUser: deletedUser
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    message: 'Usuário não encontrado'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao excluir usuário'
            });
        }
    }
}

export default new UserController;