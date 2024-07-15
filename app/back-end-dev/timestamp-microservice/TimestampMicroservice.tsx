import React from 'react';

const TimestampMicroservice = () => {
  return (
    <div className="tw-class flex items-center justify-center flex-col h-screen w-screen">
      <h1>Timestamp Microservice</h1>
      <div>
        <h2>Example Usage:</h2>
        <ul>
          <li><a href="/api/timestamp-microservice/2015-12-25">[project url]/api/2015-12-25</a></li>
          <li><a href="/api/timestamp-microservice/1451001600000">[project url]/api/1451001600000</a></li>
        </ul>

        <h2>Example Output:</h2>
        <p>
          <code>{`{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`}</code>
        </p>
      </div>
    </div>
    
  )
}

export default TimestampMicroservice