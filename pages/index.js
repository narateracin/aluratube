import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


function HomePage() {
    //const mensagem = "Bem-vindo ao AluraTube!";
    const estiloDaHomePage = {display: "flex", flexDirection: "column", flex:1, /*backgroundColor: "red"*/};
    //console.log(config.playlists);
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        //<div style={estiloDaHomePage}>{mensagem}</div>
        <>
            <CSSReset/>
            <div style={estiloDaHomePage}>
                <Menu valorDoFiltro= {valorDoFiltro} setValorDoFiltro= {setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
            </div>
        </>
    )
  }
  
  export default HomePage

  /*function Menu() {
    return (
        <div>
            Menu
        </div>
    )
  }*/

  const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
  `;

  const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    height: 230px;
  `;
// background-image: url(${config.bg});

  function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                    {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
  }

  function Timeline({searchValue, ...props}) {
    //console.log("dentro do componente", props);
    const playlistNames = Object.keys(props.playlists);
    // Statement
    // O react prefere Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                //console.log(playlistName);
                //console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                        return(
                                            <a key={video.url} href={video.url}>
                                                <img src={video.thumb}/>
                                                <span>
                                                    {video.title}
                                                </span>
                                            </a>
                                        )
                                    })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
  }