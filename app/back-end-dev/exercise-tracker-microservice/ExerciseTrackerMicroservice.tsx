import React, { useState } from 'react';

const ExerciseTrackerMicroservice = () => {

  const [userResponse, setUserResponse] = useState<string | null>(null);
  const [exerciseResponse, setExerciseResponse] = useState<string | null>(null);
  const [logResponse, setLogResponse] = useState<string | null>(null);

  const handleUserSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (event.target as HTMLFormElement).username.value;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        const result = await response.json();
        setUserResponse(result);

      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error submitting data.");
    }
  };

  const handleExerciseSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const _id = form._id.value;
    const description = form.description.value;
    const duration = form.duration.value;
    const date = form.date.value;

    try {
      const response = await fetch(`/api/users/${_id}/exercises`, {
        method: "POST",
        body: JSON.stringify({ _id, description, duration, date })
      });

      if (response.ok) {
        const result = await response.json();
        setExerciseResponse(result);

      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error submitting data.");
    }
  };

  const handleLogSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const _id = form._id.value;
    const from = form.from.value;
    const to = form.to.value;
    const limit = form.limit.value;

    const url = new URL(`/api/users/${_id}/logs/`, window.location.origin);
    if (from) {
      url.searchParams.append("from", from);
    }
    if (to) {
      url.searchParams.append("to", to);
    }
    if (limit) {
      url.searchParams.append("limit", limit);
    }

    console.log(url)

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        setLogResponse(result);

      } else {
        alert("Failed to submit.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="tw-class flex flex-col items-center justify-center min-h-screen w-[100%] p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-center">Exercise Tracker</h1>
      <div className="flex flex-col justify-center items-center w-full max-w-2xl p-6">
        <div className="w-full bg-white p-6 m-6 rounded-lg shadow-md">
          <form onSubmit={handleUserSubmit}>
            <h2 className="text-xl font-semibold mb-4">Create a New User</h2>
            <input 
              id="uname" 
              type="text" 
              name="username" 
              placeholder="Username" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="submit" 
              value="Submit" 
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
            />
          </form>
          <p className="text-gray-600 mt-4"><code>POST /api/users</code></p>
          {userResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold">Response:</h2>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(userResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <div className="w-full bg-white p-6 m-6 rounded-lg shadow-md">
          <form onSubmit={handleExerciseSubmit}>
            <h2 className="text-xl font-semibold mb-4">Add Exercises</h2>
            <input 
              id="uid" 
              type="text" 
              name="_id" 
              placeholder="id" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="desc" 
              type="text" 
              name="description" 
              placeholder="Description" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="dur" 
              type="text" 
              name="duration" 
              placeholder="Exercise Duration (mins)" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="date" 
              type="text" 
              name="date" 
              placeholder="Date (YYYY-MM-DD)" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="submit" 
              value="Submit" 
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
            />
          </form>
          <p className="text-gray-600 mt-4"><code>POST /api/users/[id]/exercises</code></p>
          {exerciseResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold">Response:</h2>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(exerciseResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <div className="w-full bg-white p-6 m-6 rounded-lg shadow-md">
          <form onSubmit={handleLogSubmit}>
            <h2 className="text-xl font-semibold mb-4">Get Exercises</h2>
            <input 
              id="uid" 
              type="text" 
              name="_id" 
              placeholder="id" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="from" 
              type="text" 
              name="from" 
              placeholder="From (YYYY-MM-DD) (optional)" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="to" 
              type="text" 
              name="to" 
              placeholder="To (YYYY-MM-DD) (optional)" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="limit" 
              type="text" 
              name="limit" 
              placeholder="Limit (Number) (optional)" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="submit" 
              value="Submit" 
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
            />
          </form>
          <p className="text-gray-600 mt-4"><code>GET /api/users/[id]/logs?[from][&to][&limit]</code></p>
          {logResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold">Response:</h2>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(logResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExerciseTrackerMicroservice