import React, { useState } from 'react';

const RequestHeaderParserMicroservice = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/whoami`, {
        method: "GET"
      });

      if (response.ok) {
        const result = await response.json();
        setResponse(result);

      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error submitting data.");
    }
  };
  return (
      <div className="tw-class flex items-center justify-center flex-col h-screen w-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-center">Request Header Parser Microservice</h1>
        <div className="mt-4 border p-5 w-[80%] min-w-64 max-w-[500px] bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="mb-2" htmlFor="button">Click to send request:</label>
            <input 
              id="button" 
              type="submit" 
              value="Submit" 
              className="mt-4 w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </form>
          <p className="text-gray-600 my-4 w-full text-center"><code>GET /api/whoami</code></p>
          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold">Response:</h2>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
  )
}

export default RequestHeaderParserMicroservice