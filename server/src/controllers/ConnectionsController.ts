import { Request, Response } from 'express';
import db from '../database/conections';

export default class ConnectionsController{
    
    async index(req: Request, res: Response){
        const totalConnections = await db('conections').count('* as total');
        const { total } = totalConnections[0];

        return res.json({total});
    }
    
    async create(req: Request, res: Response){
        const { user_id } = req.body;

        await db('conections').insert({
            user_id,
        });

        return res.status(201).send("conexão criada");
    }
}