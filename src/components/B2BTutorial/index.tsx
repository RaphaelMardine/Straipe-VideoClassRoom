/* eslint-disable */
import React, { useContext, useRef } from "react";
import { DefaultUi, Player, Video, usePlayerContext } from "@vime/react";
import "./style.scss";
import { useEffect, useState, createContext } from "react";
import { B2BTutorial, Daum } from "./types";

const VideoContext = createContext<B2BTutorial>({} as B2BTutorial);

const B2BLeftContent = () => {
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState("");
  return (
    <section className="B2BLeftContent">
      <Switch />
      <Search setSearch={setSearch} value={value} setValue={setValue} />
      <ModuleAccordion search={search} value={value} />
    </section>
  );
};

const B2BRightContent = ({ responseVideobyId }: B2BTutorial) => {
  return (
    <section className="B2BRightContent">
      <ContentDescription responseVideobyId={responseVideobyId} />
      <div className="B2BPlayerContent">
        <PlayerVideo responseVideobyId={responseVideobyId} />
      </div>
    </section>
  );
};

const Switch = () => {
  const { setSwitchOn, switchOn, setOpen } = useContext(VideoContext);
  return (
    <div className="B2BContainerSwitch">
      <label className="switch">
        <input type="checkbox" onChange={() => setSwitchOn(!switchOn)} />
        <span className="slider round"></span>
      </label>
      <div className="B2BContainerSpan">
        <span>Reprodução automática</span>
        <img
          src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
          alt="Close content"
          onClick={() => {
            setOpen(false);
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
      <img
        alt="Search Module"
        src="https://img.icons8.com/ios-glyphs/30/1A1A1A/search--v1.png"
      />
    </form>
  );
};

const AccordionListSearch = ({ valueSearch, isLoading }: any) => {
  const { setIdVideo, setId } = useContext(VideoContext);
  const [accordionId, setAccordionId] = useState(1);
  const [selected, setSelected] = useState("ContainerSelected");
  return (
    <>
      {valueSearch?.data?.map((item: Daum) => {
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
            <li className="B2BAccordionContent ContentSelected" key={item?.id}>
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
      })}
    </>
  );
};

const AccordionListDefault = () => {
  const { setIdVideo, setId, isLoading, responseCMSbyId, responseCMS } =
    useContext(VideoContext);
  const [accordionId, setAccordionId] = useState(1);
  const [selected, setSelected] = useState("ContainerSelected");
  return (
    <>
      {responseCMS?.data?.map((item: Daum) => {
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
              <li className="B2BAccordionContent ContentSelected" key={item.id}>
                {responseCMSbyId?.data?.attributes?.checkout_videos?.data?.map(
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
      })}
    </>
  );
};

const ModuleAccordion = ({ search, value }: B2BTutorial) => {
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
        <AccordionListDefault />
      )}
    </ul>
  );
};

const ContentDescription = ({ responseVideobyId }: any) => {
  const { setOpen } = useContext(VideoContext);
  return (
    <div className="B2BContentDescription">
      <div className="B2BContainerHeader">
        <h1>{responseVideobyId?.data?.attributes?.title}</h1>
        <img
          src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
          alt="Close content"
          onClick={() => {
            setOpen(false);
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
    currentTime === player?.current?.duration && switchOn
      ? onPlaybackReady()
      : setTimeEnd(false);
  }, [currentTime]);

  const urlVideo =
    responseVideobyId != undefined
      ? `${responseVideobyId?.data?.attributes?.video?.data?.attributes?.url}`
      : "";
  return (
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

export const B2BTutorialClass = ({ setOpen, module }: B2BTutorial) => {
  module = "checkout-modules";
  const [responseCMS, setResponseCMS] = useState([]);
  const [id, setId] = useState(1);
  const [idVideo, setIdVideo] = useState(1);
  const [responseCMSbyId, setResponseCMSbyId] = useState([]);
  const [responseVideobyId, setResponseVideobyId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);

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
    fetch(`http://localhost:1337/api/${module}?sort=[1]=index`, requestOptions)
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
            <VideoContext.Provider
              value={{
                module,
                setOpen,
                setSwitchOn,
                switchOn,
                setId,
                setIdVideo,
                isLoading,
                id,
                idVideo,
                responseCMSbyId,
                responseCMS,
              }}
            >
              <B2BRightContent responseVideobyId={responseVideobyId} />
              <B2BLeftContent />
            </VideoContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
