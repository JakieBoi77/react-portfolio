import styled from "styled-components";

const StyledDiv = styled.div`
    #tribute-page {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font: 16px Arial;
        background-color: #e1e1e3;
    }

    h1 {
        text-align: center;
        font: 50px Fantasy;
        margin: 20px;
        padding: 20px;
    }

    h3 {
        text-align: center;
        margin: 15px;
    }

    .image {
        display: block;
        max-width: 100%;
        height: auto;
        margin: auto;
        border: 2px solid black;
    }

    #img-caption {
        text-align: center;
        font: italic 14px Arial;
    }

    .center-div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div.bottom {
        padding-top: 50px;
    }

    p {
        text-align: center;
        max-width: 600px;
        margin: 0;
    }
`;

export default function TechincalDocumentation() {
    return (
        <StyledDiv>
            <UnstyledTributePage />
        </StyledDiv>
    );
}

function UnstyledTributePage() {
    return (
        <div id="tribute-page">
            <main id="main">
                <h1>Obamium</h1>
                <figure id="img-div">
                    <img
                        className="image"
                        id="image"
                        src="https://i.kym-cdn.com/photos/images/original/001/548/016/cc1.gif"
                        alt="Obama Prism"
                    />
                    <figcaption id="img-caption">
                        Obama Prism - The Most Powerful Item in the World
                    </figcaption>
                </figure>
                <div className="tribute-info" id="tribute-info">
                    <h3>About</h3>
                    <div className="center-div">
                        <p id="p1">
                            Obamium, also known as Obama Pyramid and Obama
                            Prism, refers to a series of memes imagining various
                            chemical substances and geometric figures consisting
                            of and named after the former United States
                            President Barack Obama. Spawned by a GIF circulated
                            in ironic communities in August 2019, the meme saw
                            viral spread in the following months.
                        </p>
                    </div>
                    <h3>Origin</h3>
                    <div className="center-div">
                        <p id="p2">
                            The exact origin of the GIF is currently
                            unconfirmed. On July 31st, 2019, iFunny user Barack
                            posted a GIF of a spinning pyramid with its sides
                            covered with a stretched photograph of Barack Obama.
                            The post received over 150 smiles in four months.
                        </p>
                    </div>
                    <div className="center-div bottom">
                        <p>All content is from knowyourmeme.com.</p>
                        <p>
                            Click the{" "}
                            <a
                                id="tribute-link"
                                href="https://knowyourmeme.com/memes/obamium"
                                target="_blank"
                                rel="noreferrer"
                            >
                                link
                            </a>{" "}
                            to read more about Obamium.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
