import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing';
import TeacherList from './pages/teacher-list';
import TeacherForm from './pages/teacher-form';
import TeacherPerfomance from './pages/teacher-perfomance';
import TeacherPerformanceForm from './pages/teacher-performance-form';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/"  exact component={Landing}/>
            <Route path="/study" exact component={TeacherList}/>
            <Route path="/give-classes"  exact component={TeacherForm}/>
            <Route path="/evaluate"  exact component={TeacherPerformanceForm}/>
            <Route path="/study/:name"  exact component={TeacherPerfomance}/>
        </BrowserRouter>
    )
}

export default Routes;

