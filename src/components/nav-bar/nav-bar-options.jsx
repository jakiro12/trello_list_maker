import '../styles-components.css'
import { useRef } from 'react'
export default function NavBarForOptions({setActionType, typeAction}){
    const activeModeRef=useRef(null)
    const handleModeBtn=()=>{
        const isActive = activeModeRef.current.classList.toggle('active_mode_btn');            
        // Actualiza las variables CSS globalmente
        document.documentElement.style.setProperty('--bg-navbar-color', isActive ? '#000000' : '#ffffff');
        document.documentElement.style.setProperty('--text-navbar-color', isActive ? '#ffffff' : '#121212');
        document.documentElement.style.setProperty('--bg-addproject-color', isActive ? '#282828' : '#F0F2F5');
        document.documentElement.style.setProperty('--bg-column-info-project', isActive ?  '#000000' : '#D9D9D9' );
    }
    return(
        <nav className="nav-bar_container">
            <div>
                <span>A-Task-T</span>
                <aside className='nav-bar_btn-mode_container'>
                    <span style={{fontSize:'20px'}}>&#9788;</span>
                    <div className='nav-bar_btn-mode_action'>
                        <button
                            ref={activeModeRef}
                            onClick={handleModeBtn}
                        ></button>
                    </div>
                    <span style={{fontSize:'20px'}}> &#9789;</span>
                </aside>
            </div>
            <div>
                { typeAction === null ? <aside className='nav-bar_section-landing'>
                    <p>Proyectos Actuales</p>
                    <button
                        onClick={()=>setActionType('add')}
                    >Nuevo Proyecto</button>
                </aside>:
                <aside className='nav-bar_section-add'>
                    <button
                            className='nav-bar_btn-back'
                            onClick={()=>setActionType(null)}
                    >&#10094;  Volver
                    </button>
                    <span style={{fontWeight:'bold'}}>{typeAction === 'add' ? 'Agregar nuevo proyecto' : 'Editar proyecto'}</span>
                </aside>
                }
                
            </div>
        </nav>
    )
}