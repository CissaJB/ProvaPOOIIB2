import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LeilaoService {
    constructor() {}

    async listLeilao(id?: string) {
        try {
            if (id) {
                const leilao = await prisma.leilao.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        lances: true,
                        dono: true,
                    },
                });
                return leilao;
            } else {
                const leiloes = await prisma.leilao.findMany({
                    include: {
                        lances: true,
                        dono: true,
                    },
                });
                return leiloes;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createLeilao(leilao: Prisma.LeilaoCreateInput) {
        try {
            const newLeilao = await prisma.leilao.create({
                data: leilao,
            });
            return newLeilao;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateLeilao(id: string, leilao: Prisma.LeilaoUpdateInput) {
        try {
            const updatedLeilao = await prisma.leilao.update({
                where: {
                    id,
                },
                data: leilao,
            });

            return updatedLeilao;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteLeilao(id: string) {
        try {
            const deletedLeilao = await prisma.leilao.delete({
                where: {
                    id,
                },
            });

            return deletedLeilao;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new LeilaoService();