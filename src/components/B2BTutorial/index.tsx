import { DefaultUi, Player, Video } from "@vime/react"
import './style.scss'

export interface B2BTutorial {
    x: string
}

const Header = () => {
    return <div className="HeaderFakeExcluir"></div>
}

const PlayerVideo = () => {
    return(
    <Player controls={false}>
               <Video crossOrigin="" poster="https://media.vimejs.com/poster.png">
                 <source
                   data-src="https://media.vimejs.com/720p.mp4"
                   type="video/mp4"
                   />
               </Video>
               <DefaultUi />
             </Player>
             )
}

export const B2BTutorialClass = () => {
    return (
         <>
            <Header /> 
            <div className="B2BContainer">
            <div className="B2BContentContainer">
            <section className="B2BRightContent">
                
            </section>
            <div className="B2BContentDescription">
            <h1>Título do vídeo </h1>
            <div className="B2BContainerModule">
            <p>Descrição do vídeo... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
            <form action="" method="post" className="B2BSearchModule">
            <input type="search" id="busca" name="q" placeholder="Pesquise por palavra chave" />
            <button type="submit">lupa</button>
            </form>
            </div>
            </div>
            <div className="Flex">
                <div className="B2BPlayerContent">
            <PlayerVideo />
                </div>
            <ul className="B2BContainerContentModule">
            <div className="B2BContainerSwitch">
            <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
            </label>
            <span>Repodução automática</span>
            </div>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo <p>1h30</p></p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
                <li className="B2BContentModule">
                    <p className="B2BContentModuleName">Módulo</p>
                    <p className="B2BContentModuleTitle">Nome do Módulo</p>
                </li>
            </ul>
            </div>
            </div>
            </div>
                   </>
                   )
}