import styled from "styled-components";
import { FaBolt, FaGem, FaTruck, FaInfinity } from "react-icons/fa";

const StyledDiv = styled.div`
    #product-landing-page {
        background-color: #f7f7f7;
    }

    p {
        font-size: 16px;
    }

    main {
        position: relative;
        top: 70px;
    }

    main section,
    header {
        scroll-margin-top: 70px;
    }

    /*Hides Navigation Bar for Mobile*/

    @media screen and (max-width: 600px) {
        #nav-bar {
            display: none;
        }
    }

    /*Tablet Navigation Bar*/

    @media screen and (min-width: 600px) {
        #nav-bar a {
            width: 80px;
            font-size: 12px;
        }
    }

    /*Desktop Navigation Bar*/

    @media screen and (min-width: 768px) {
        #nav-bar a {
            width: 150px;
            font-size: 16px;
        }
    }

    /*Navigation Bar*/

    #header {
        display: flex;
        justify-content: space-between;
        height: 70px;
        width: 100%;
        background-color: #d5dedd;
        position: fixed;
        top: 0;
        margin: 0;
        z-index: 1;
    }

    .img-div {
        display: inline-flex;
        height: 100%;
    }

    #header-img {
        display: block;
        height: 70%;
        align-self: center;
        padding-left: 20px;
    }

    #nav-bar {
        min-width: 40%;
    }

    #nav-bar ul {
        display: flex;
        height: 100%;
        justify-content: space-around;
        align-items: center;
        list-style: none;
        padding-right: 10px;
    }

    #nav-bar a {
        display: flex;
        height: 50px;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        text-align: center;
        color: black;
        border-radius: 10px;
        font-family: Lato, sans-serif;
        font-weight: bold;
    }

    #nav-bar a:hover {
        background-color: #c3c9c9;
        cursor: pointer;
    }

    /*Features Section*/

    #features {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        padding-top: 40px;
    }

    .feature {
        display: flex;
        width: 80%;
        max-width: 800px;
        margin-bottom: 40px;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        width: 130px;
    }

    .description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    /*Video*/

    .video {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 270px;
    }

    .video iframe {
        max-width: 500px;
        min-width: 300px;
        aspect-ratio: 16/9;
        width: 50%;
    }

    /*Price Options*/

    #pricing {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 30px;
    }

    .option-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .option {
        min-width: 300px;
        width: 300px;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        border: 2px solid black;
    }

    .option h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 35px;
        background-color: #d5dedd;
    }

    .option img {
        margin: 15px;
        height: 170px;
        border: 2px solid black;
    }

    .option .price {
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
    }

    .option .info {
        padding-bottom: 5px;
    }

    .fa-infinity {
        font-size: 16px;
    }

    .option button {
        margin-bottom: 16px;
        padding: 8px 60px;
        cursor: pointer;
    }

    /*Email Form*/

    #form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 30px;
    }

    #form label {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        font-size: 18px;
    }

    #form input {
        margin-top: 10px;
    }

    #form input[type="submit"] {
        width: 60%;
        height: 30px;
        font-weight: bold;
        background-color: #d5dedd;
        border-radius: 5px;
    }

    #form input[type="submit"]:hover {
        background-color: #c3c9c9;
    }

    #form input[type="email"] {
        width: 250px;
        height: 30px;
        padding: 5px;
    }

    /*Footer*/

    footer {
        position: relative;
        top: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #d5dedd;
    }

    footer ul {
        padding-left: 20px;
        list-style: none;
    }

    footer a {
        text-decoration: none;
        font-size: 12px;
        color: black;
    }

    footer a:hover {
        font-weight: bold;
    }

    footer p {
        padding-right: 20px;
        font-family: Lato, sans-serif;
        font-size: small;
    }
`;

export default function ProductLandingPage() {
    return (
        <StyledDiv>
            <UnstyledProductLandingPage />
        </StyledDiv>
    );
}

