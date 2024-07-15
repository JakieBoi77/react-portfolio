import React from 'react';

const UrlShortenerMicroservice = () => {
  return (
    <div className="tw-class flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-2xl font-bold">URL Shortener Microservice</h1>
      <section>
        <form action="api/shorturl" method="POST" className="flex justify-center items-center">
          <fieldset className="m-5">
            <label htmlFor="url_input" className="mr-4">URL:</label>
            <input
              id="url_input"
              type="text"
              name="url"
              placeholder="https://www.freecodecamp.org"
              className="px-4 py-2 w-72 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="submit"
              value="POST URL"
              className="block mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer mx-auto"
            />
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default UrlShortenerMicroservice