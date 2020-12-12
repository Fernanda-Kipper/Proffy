import { Request, Response } from 'express';
import db from '../database/conections';

export default class PerformancesController{
    
    async index(req: Request, res: Response){
        const query = req.query;
        const performances = await db('performances').select('*').where('teacher_name', '=', query.name);

        return res.json(performances);
    }
    
    async create(req: Request, res: Response){
        const { teacher_performance,
                teacher_name} = req.body;

        await db('performances').insert({
            teacher_performance,
            teacher_name
        });

        return res.status(201).send("avaliação postada!");
    }
}