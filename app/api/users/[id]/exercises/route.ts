import connect from "@/lib/db";
import Exercise from "@/lib/models/exercise";
import User from "@/lib/models/user";

export const POST = async (request: Request) => {
  try {
    // Conenct to database
    await connect();

    // Get Info
    const body = await request.json();
    let { _id, description, duration, date } = body;
    const userId = _id;


    // UserID is required
    if (userId === "") {
      return Response.json({ error: "The ID field is required."})
    }

    // Verify id and get username
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ error: "User does not exist." });
    }
    const username = user.username;

    // Description is required
    if (description === "") {
      return Response.json({ error: "The description field is required." });
    }

    // Duration is required
    if (duration === "") {
      return Response.json({ error: "The duration field is required." });
    }

    // Verify and convert duration
    if (isNaN(parseInt(duration))) {
      return Response.json({ error: "Duration is not a number." })
    }
    duration = Number(duration);

    // Convert date string to date obj
    date = convertDate(date);

    // Add exercise to the database
    const newExercise = new Exercise({ userId, username, description, duration, date });
    await newExercise.save();

    // Send exercise data back to the user
    return Response.json({
      _id: userId,
      username,
      date: date.toDateString(),
      duration,
      description
    });

  } catch (err) {
    console.error("Error in POST /api/users/[id]/excercises:", err);
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