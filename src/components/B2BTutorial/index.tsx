import { DefaultUi, Player, Video } from "@vime/react"
import './style.scss'
import closeIcon from "../icon/closeIcon.svg"
import searchIcon from "../icon/searchIcon.svg"
import { useEffect, useLayoutEffect, useState } from "react"

    export interface B2BTutorial {
        setId?: any
        data: Daum[]
        dataB?: any
        meta?: Meta
      }
      
      export interface Daum {
        id: number
        attributes: Attributes
      }
      
      export interface Attributes {
        title: string
        description: string
        video_duration: string
        index: number
        createdAt: string
        updatedAt: string
        publishedAt: string
        checkout_module: CheckoutModule
        video: Video
      }
      
      export interface CheckoutModule {
        data: Data
      }
      
      export interface Data {
        id: number
        attributes: Attributes2
      }
      
      export interface Attributes2 {
        title: string
        description: string
        index: number
        createdAt: string
        updatedAt: string
        publishedAt: string
      }
      
      export interface Video {
        data: Data2
      }
      
      export interface Data2 {
        id: number
        attributes: Attributes3
      }
      
      export interface Attributes3 {
        name: string
        alternativeText: string
        caption: string
        width: any
        height: any
        formats: any
        hash: string
        ext: string
        mime: string
        size: number
        url: string
        previewUrl: any
        provider: string
        provider_metadata: any
        createdAt: string
        updatedAt: string
      }
      
      export interface Meta {
        pagination: Pagination
      }
      
      export interface Pagination {
        page: number
        pageSize: number
        pageCount: number
        total: number
      }
      
const B2BLeftContent = ({ data, dataB, setId }:B2BTutorial) => {
    return (         
        <section className="B2BLeftContent">
            <Switch />
            <Search />
            <ModuleAccordion data={data} dataB={dataB} setId={setId} />
        </section>
    )
}

const B2BRightContent = ({ data, dataB }:B2BTutorial) => {
    
    return  (           
        <section className="B2BRightContent">
            <ContentDescription dataB={dataB}/>
                <div className="B2BPlayerContent">
                    <PlayerVideo dataB={dataB}/>
                </div>
        </section>
    ) 
}

const Switch = () => {
    return (
        <div className="B2BContainerSwitch">
            <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
            </label>
            <div className="B2BContainerSpan">
            <span>Reprodução automática</span>
            </div>
            <img src={closeIcon} alt="Close content" onClick={() => {alert("Sai daqui, não terminei essa feature!")}} />
        </div>
    )
}

const Search = () => {
    return ( 
        <form action="" method="post" className="B2BSearchModule">
            <input type="text" id="busca" placeholder="Pesquise por palavra chave" onChange={(e) => console.log(e.target.value)}/>
            <img alt="Search Module" src={searchIcon}></img>
        </form>
    )
}


const AccordionList = ({ data, setId, dataB }:B2BTutorial) => {
    const [accordionId, setAccordionId] = useState(0)
    const [selected, setSelected] = useState('')
console.log(dataB)
    return (
    <>
    {//@ts-ignore
    data?.data?.map((item:Daum) => {
        return (
    <li className={`B2BContentModule  ${accordionId === item.id && selected}`}>
        <li className="B2BContentModuleName" onClick={() => {setAccordionId(item.id); setSelected('ContainerSelected'); setId(item.id)}} key={item.id}>
            <p>Módulo</p> <p>{'3:24'}</p>
        </li>
        <p className="B2BContentModuleTitle">{item.attributes.title}</p>
        {accordionId === item.id && 
        <li className="B2BAccordionContent ContentSelected" key={item.id}>
            {dataB.data.attributes.title}
        </li>}
    </li> 
    )})}
    </>
   )
}

const ModuleAccordion = ({ data, dataB, setId }:B2BTutorial) => {
    return  (
    <ul className="B2BContainerContentModule">
        <AccordionList data={data} dataB={dataB} setId={setId} />
    </ul>
  )
}

const Header = () => {
    return <div className="HeaderFakeExcluir"></div>
}

const ContentDescription = ({dataB}:any) => {
    return  (
        <div className="B2BContentDescription">
            <h1>{dataB?.data?.attributes?.title}</h1>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
        </div>
    )
}

const PlayerVideo = ({dataB}:any) => {
    return(
    <Player controls={false}>
            <Video poster={dataB?.data?.attributes?.video?.data?.attributes?.name}>
                <source
                   data-src={dataB?.data?.attributes?.video?.data?.attributes?.url}
                   type="video/mp4"
                />
            </Video>
        <DefaultUi />
    </Player>
  )
}

export const B2BTutorialClass = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 6a32403a7e2fffd6096b231742d29e755b21850f0d3e81d31d4683f8d5d982210f938f639d8a8a1905c97bf45ddb82241b91b71e1f0e9b58be488279aa0fc06788a2b30023e89f1f2cb846493a4e4b8e79e011f51debf546a6db929f7f42e2b1a9fd033388ce5ba0d63c521104c000b0cf01d757ec64ab9847d7524a2edd9dd4");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
    const [responseCMS, setResponseCMS] = useState([])
    useEffect(() => {
        fetch("http://localhost:1337/api/checkout-modules?sort=[1]=index", requestOptions)
        .then(response => response.json())
        .then(data => setResponseCMS(data))
      },[])
    const [id, setId] = useState(1)
    const [responseCMSbyId, setResponseCMSbyId] = useState([])
      useLayoutEffect(() => {
        fetch(`http://localhost:1337/api/checkout-videos/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => setResponseCMSbyId(data))
      },[id])
      
      console.log(responseCMS, 'batatao22 data A')
      console.log(responseCMSbyId, 'batatao22 data B')
    return (
         <>
            <div className="B2BContainer">
                <div className="B2BContentContainer">
                    <div className="Flex">
                        <B2BRightContent data={responseCMS} dataB={responseCMSbyId} />
                        <B2BLeftContent data={responseCMS} dataB={responseCMSbyId} setId={setId}/>
                    </div>
                </div>
            </div>
        </>
    )
}