import styled from "styled-components";
import { FaAt, FaFile, FaLinkedin, FaFreeCodeCamp } from "react-icons/fa";
import Link from "next/link";

const darkGray = "#292e2e";
const blueGreen = "#085680";

const StyledDiv = styled.div`
    #portfolio {
        background-color: ${darkGray};
        color: white;
        font-family: sans-serif;
    }

    /*Phone*/

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 70px;
        }

        h2 {
            font-size: 60px;
        }

        #connect a {
            font-size: 20px;
        }

        .project-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            padding: 0 50px 50px 50px;
        }
    }

    /*Not Phone*/

    @media screen and (min-width: 600px) {
        h1 {
            font-size: 90px;
        }

        h2 {
            font-size: 80px;
        }

        #connect a {
            font-size: 28px;
        }

        .project-grid {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            padding: 0 90px 50px 90px;
        }
    }

    /*Navbar*/

    #navbar {
        height: 60px;
        width: 100%;
        top: 0;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: linear-gradient(#00b0ff, #00e0ff);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 1;
    }

    main section,
    footer {
        scroll-margin-top: 60px;
    }

    #navbar ul {
        list-style: none;
        display: flex;
        padding-right: 20px;
    }

    #navbar a {
        text-decoration: none;
        padding: 15px;
        margin: 0 2px;
        border-radius: 10px;
        font-weight: bold;
        color: white;
        transition:
            background-color 0.3s ease,
            box-shadow 0.3s ease;
    }

    #navbar a:hover {
        background-color: #00c5ff;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }

    /*Welcome Section*/

    #welcome-section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(300deg, ${darkGray} 15%, #446a6e);
    }

    #welcome-section h1 {
        font-weight: 600;
        text-align: center;
        text-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        padding: 0 20px;
    }

    /*Project Headings*/

    #projects {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: ${blueGreen};
    }

    #projects h2 {
        font-weight: 700;
        padding: 20px 0;
        font-size: 60px;
        text-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    }

    #projects h3 {
        font-weight: 700;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 30px;
        text-align: center;
        margin: 20px;
    }

    #projects h3 img {
        display: block;
        height: 40px;
        width: auto;
        padding-left: 5px;
    }

    #projects img {
        width: 100%;
        border-radius: 15px 15px 0 0;
    }

    /*Project Tiles*/

    .project-grid {
        display: grid;
        grid-gap: 50px;
        width: 100%;
        max-width: 1280px;
    }

    #projects a {
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 17px;
        border-radius: 15px;
        background-color: #292e2e;
        border: 4px solid black;
    }

    #projects p {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
    }

    .project-tile code {
        font-size: 15px;
        font-weight: bold;
        padding-bottom: 3px;
        padding-left: 5px;
        padding-right: 5px;
        color: #292e2e;
        transition: color 0.3s ease-out;
    }

    .project-tile:hover code {
        color: red;
    }

    .project-tile {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .project-tile:hover {
        transform: scale(1.05);
        box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
    }

    /*Contact Section*/

    #connect {
        height: calc(100vh - 120px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #connect h2 {
        font-weight: 700;
        margin-top: -100px;
        text-shadow: 0 15px 20px rgba(0, 0, 0, 0.5);
        text-align: center;
    }

    #connect p {
        margin-bottom: 40px;
    }

    #connect ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    #connect li {
        padding: 20px;
    }

    .icon {
        padding-right: 8px;
    }

    #connect a {
        display: flex;
        flex-wrap: nowrap;
        color: white;
        text-decoration: none;
        text-shadow: 0 15px 20px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease;
    }

    #connect a:hover {
        transform: scale(1.1);
    }

    /*Footer*/

    footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 60px;
        background-color: ${blueGreen};
    }

    footer p {
        padding-right: 20px;
        font-size: 12px;
    }
`;

export default function StyledPortfolio() {
    return (
        <StyledDiv>
            <UnstyledPortfolio />
        </StyledDiv>
    );
}

