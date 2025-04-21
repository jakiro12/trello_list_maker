import AlertForProjectAdd from '../modal-actions/successful-adding';
import '../styles-components.css'
import { regexPatterns } from '../../utils/regex-form';
import { useState, useEffect } from 'react';
export default function AddNewProject({newProjectData,setCurrentProjectData,onFormSubmit}){
    const [alertAction,setAlertAction]=useState(false)
    const [messageAlert, setMessageAlert]=useState('')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProjectData({...newProjectData,[name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(regexPatterns.checkProjectName.test(newProjectData.projectName) === false){
            setMessageAlert('El nombre debe contener entre 5 y 15 letras')
            setAlertAction(true)
            return
        }
        if(regexPatterns.checkDescription.test(newProjectData.description) === false){
            setMessageAlert('La descripcion debe contener entre 5 y 30 caracteres')
            setAlertAction(true)
            return
        }
        onFormSubmit(newProjectData)
        setCurrentProjectData({
            projectName: '',
            description: '',
            projectManager: '',
            assignedTo: '',
            status: ''
        });
        setAlertAction(true)
    };
     useEffect(()=>{
        setTimeout(() => {
            setAlertAction(false)
            setMessageAlert('')
        },4000);
        return () => clearTimeout()
    },[alertAction,messageAlert])
    return(
        <section className='add-project_container'>
            {alertAction === false ? null : <AlertForProjectAdd actionMessage={messageAlert}/>}
        <form onSubmit={handleSubmit}>
            <div className='add-project_form_sections'>
                <label htmlFor="projectName">Nombre del proyecto</label>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={newProjectData.projectName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="description">Descripcion</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={newProjectData.description}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="projectManager">Project Manager</label>
                <select
                    id="projectManager"
                    name="projectManager"
                    value={newProjectData.projectManager}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Seleccionar Manager</option>
                    <option value="manager1">Manager 1</option>
                    <option value="manager2">Manager 2</option>
                </select>
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="assignedTo">Asignar sector</label>
                <select
                    id="assignedTo"
                    name="assignedTo"
                    value={newProjectData.assignedTo}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Seleccionar sector</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Devops">Devops</option>
                </select>
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="status">Estado</label>
                <select
                    id="status"
                    name="status"
                    value={newProjectData.status}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Seleccionar</option>
                    <option value="enabled" >Habilitar</option>
                    <option value="disabled">Deshabilitar</option>
                </select>
            </div>
            <div className='add-project_form_sections_submit'>
                <button type="submit">Crear proyecto</button>
            </div>
        </form>
    </section>
    )
}