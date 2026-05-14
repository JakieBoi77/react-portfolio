import connect from "@/lib/db";
import User from "@/lib/models/user";
import {
    checkRateLimit,
    jsonError,
    parseJsonObject,
    readRequiredString,
} from "@/lib/api-security";

export const POST = async (request: Request) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "users:create",
            limit: 20,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        // Conenct to database
        await connect();

        // Get request body
        const body = await parseJsonObject(request);

        // Get username
        const username = readRequiredString(body, "username", {
            label: "Username",
            maxLength: 64,
        });

        // Look in the database for the user
        let user = await User.findOne({ username: { $eq: username } });

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
        return jsonError(err, "Internal server error");
    }
};
