import React, {useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/page-header';
import './style.css';
import Input from '../../components/input'
import warningicon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/textarea';
import Select from '../../components/select';
import api from '../../services/api';

function TeacherForm(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert('Cadastro realizado com sucesso :)');
            history.push('/');
        }).catch((err)=>{
            alert('Erro no cadastro!')
            console.log(err);
        })

        console.log(
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        )};

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 1, from: '', to: ''}
    ]);

    function addNewScheduleItem(){
        setScheduleItems(
            [...scheduleItems,
               {
                week_day: 1,
                from: '',
                to:''
               }
            ]
        )
    };

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedSchedule = scheduleItems.map((scheduleItem, index)=>{
            if (index === position){
                return { ...scheduleItem, [field]:value};
            }
            return scheduleItem;
        })
        setScheduleItems(updatedSchedule);
    }

    return(
        <div id="page-teacher-form">
            <PageHeader 
            title="Que incrível que você quer dar aulas!" 
            description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend> Seus dados:</legend>
                        <Input 
                        name="name"
                        label="Nome Completo" 
                        value={name}
                        onChange={(e)=>{setName(e.target.value);}}/>   

                        <Input 
                        name="avatar"
                        label="Avatar"                    
                        value={avatar}
                        onChange={(e)=>{setAvatar(e.target.value);}}/> 

                        <Input 
                        name="whatsapp" 
                        label="Whatsapp"
                        value={whatsapp}
                        onChange={(e)=>{setWhatsapp(e.target.value);}}/> 

                        <Textarea 
                        name="bio" 
                        label="Biografia"
                        value={bio}
                        onChange={(e)=>{setBio(e.target.value);}}/> 
                    </fieldset>
                    <fieldset>
                        <legend> Sobre aula:</legend>
                        <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value);}}
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
                        <Input 
                        name="cost" 
                        label="Preço"
                        value={cost}
                        onChange={(e)=>{setCost(e.target.value);}}
                        />  
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}> + Novo Horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) =>{
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                name="week_day" 
                                label="Dia da semana"
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    {value:'1', label:'Segunda'},
                                    {value:'2', label:'Terça'},
                                    {value:'3', label:'Quarta'},
                                    {value:'4', label:'Quinta'},
                                    {value:'5', label:'Sexta'},
                                    {value:'6', label:'Sábado'}
                                ]}/>
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                   />
                                <Input
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                            </div>
                            );
                        })};
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningicon} alt="importante"/>
                            Importante! <br />
                            Preenche todos os dados :)
                        </p>
                        <button type="submit" >Salvar dados</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;