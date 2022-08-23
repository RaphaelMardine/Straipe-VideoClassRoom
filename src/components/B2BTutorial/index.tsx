/* eslint-disable */
import React from 'react'
import { DefaultUi, Player, Video } from "@vime/react"
import './style.scss'
import closeIcon from "../icon/closeIcon.svg"
import searchIcon from "../icon/searchIcon.svg"
import { useEffect, useLayoutEffect, useState } from "react"
import { json } from 'stream/consumers'

    export interface B2BTutorial {
        responseVideobyId?: any
        setId?: any
        setIdVideo?: any
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
      
const B2BLeftContent = ({ data, dataB, setId, setIdVideo }:B2BTutorial) => {
    return (         
        <section className="B2BLeftContent">
            <Switch />
            <Search />
            <ModuleAccordion data={data} dataB={dataB} setId={setId} setIdVideo={setIdVideo} />
        </section>
    )
}

const B2BRightContent = ({ data, responseVideobyId }:B2BTutorial) => {
    console.log(responseVideobyId, 'responseVideobyId')
    return  (           
        <section className="B2BRightContent">
            <ContentDescription responseVideobyId={responseVideobyId}/>
                <div className="B2BPlayerContent">
                    <PlayerVideo responseVideobyId={responseVideobyId}/>
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


const AccordionList = ({ data, setId, dataB, setIdVideo }:B2BTutorial) => {
    const [accordionId, setAccordionId] = useState(0)
    const [selected, setSelected] = useState('')
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
              {dataB?.data?.attributes?.checkout_videos?.data?.map((row:any)=> {
                return <p onClick={() => {setIdVideo(row?.id)}}>{row?.attributes?.title}</p>
              })}
           </li>
        }
    </li> 
    )})}
    </>
   )
}

const ModuleAccordion = ({ data, dataB, setId, setIdVideo }:B2BTutorial) => {
    return  (
    <ul className="B2BContainerContentModule">
        <AccordionList data={data} dataB={dataB} setId={setId} setIdVideo={setIdVideo} />
    </ul>
  )
}

const ContentDescription = ({responseVideobyId}:any) => {
    return  (
        <div className="B2BContentDescription">
            <h1>{responseVideobyId?.data?.attributes?.title}</h1>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
        </div>
    )
}

const PlayerVideo = ({responseVideobyId}:any) => {
    return(
    <Player controls={false}>
            <Video poster={responseVideobyId?.data?.attributes?.video?.data?.attributes?.name}>
                <source
                   data-src={responseVideobyId?.data?.attributes?.video?.data?.attributes?.url}
                   type="video/mp4"
                />
            </Video>
        <DefaultUi />
    </Player>
  )
}

export const B2BTutorialClass = () => {
  const [responseCMS, setResponseCMS] = useState([])
  const [id, setId] = useState(1)
  const [idVideo, setIdVideo] = useState(1)
  const [responseCMSbyId, setResponseCMSbyId] = useState([])
  const [responseVideobyId, setResponseVideobyId] = useState([])

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 6a32403a7e2fffd6096b231742d29e755b21850f0d3e81d31d4683f8d5d982210f938f639d8a8a1905c97bf45ddb82241b91b71e1f0e9b58be488279aa0fc06788a2b30023e89f1f2cb846493a4e4b8e79e011f51debf546a6db929f7f42e2b1a9fd033388ce5ba0d63c521104c000b0cf01d757ec64ab9847d7524a2edd9dd4");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };

    useEffect(() => {
        fetch("http://localhost:1337/api/checkout-modules?sort=[1]=index", requestOptions)
        .then(response => response.json())
        .then(data => setResponseCMS(data))
      },[])
      useEffect(() => {
        fetch(`http://localhost:1337/api/checkout-modules/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => setResponseCMSbyId(data))
      },[id])
      useEffect(() => {
        fetch(`http://localhost:1337/api/checkout-videos/${idVideo}`, requestOptions)
        .then(response => response.json())
        .then(data => setResponseVideobyId(data))
      },[idVideo])
      console.log(responseVideobyId, 'responseVideobyId')
    return (
         <>
            <div className="B2BContainer">
                <div className="B2BContentContainer">
                    <div className="Flex">
                        <B2BRightContent data={responseCMS} dataB={responseVideobyId} />
                        <B2BLeftContent data={responseCMS} dataB={responseCMSbyId} setId={setId} setIdVideo={setIdVideo} />
                    </div>
                </div>
            </div>
        </>
    )
}