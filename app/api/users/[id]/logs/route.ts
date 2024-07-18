import connect from "@/lib/db";
import Exercise from "@/lib/models/exercise";
import User from "@/lib/models/user";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest, { params }: { params : { id: string } }) => {
  try {
    // Conenct to database
    await connect();

    // UserID is required
    let userId = params.id;
    if (userId === "") {
      return Response.json({ error: "The ID field is required."})
    }

    // Verify id and get username
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ error: "User does not exist." });
    }
    const username = user.username;

    // Get Query Parameters
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = searchParams.get("limit");

    // Must have both from and to
    if ( (from && !to) || (to && !from) ) {
      return Response.json({ error: "'To' and 'From' must be used together."})
    }

    // Get requested exercises
    let exercises = await Exercise.find({ userId });;
    if ( from && to ) {
      const fromDate = convertDate(from);
      const toDate = convertDate(to);
      if (limit) {
        const logLimit = parseInt(limit);
        exercises = await Exercise.find({ userId, date: { $gte: from, $lte: to }}).limit(logLimit);
      } else {
        exercises = await Exercise.find({ userId, date: { $gte: from, $lte: to }});
      }
    } else if (limit) {
      const logLimit = parseInt(limit);
      exercises = await Exercise.find({ userId }).limit(logLimit);
    }

    // Format exercise objects
    const formattedExercises = exercises.map(exercise => {
      return ({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      });
    });

    // Return the log
    return Response.json({
      _id: userId,
      username,
      count: exercises.length,
      log: [ ...formattedExercises ]
    });

  } catch (err) {
    console.error("Error in GET /api/users/:_id/logs:", err);
    return Response.json({ error: "Interal server error" });
  }
}

// Convert date string to date obj (time zone issue if conversion is not done manually)
function convertDate(date: string) {
  let convertedDate;
  if (date === "" || date === undefined) {
    convertedDate = new Date();
  } else {
    const dateParts = date.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const day = parseInt(dateParts[2], 10);
    convertedDate = new Date(year, month, day);
  }
  return convertedDate;
}