import React, { useState, useEffect }  from 'react';
import { useParams, Link } from 'react-router-dom';

import './styles.css'
import PageHeader from '../../components/page-header';
import api from '../../services/api';

interface ParameterPassedToSearchPerfomance{
    name: string;
}

interface TeacherPerfomance{
    teacher_performance: string,
    teacher_name: string
}

function TeacherPerfomance(){
    const name: ParameterPassedToSearchPerfomance = useParams();
    const [performances, setPerformances] = useState([]);
    const nameTeacherChoosed = name.name;

    useEffect(()=> {
        api.get('performances', {
            params:{
                name: nameTeacherChoosed
            }
        }).then(response => {
            setPerformances(response.data)
        })
        }, [nameTeacherChoosed])

    return(
        <div className="page-teacher-performance">
            <PageHeader title="Essas são as avaliações do Proffy selecionado"/>
            <main>
                <h2>{nameTeacherChoosed}</h2>
                {performances.map((performance: TeacherPerfomance) => {
                    return(
                        <div className="avaliacao">
                            <h3 key={performance.teacher_name}>"{performance.teacher_performance}"</h3>
                        </div>
                    );
                })}
                <p>Obs: os alunos não são identificados para não interferir na relação com os Proffys! Mas fique tranquilo, as mensagens são filtradas :)</p>
                <Link className="botao-avaliar" to={"/evaluate"}>
                    Avaliar esse Proffy
                </Link>
            </main>
        </div>
    );
}

export default TeacherPerfomance;