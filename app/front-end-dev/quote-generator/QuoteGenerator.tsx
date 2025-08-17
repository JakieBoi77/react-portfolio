import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";

import { regular, fortnite } from "@/public/quotes";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FaTwitterSquare, FaTumblrSquare } from "react-icons/fa";

const StyledDiv = styled.div`
    #quote-generator {
        font-family: sans-serif;
        font-size: 30px;
        scroll-behavior: smooth;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: background-color 0.5s ease;
    }

    #quote-box {
        width: 550px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
        backgroundcolor: white;
        opacity: 1;
        transition: opacity 0.5s ease;
    }

    #quotation1 {
        margin-right: 10px;
    }

    #quotation2 {
        margin-left: 10px;
    }

    #quote-text {
        margin-top: 20px;
        max-width: 70%;
        text-align: center;
    }

    #quote {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    #author {
        width: 70%;
        text-align: right;
        margin-top: 10px;
        margin-bottom: 25px;
        font-size: 20px;
    }

    #links {
        height: 50px;
        display: flex;
        width: 70%;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    #share-links {
        font-size: 40px;
        display: flex;
    }

    .icon {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        margin: 5px;
    }

    .icon:hover {
        transform: scale(1.6);
    }

    .tweet-quote,
    .tumblr-quote {
        text-decoration: none;
    }

    a.tweet-quote :hover {
        color: #1da1f2;
    }

    a.tumblr-quote :hover {
        color: #36465d;
    }

    .button {
        height: 40px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        color: white;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            color 0.5s ease;
        font-size: 15px;
        font-weight: 600;
        border: none;
    }

    .buttton:hover {
        transform: scale(1.1);
    }

    a:hover,
    button:hover {
        cursor: pointer;
    }

    #fortnite {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: white;
        font-size: 15px;
        font-weight: 600;
        border: none;
        height: 40px;
        width: 150px;
        position: relative;
        top: 100px;
    }
`;

export default function QuoteGenerator() {
    return (
        <StyledDiv>
            <UnstyledQuoteGenerator />
        </StyledDiv>
    );
}

const UnstyledQuoteGenerator = () => {
    const fortniteQuotes = fortnite.quotes;
    const regularQuotes = regular.quotes;

    const [currentColor, setCurrentColor] = useState("#2f333b");
    const [currentQuote, setCurrentQuote] = useState("");
    const [currentAuthor, setCurrentAuthor] = useState("");
    const [quoteType, setQuoteType] = useState("regular");

    const displayNewQuote = useCallback(() => {
        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857",
        ];
        let randomColor = Math.floor(Math.random() * colors.length);
        setCurrentColor(colors[randomColor]);
        let quotesArray;
        if (quoteType === "regular") {
            quotesArray = regularQuotes;
        } else {
            quotesArray = fortniteQuotes;
        }
        let randomQuote = Math.floor(Math.random() * quotesArray.length);
        let quoteObject = quotesArray[randomQuote];
        setCurrentQuote(quoteObject.quote);
        setCurrentAuthor(quoteObject.author);
    }, [regularQuotes, fortniteQuotes, quoteType]);

    useEffect(() => {
        displayNewQuote();
    }, [displayNewQuote]);

    const toggleQuoteType = () => {
        if (quoteType === "regular") {
            setQuoteType("fortnite");
        } else if (quoteType === "fortnite") {
            setQuoteType("regular");
        }
        displayNewQuote();
    };

    return (
        <div id="quote-generator" style={{ backgroundColor: currentColor }}>
            <div id="quote-box">
                <div id="quote-text">
                    <span id="quotation1">
                        <FaQuoteLeft color={currentColor} />
                    </span>
                    <span id="text" style={{ color: currentColor }}>
                        {currentQuote}
                    </span>
                    <span id="quotation2">
                        <FaQuoteRight color={currentColor} />
                    </span>
                </div>
                <span id="author" style={{ color: currentColor }}>
                    {currentAuthor}
                </span>
                <div id="links">
                    <div id="share-links">
                        <a
                            className="icon tweet-quote"
                            title="Tweet this quote!"
                            target="_top"
                            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${currentQuote}" ${currentAuthor}`)}`}
                        >
                            <FaTwitterSquare style={{ color: currentColor }} />
                        </a>
                        <a
                            className="icon tumblr-quote"
                            title="Post this quote on tumblr!"
                            target="_top"
                            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(currentAuthor)}&content=${encodeURIComponent(currentQuote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                        >
                            <FaTumblrSquare style={{ color: currentColor }} />
                        </a>
                    </div>
                    <button
                        id="new-quote"
                        className="button"
                        style={{ backgroundColor: currentColor }}
                        onClick={displayNewQuote}
                    >
                        New Quote
                    </button>
                </div>
            </div>
            <button
                id="fortnite"
                style={{ color: currentColor }}
                onClick={toggleQuoteType}
            >{`${quoteType === "regular" ? "Fortnite Mode" : "Back to Normal"}`}</button>
        </div>
    );
};
