"use client"

import React, { useState } from 'react';

const UrlShortenerMicroservice = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const urlInput = (event.target as HTMLFormElement).url.value;

    try {
      const response = await fetch("/api/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput }),
      });

      if (!response.ok) {
        throw new Error("Network Error");
      }

      const result = await response.json();
      console.log("Short URL:", result.short_url);
      setShortUrl("/api/shorturl/" + result.short_url);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCopyUrl = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`https://finlaytech.ca${shortUrl}`)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying:", error);
          alert("Failed to copy URL to clipboard.");
        });
    }
  };

  return (
    <div className="tw-class flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-2xl font-bold">URL Shortener Microservice</h1>
      <section>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <fieldset className="m-5">
            <label htmlFor="url_input" className="mr-4">URL:</label>
            <input
              id="url_input"
              type="text"
              name="url"
              placeholder="https://www.finlaytech.ca"
              className="px-4 py-2 w-72 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="submit"
              value="POST URL"
              className="block mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer mx-auto"
            />
          </fieldset>
        </form>
        {shortUrl && (
          <div className="mt-4">
            <p className="font-bold">Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{`https://finlaytech.ca${shortUrl}`}</a>
            <button onClick={handleCopyUrl} className="ml-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">Copy URL</button>
          </div>
        )}
      </section>
    </div>
  )
}

export default UrlShortenerMicroservice