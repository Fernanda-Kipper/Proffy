import React from 'react';

import './style.css'
import Whatsapp from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';
import { Link } from 'react-router-dom';

export interface Teacher{
    id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

interface TeacherItemProps{
    teacher: Teacher;
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return(
        <main>
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
                <p> {teacher.bio}</p>
            <footer>
                <p> 
                    Preço por hora
                    <strong> R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={Whatsapp} alt="whatsapp"/>
                    Entrar em contato
                </a>
                <Link to={`/study/${teacher.name}`}>
                    Ver avaliações
                </Link>
            </footer>
        </article>
        </main>
    )
}

export default TeacherItem;