function UnstyledProductLandingPage() {
    return (
        <div id="product-landing-page">
            <header id="header">
                <div className="img-div">
                    <img
                        id="header-img"
                        src="/project-pics/logo.png"
                        alt="Prism Logo"
                    />
                </div>
                <nav id="nav-bar">
                    <ul>
                        <li>
                            <a className="nav-link" href="#features">
                                Features
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#video-section">
                                Video
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#pricing">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a className="nav-link" href="#newsletter">
                                Newsletter
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <section id="features">
                    <div className="feature">
                        <div className="icon">
                            <FaBolt />
                        </div>
                        <div className="description">
                            <h2>Powerful</h2>
                            <p>
                                Prisms are the strongest and most powerful
                                materials in the world. They can used for just
                                about anything and should be treated with
                                respect.
                            </p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="icon">
                            <FaGem />
                        </div>
                        <div className="description">
                            <h2>Rare</h2>
                            <p>
                                Prisms are insanley rare. It took ten thousand
                                years to create the first prism. Even with
                                modern science, theses prisms still take
                                thousands of years to synthesize.
                            </p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="icon">
                            <FaTruck />
                        </div>
                        <div className="description">
                            <h2>Secure Shipping</h2>
                            <p>
                                Because of their power and rarity, all prism
                                shipments are made using an armoured truck
                                convoy.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="video-section">
                    <div className="video">
                        <iframe
                            title="Obama Prism Youtube Video"
                            id="video"
                            src="https://www.youtube.com/embed/GpZQmtEKkQ8"
                        ></iframe>
                    </div>
                </section>
                <section id="pricing">
                    <div className="option-group">
                        <div className="option">
                            <h3>Obama Prism</h3>
                            <img
                                src="https://i.kym-cdn.com/photos/images/original/001/548/016/cc1.gif"
                                alt="Obama Prism"
                            />
                            <p className="info">Classic Obama Prism.</p>
                            <p className="info">Has a nice and smooth spin.</p>
                            <p className="info">
                                The most powerful of the prisms.
                            </p>
                            <p className="price">
                                Price: <FaInfinity />
                            </p>
                            <button>Buy</button>
                        </div>
                        <div className="option">
                            <h3>Obama Sphere</h3>
                            <img
                                src="https://media.tenor.com/AkQpJDh4fqEAAAAC/barack-obama-sphere.gif"
                                alt="Trump Prism"
                            />
                            <p className="info">The ominous Obama Sphere.</p>
                            <p className="info">Has a choppy spin.</p>
                            <p className="info">Very powerful when rolling.</p>
                            <p className="price">
                                Price: <FaInfinity />
                            </p>
                            <button>Buy</button>
                        </div>
                    </div>
                    <div className="option-group">
                        <div className="option">
                            <h3>Obamahedron</h3>
                            <img
                                src="https://media.tenor.com/Uxeo34AJba0AAAAC/obama-obamium.gif"
                                alt="Obamahedron"
                            />
                            <p className="info">
                                The one and only Obama Icosahedron.
                            </p>
                            <p className="info">Has a decent spin.</p>
                            <p className="info">Looks like a crystal.</p>
                            <p className="price">
                                Price: <FaInfinity />
                            </p>
                            <button>Buy</button>
                        </div>
                        <div className="option">
                            <h3>Obama Tesseract</h3>
                            <img
                                src="https://i.kym-cdn.com/photos/images/original/001/606/405/fa6.gif"
                                alt="Obama Tesseract"
                            />
                            <p className="info">
                                The impossible Obama Tesseract.
                            </p>
                            <p className="info">Spins in 4D space.</p>
                            <p className="info">
                                Controls the fouth dimension.
                            </p>
                            <p className="price">
                                Price: <FaInfinity />
                            </p>
                            <button>Buy</button>
                        </div>
                    </div>
                </section>
                <section id="newsletter">
                    <form
                        id="form"
                        action="https://www.freecodecamp.com/email-submit"
                    >
                        <label htmlFor="email">
                            Sign up to recieve updates from us
                            <input
                                id="email"
                                placeholder="Enter your email address..."
                                type="email"
                                name="email"
                            />
                            <input id="submit" type="submit" value="Sign Up" />
                        </label>
                    </form>
                </section>
            </main>
            <footer>
                <ul className="sources">
                    <li>
                        <a href="https://looka.com/">Logo Source</a>
                    </li>
                    <li>
                        <a href="https://fontawesome.com/">Icon Source</a>
                    </li>
                </ul>
                <p>Copyright 2023, Prism Ltd.</p>
            </footer>
        </div>
    );
}
