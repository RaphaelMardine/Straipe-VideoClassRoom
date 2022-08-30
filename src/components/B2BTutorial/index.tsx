/* eslint-disable */
import React, { useContext, useRef } from "react";
import { DefaultUi, Player, Video, usePlayerContext } from "@vime/react";
import "./style.scss";
import closeIcon from "../icon/closeIcon.svg";
import searchIcon from "../icon/searchIcon.svg";
import { useEffect, useState, createContext } from "react";

export interface B2BTutorial {
  valueSearch?: Daum[];
  value?: any;
  search?: boolean;
  responseVideobyId?: any;
  responseCMSbyId?: any;
  setId?: any;
  setIdVideo?: any;
  data: Daum[];
  dataB?: any;
  meta?: Meta;
  isLoading?: any;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  description: string;
  video_duration: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  checkout_module: CheckoutModule;
  video: Video;
}

export interface CheckoutModule {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  title: string;
  description: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Video {
  data: Data2;
}

export interface Data2 {
  id: number;
  attributes: Attributes3;
}

export interface Attributes3 {
  name: string;
  alternativeText: string;
  caption: string;
  width: any;
  height: any;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const VideoContext = createContext(null);

const B2BLeftContent = ({ data, dataB }: B2BTutorial) => {
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState("");
  return (
    <section className="B2BLeftContent">
      <Switch />
      <Search setSearch={setSearch} value={value} setValue={setValue} />
      <ModuleAccordion
        data={data}
        dataB={dataB}
        search={search}
        value={value}
      />
    </section>
  );
};

const B2BRightContent = ({ dataB }: B2BTutorial) => {
  return (
    <section className="B2BRightContent">
      <ContentDescription responseVideobyId={dataB} />
      <div className="B2BPlayerContent">
        <PlayerVideo responseVideobyId={dataB} />
      </div>
    </section>
  );
};

const Switch = () => {
  //@ts-ignore
  const { setSwitchOn, switchOn } = useContext(VideoContext);
  return (
    <div className="B2BContainerSwitch">
      <label className="switch">
        <input type="checkbox" onChange={() => setSwitchOn(!switchOn)} />
        <span className="slider round"></span>
      </label>
      <div className="B2BContainerSpan">
        <span>Reprodução automática</span>
        <img
          src={closeIcon}
          alt="Close content"
          onClick={() => {
            alert("Sai daqui, não terminei essa feature!");
          }}
        />
      </div>
    </div>
  );
};

const Search = ({ setSearch, value, setValue }: any) => {
  return (
    <form action="" method="post" className="B2BSearchModule">
      <input
        type="text"
        id="busca"
        placeholder="Pesquise por palavra chave"
        value={value}
        onChange={(e) => {
          e.target.value != "" ? setSearch(true) : setSearch(false);
          setValue(e.target.value);
        }}
      />
      <img alt="Search Module" src={searchIcon}></img>
    </form>
  );
};

const AccordionListSearch = ({ valueSearch, isLoading }: any) => {
  //@ts-ignore
  const { setIdVideo, setId, id, idVideo } = useContext(VideoContext);
  const [accordionId, setAccordionId] = useState(1);
  const [selected, setSelected] = useState("ContainerSelected");
  return (
    <>
      {
        //@ts-ignore
        valueSearch?.data?.map((item: Daum) => {
          return (
            <li className={`B2BContentModule   ${selected}`}>
              <div className="B2BContainerContentReference">
                <li
                  className="B2BContentModuleName"
                  onClick={() => {
                    setAccordionId(item?.id);
                    setSelected("ContainerSelected");
                    setId(item?.id);
                  }}
                  key={item?.id}
                >
                  <p>Módulo</p>
                </li>
                <p className="B2BContentModuleTitle">
                  {item?.attributes?.checkout_module?.data?.attributes?.title}
                </p>
              </div>
              {/* {accordionId === item.id && ( */}
              <li
                className="B2BAccordionContent ContentSelected"
                key={item?.id}
              >
                {/* {valueSearch?.attributes?.video?.map((row: any) => { */}
                {/* return ( */}
                <li className="B2BAccordionContentSelected">
                  {" "}
                  {!isLoading ? (
                    <p
                      onClick={() => {
                        setIdVideo(item?.id);
                      }}
                    >
                      {item?.attributes?.title}
                    </p>
                  ) : (
                    ""
                  )}{" "}
                  {/* {!isLoading ? (
                      // <p>{row?.attributes?.video_duration}</p>
                      ) : (
                        "aaa"
                      )} */}
                </li>
                {/* ); */}
                {/* // })} */}
              </li>
              {/* )} */}
            </li>
          );
        })
      }
    </>
  );
};

const AccordionListDefault = ({ data, dataB }: B2BTutorial) => {
  //@ts-ignore
  const { setIdVideo, setId, isLoading, id, idVideo } =
    useContext(VideoContext);
  const [accordionId, setAccordionId] = useState(1);
  const [selected, setSelected] = useState("ContainerSelected");
  return (
    <>
      {
        //@ts-ignore
        data?.data?.map((item: Daum) => {
          return (
            <li
              className={`B2BContentModule   ${
                accordionId === item.id && selected
              }`}
            >
              <div className="B2BContainerContentReference">
                <li
                  className="B2BContentModuleName"
                  onClick={() => {
                    setAccordionId(item.id);
                    setSelected("ContainerSelected");
                    setId(item.id);
                  }}
                  key={item.id}
                >
                  <p>Módulo</p>
                </li>
                <p className="B2BContentModuleTitle">{item.attributes.title}</p>
              </div>
              {accordionId === item.id && (
                <li
                  className="B2BAccordionContent ContentSelected"
                  key={item.id}
                >
                  {dataB?.data?.attributes?.checkout_videos?.data?.map(
                    (row: any) => {
                      return (
                        <li className="B2BAccordionContentSelected">
                          {" "}
                          {!isLoading ? (
                            <p
                              onClick={() => {
                                setIdVideo(row?.id);
                              }}
                            >
                              {row?.attributes?.title}
                            </p>
                          ) : (
                            ""
                          )}{" "}
                          {!isLoading ? (
                            <p>{row.attributes.video_duration}</p>
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    }
                  )}
                </li>
              )}
            </li>
          );
        })
      }
    </>
  );
};

const ModuleAccordion = ({ data, dataB, search, value }: B2BTutorial) => {
  const [valueSearch, setValueSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 6a32403a7e2fffd6096b231742d29e755b21850f0d3e81d31d4683f8d5d982210f938f639d8a8a1905c97bf45ddb82241b91b71e1f0e9b58be488279aa0fc06788a2b30023e89f1f2cb846493a4e4b8e79e011f51debf546a6db929f7f42e2b1a9fd033388ce5ba0d63c521104c000b0cf01d757ec64ab9847d7524a2edd9dd4"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  useEffect(() => {
    if (value) {
      setIsLoading(true);
      fetch(
        `http://localhost:1337/api/checkout-videos?search=${value}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setValueSearch(data);
          setIsLoading(false);
        });
    }
  }, [value]);
  return (
    <ul className="B2BContainerContentModule">
      {search ? (
        <AccordionListSearch valueSearch={valueSearch} isLoading={isLoading} />
      ) : (
        <AccordionListDefault data={data} dataB={dataB} />
      )}
    </ul>
  );
};

const ContentDescription = ({ responseVideobyId }: any) => {
  return (
    <div className="B2BContentDescription">
      <div className="B2BContainerHeader">
        <h1>{responseVideobyId?.data?.attributes?.title}</h1>
        <img
          src={closeIcon}
          alt="Close content"
          onClick={() => {
            alert("Sai daqui, não terminei essa feature!");
          }}
        />
      </div>
      <p>{responseVideobyId?.data?.attributes?.description}</p>
    </div>
  );
};

const PlayerVideo = ({ responseVideobyId }: any) => {
  const [timeEnd, setTimeEnd] = useState(true);
  const player = useRef<HTMLVmPlayerElement>(null);
  //@ts-ignore
  const { responseCMSbyId, idVideo, setIdVideo, switchOn } =
    useContext(VideoContext);
  const [currentTime] = usePlayerContext(player, "currentTime", 0);
  const onPlaybackReady = () => {
    let arr: any[] = [];
    responseCMSbyId.data.attributes.checkout_videos.data.map(
      (idVideos: any) => {
        arr.push(idVideos.id);
      }
    );
    const idAtual = arr.findIndex(checkId);
    function checkId(arr: number) {
      return arr === idVideo;
    }
    currentTime === player?.current?.duration && setIdVideo(arr[idAtual + 1]);
  };

  useEffect(() => {
    //@ts-ignore
    currentTime === player?.current?.duration && switchOn
      ? onPlaybackReady()
      : setTimeEnd(false);
  }, [currentTime]);

  const urlVideo =
    responseVideobyId != undefined
      ? `${responseVideobyId?.data?.attributes?.video?.data?.attributes?.url}`
      : "";
  return (
    //@ts-ignore
    <Player
      loop={false}
      controls={false}
      autoplay
      ref={player}
      onVmPlaybackReady={onPlaybackReady}
      onVmPlaybackEnded={onPlaybackReady}
    >
      <Video
        poster={
          responseVideobyId?.data?.attributes?.video?.data?.attributes?.name
        }
      >
        <source
          data-src={
            responseVideobyId != undefined
              ? responseVideobyId?.data?.attributes?.video?.data?.attributes
                  ?.url
              : ""
          }
          type="video/mp4"
        />
      </Video>
      <DefaultUi />
    </Player>
  );
};
function useMediaQuery(query: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export const B2BTutorialClass = (query: any) => {
  const [responseCMS, setResponseCMS] = useState([]);
  const [id, setId] = useState(1);
  const [idVideo, setIdVideo] = useState(1);
  const [responseCMSbyId, setResponseCMSbyId] = useState([]);
  const [responseVideobyId, setResponseVideobyId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  let isPageWide = useMediaQuery("(max-width: 880px)");

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer 6a32403a7e2fffd6096b231742d29e755b21850f0d3e81d31d4683f8d5d982210f938f639d8a8a1905c97bf45ddb82241b91b71e1f0e9b58be488279aa0fc06788a2b30023e89f1f2cb846493a4e4b8e79e011f51debf546a6db929f7f42e2b1a9fd033388ce5ba0d63c521104c000b0cf01d757ec64ab9847d7524a2edd9dd4"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  useEffect(() => {
    fetch(
      "http://localhost:1337/api/checkout-modules?sort=[1]=index",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setResponseCMS(data));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:1337/api/checkout-modules/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setResponseCMSbyId(data);
        setIsLoading(false);
      });
  }, [id]);
  useEffect(() => {
    fetch(
      `http://localhost:1337/api/checkout-videos/${idVideo}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setResponseVideobyId(data));
  }, [idVideo]);
  return (
    <>
      <div className="B2BContainer">
        <div className="B2BContentContainer">
          <div className="Flex">
            {/*@ts-ignore */}
            <VideoContext.Provider
              //@ts-ignore
              value={{
                setSwitchOn,
                switchOn,
                setId,
                setIdVideo,
                isLoading,
                id,
                idVideo,
                responseCMSbyId,
              }}
            >
              <B2BRightContent data={responseCMS} dataB={responseVideobyId} />
              <B2BLeftContent data={responseCMS} dataB={responseCMSbyId} />
            </VideoContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
