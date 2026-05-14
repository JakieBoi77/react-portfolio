import connect from "@/lib/db";
import Exercise from "@/lib/models/exercise";
import User from "@/lib/models/user";
import {
    ApiRequestError,
    checkRateLimit,
    jsonError,
    parseDateString,
    parseJsonObject,
    parseObjectId,
    readOptionalString,
    readRequiredInteger,
    readRequiredString,
} from "@/lib/api-security";

type RouteContext = { params: Promise<{ id: string }> };

export const POST = async (request: Request, { params }: RouteContext) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "exercises:create",
            limit: 30,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        // Conenct to database
        await connect();

        // Get Info
        const body = await parseJsonObject(request);
        const { id } = await params;
        const userId = parseObjectId(id, "User ID");
        const bodyUserId = readOptionalString(body, "_id", {
            label: "User ID",
            maxLength: 24,
        });

        if (bodyUserId && bodyUserId !== userId) {
            throw new ApiRequestError("Request body ID must match route ID");
        }

        // Verify id and get username
        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ error: "User does not exist." });
        }
        const username = user.username;

        const description = readRequiredString(body, "description", {
            label: "Description",
            maxLength: 280,
        });
        const duration = readRequiredInteger(body, "duration", {
            label: "Duration",
            min: 1,
            max: 100_000,
        });
        const dateInput = readOptionalString(body, "date", {
            label: "Date",
            maxLength: 10,
        });

        // Convert date string to date obj
        const date = dateInput ? parseDateString(dateInput, "Date") : new Date();

        // Add exercise to the database
        const newExercise = new Exercise({
            userId,
            username,
            description,
            duration,
            date,
        });
        await newExercise.save();

        // Send exercise data back to the user
        return Response.json({
            _id: userId,
            username,
            date: date.toDateString(),
            duration,
            description,
        });
    } catch (err) {
        console.error("Error in POST /api/users/[id]/excercises:", err);
        return jsonError(err, "Internal server error");
    }
};
