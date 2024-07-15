import React from 'react';

const TimestampMicroservice = () => {
  return (
    <div className="tw-class flex items-center justify-center flex-col h-screen w-screen">
      <h1 className="text-2xl font-bold">Timestamp Microservice</h1>
      <div>
        <h2 className="mt-8">Usage:</h2>
        
        <ul className="list-disc ml-8">
          <li>
            <code>{`GET https://finlaytech.ca/api/timestamp/{date}`}</code>
          </li>
          <li>
            <p><code>date</code> can be:</p>
            <ul className="list-disc ml-8">
              <li>
                The date in the form YYYY-MM-DD.
              </li>
              <li>
                The number of milliseconds.
              </li>
            </ul>
          </li>
        </ul>
        <h2 className="mt-8">Example Usage:</h2>
        <ul className="list-disc ml-8">
          <li>
            <a href="/api/timestamp/2015-12-25" className="text-blue-500 hover:text-blue-600 visited:text-purple-500">
              https://finlaytech.ca/api/timestamp/2015-12-25
            </a>
          </li>
          <li>
            <a href="/api/timestamp/1451001600000" className="text-blue-500 hover:text-blue-600 visited:text-purple-500">
              https://finlaytech.ca/api/timestamp/1451001600000
            </a>
          </li>
        </ul>

        <h2 className="mt-8">Example Output:</h2>
        <p>
          <code>{`{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`}</code>
        </p>
      </div>
    </div>
  )
}

export default TimestampMicroservice