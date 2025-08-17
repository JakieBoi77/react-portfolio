import connect from "@/lib/db";
import User from "@/lib/models/user";

export const POST = async (request: Request) => {
    try {
        // Conenct to database
        await connect();

        // Get request body
        const body = await request.json();

        // Get username
        const username = body.username;

        // Username is required
        if (username === "") {
            return Response.json({ error: "The username field is required." });
        }

        // Look in the database for the user
        let user = await User.findOne({ username });

        // Add user if not found
        if (!user) {
            const newUser = new User({ username });
            const savedUser = await newUser.save();
            user = savedUser;
        }

        // Send back the user data
        return Response.json({ username: user.username, _id: user._id });
    } catch (err) {
        console.error("Error in POST /api/users:", err);
        return Response.json({ error: "Internal server error" });
    }
};
