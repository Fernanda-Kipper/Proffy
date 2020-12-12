import React, { useState, FormEvent } from 'react';

import './styles.css'
import PageHeader from '../../components/page-header';
import TeacherItem, { Teacher } from '../../components/teacher-item'
import Input from '../../components/input';
import Select from '../../components/select';
import api from '../../services/api';


function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('/classes',{
            params:{
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffys disponiveís :)">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={e=> {
                        setSubject(e.target.value)
                    }}
                    options={[
                        {value:'Artes', label:'Artes'},
                        {value:'Biologia', label:'Biologia'},
                        {value:'Histótia', label:'História'},
                        {value:'Matemática', label:'Matemática'},
                        {value:'Química', label:'Química'},
                        {value:'Sociologia', label:'Sociologia'},
                        {value:'Filosia', label:'Filosofia'},
                        {value:'Fisíca', label:'Fisíca'},
                        {value:'Português', label:'Português'},
                        {value:'Redação', label:'Redação'},
                        {value:'Literatura', label:'Literatura'},
                        {value:'Inglês', label:'Inglês'}
                    ]}
                    />
                    <Select 
                    name="week_day" 
                    label="Dia da semana"
                    value={week_day}
                    onChange={e=> {
                        setWeek_day(e.target.value)
                    }}
                    options={[
                        {value:'1', label:'Segunda'},
                        {value:'2', label:'Terça'},
                        {value:'3', label:'Quarta'},
                        {value:'4', label:'Quinta'},
                        {value:'5', label:'Sexta'},
                        {value:'6', label:'Sábado'}
                    ]}
                    />
                    <Input
                        name="time"
                        label="Horário"
                        value={time}
                        onChange={e=> {
                            setTime(e.target.value)}}
                      />
                      <button type="submit"> Buscar </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem  key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;