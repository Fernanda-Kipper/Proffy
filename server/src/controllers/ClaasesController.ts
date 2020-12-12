import { Request, Response, response} from 'express';

import db from '../database/conections';
import convertHour from '../utils/convert';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesControler{

    async index(req: Request, res: Response){
        const filters = req.query;
        if (!filters.week_day || !filters.subject){
            return response.status(400).json({
                error:"Missing filter search classes"
            })
        }

        const timeInMinutes = convertHour(filters.time as string);

        const classes = await db('classes')
        .whereExists(function(){
            this.select('class-schedule.*')
                .from('class-schedule')
                .whereRaw('`class-schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class-schedule`.`week_day`= ??', [Number(filters.week_day as string)])
                .whereRaw('`class-schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class-schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', filters.subject as string)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

        console.log(timeInMinutes)
        return res.json(classes)
    }


    async create(req: Request, res: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
        const trx = await db.transaction();
        
        try{
            const insertedUserIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUserIds[0];
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesIds[0];
        
            const class_schedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHour(scheduleItem.from),
                    to: convertHour(scheduleItem.to),
                }
            });
        
            await trx('class-schedule').insert(class_schedule);
        
            await trx.commit();
        
            console.log("chegou a req")
        
            return res.status(201).send("recebido!")
        } catch(err){
            await trx.rollback();
            console.log(err)
            return res.status(400).json({
                error:"Unexpected error while registering inside db"
            })
        }
    }
}
