import React, { useState } from 'react';
import '../styles-components.css';
import GetCredentialsToAssign from './get-auth/get-auth-credentials';
import ChooseOptionToAssign from './choose-place/choose-assigment';
import DataListToUpdate from './option-display/update-list-data';
import CreateNewListWithData from './option-display/create-list';
import UpdateCurrentCards from './option-display/handle-current-cards';
export const ContextApi=React.createContext()
export default function OptionsAviableToTrello(){
    const [boardAuth,setBoardAuth]=useState(null)
    const [actionOpt,setActionOpt]=useState(null)
    const[credentials,setCredentials]=useState({
        apiKey:'',
        tokenUser:''
    })
    let tabValues;
    const handleSetActionOption=(value)=>{
        setActionOpt(value)
    }
    switch (actionOpt) {
        case 'update':
            tabValues=<DataListToUpdate/>
            break;
        case 'newList':
            tabValues=<CreateNewListWithData/>
            break;
        case 'checkCards':
            tabValues=<UpdateCurrentCards/>
            break;
        default:
            tabValues='Mostrar informacion actual'
            break;
    }
    return(
        <ContextApi.Provider value={{boardAuth,setBoardAuth,credentials,setCredentials}}>
        <section className='options_assign_container'>
           {boardAuth === null ? <article>
                <header className='assign-container_auth'>Ingresar credenciales de Trello</header>
                <GetCredentialsToAssign/>
            </article>
                :
            <article >
                <ChooseOptionToAssign 
                    setActionOpt={handleSetActionOption}
                    actionOpt={actionOpt}
                />
                <main className='current_actions_assign-container'>
                    {tabValues}
                </main>
            </article>
            }
        </section>
        </ContextApi.Provider>
    )
}