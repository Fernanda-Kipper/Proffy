import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg'
import logoIcon from '../../assets/images/logo.svg'
import './styles.css';

interface PageHeaderProps{
    title: string;
    description?: string;
}

const PageHeader: React.FunctionComponent< PageHeaderProps > = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="voltar"/>
                </Link>
                <img src={logoIcon} alt="logo"/>
            </div>

            <div className="header-content">
                <strong> {props.title} </strong>
                {props.description ? <p>{props.description}</p>: null }
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;