function UnstyledPortfolio() {
    return (
        <div id="portfolio">
            <nav id="navbar">
                <ul>
                    <li>
                        <a href="#welcome-section">Welcome</a>
                    </li>
                    <li>
                        <a href="#projects">Projects</a>
                    </li>
                    <li>
                        <a href="#connect">Connect</a>
                    </li>
                </ul>
            </nav>
            <main>
                <section id="welcome-section">
                    <h1>Hello, I&apos;m Jake.</h1>
                    <p>Welcome to my portfolio.</p>
                </section>
                <section id="projects">
                    <h2>Projects</h2>
                    <h3 id="front-end-dev-title">
                        Front End Development
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                            alt="(React Logo)"
                        />
                        <img
                            src="https://www.freepnglogos.com/uploads/javascript/javascript-online-logo-for-website-0.png"
                            alt="(JS Logo)"
                        />
                    </h3>
                    <div className="project-grid">
                        <Link
                            className="project-tile"
                            href="/front-end-dev/quote-generator"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/quote-generator.png"
                                alt="Survey Form"
                            />
                            <p>
                                <code>&lt;</code>Quote Generator
                                <code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/front-end-dev/markdown-previewer"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/markdown-previewer.png"
                                alt="Markdown Previewer"
                            />
                            <p>
                                <code>&lt;</code>Markdown Previewer
                                <code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/front-end-dev/meme-soundboard"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/meme-soundboard.png"
                                alt="Meme Soundboard"
                            />
                            <p>
                                <code>&lt;</code>Meme Soundboard
                                <code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/front-end-dev/calculator"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/calculator.png"
                                alt="Calculator"
                            />
                            <p>
                                <code>&lt;</code>Calculator<code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/front-end-dev/pomodoro-clock"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/pomodoro-clock.png"
                                alt="Pomodoro Clock"
                            />
                            <p>
                                <code>&lt;</code>Pomodoro Clock
                                <code>/&gt;</code>
                            </p>
                        </Link>
                    </div>
                </section>
                <section id="projects">
                    <h3>
                        Responsive Web Design
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/640px-HTML5_Badge.svg.png"
                            alt="(HTML Logo)"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png"
                            alt="(CSS Logo)"
                        />
                    </h3>
                    <div className="project-grid">
                        <Link
                            className="project-tile"
                            href="/legacy-web-design/survey-form"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/survey-form.png"
                                alt="Survey Form"
                            />
                            <p>
                                <code>&lt;</code>Survey Form<code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/legacy-web-design/tribute-page"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/tribute-page.png"
                                alt="Tribute Page"
                            />
                            <p>
                                <code>&lt;</code>Tribute Page<code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/legacy-web-design/technical-documentation"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/technical-documentation.png"
                                alt="Technical Documentation"
                            />
                            <p>
                                <code>&lt;</code>Technical Documentation
                                <code>/&gt;</code>
                            </p>
                        </Link>
                        <Link
                            className="project-tile"
                            href="/legacy-web-design/product-landing-page"
                        >
                            <img
                                className="project-image"
                                src="/project-pics/product-landing-page.png"
                                alt="product-landing-page"
                            />
                            <p>
                                <code>&lt;</code>Product Landing Page
                                <code>/&gt;</code>
                            </p>
                        </Link>
                    </div>
                </section>
                <section id="connect">
                    <h2>Let&apos;s Connect!</h2>
                    <p>Here are my links...</p>
                    <ul>
                        <li>
                            <a
                                id="profile-link"
                                target="_blank"
                                rel="noreferrer"
                                href="mailto:jakef7@icloud.com"
                            >
                                <div className="icon">
                                    <FaAt />
                                </div>
                                Email
                            </a>
                        </li>
                        <li>
                            <a
                                id="profile-link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/in/jake-finlay-54145a253/"
                            >
                                <div className="icon">
                                    <FaLinkedin />
                                </div>
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                id="profile-link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.freecodecamp.org/JakieBoi77"
                            >
                                <div className="icon">
                                    <FaFreeCodeCamp />
                                </div>
                                freeCodeCamp
                            </a>
                        </li>
                        <li>
                            <a
                                id="profile-link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://finlaytech.ca/pdfs/Resume.pdf"
                            >
                                <div className="icon">
                                    <FaFile />
                                </div>
                                Resume
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; Jake Finlay, 2024</p>
            </footer>
        </div>
    );
}
