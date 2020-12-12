import React, { useState, FormEvent }  from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css'

import PageHeader from '../../components/page-header';
import Textarea from '../../components/textarea';
import Input from '../../components/input';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';


function TeacherPerfomanceForm(){
    const history = useHistory();
    const [name, setName] = useState("");
    const [performance, setPerformance] = useState("");

    function handleCreateEvaluate(e: FormEvent){
        e.preventDefault();

        api.post('/performances', {
            teacher_performance: performance,
            teacher_name:name
        }).then(()=>{
            alert('Cadastro realizado com sucesso :)')
            history.push("/");
        }).catch((err)=>{
            alert('Erro no cadastro!')
            console.log(err);
        })}

    return(
        <div className="page-teacher-performance-form">
            <PageHeader 
            title="Que bom que você vai avaliar um Proffy" 
            description="Lembre-se! Não use termos ofensivos e seja honesto sobre sua experiência"/>
            <main>
                <form onSubmit={handleCreateEvaluate}>
                    <fieldset>
                    <legend> Os dados:</legend>
                        <Input 
                        name="nome" 
                        label="Nome completo do Proffy: " 
                        value={name}
                        onChange={(e)=>{setName(e.target.value);}}></Input>
                        <Textarea 
                        name="avaliacao" 
                        label="Conte sua experiência com esse profissional: "
                        value={performance}
                        onChange={(e)=>{setPerformance(e.target.value);}}></Textarea>
                        </fieldset>
                    <footer>
                            <p>
                                <img src={warningIcon} alt="importante"/>
                                Importante! <br />
                                Preenche todos os dados :)
                            </p>
                            <button type="submit" >Enviar </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherPerfomanceForm;