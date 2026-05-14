import connect from "@/lib/db";
import Exercise from "@/lib/models/exercise";
import User from "@/lib/models/user";
import {
    ApiRequestError,
    checkRateLimit,
    jsonError,
    parseDateString,
    parseObjectId,
} from "@/lib/api-security";
import { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

const getExerciseLog = async (
    request: NextRequest,
    { params }: RouteContext,
) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "exercises:logs",
            limit: 60,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        // Conenct to database
        await connect();

        // UserID is required
        const { id } = await params;
        const userId = parseObjectId(id, "User ID");

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
        const logLimit = parseLogLimit(limit);

        // Must have both from and to
        if ((from && !to) || (to && !from)) {
            return Response.json({
                error: "'To' and 'From' must be used together.",
            });
        }

        // Get requested exercises
        let exercises = await Exercise.find({ userId: { $eq: userId } }).limit(
            logLimit,
        );
        if (from && to) {
            const fromDate = parseDateString(from, "From date");
            const toDate = parseDateString(to, "To date");
            exercises = await Exercise.find({
                userId: { $eq: userId },
                date: { $gte: fromDate, $lte: toDate },
            }).limit(logLimit);
        }

        // Format exercise objects
        const formattedExercises = exercises.map((exercise) => {
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString(),
            };
        });

        // Return the log
        return Response.json({
            _id: userId,
            username,
            count: exercises.length,
            log: [...formattedExercises],
        });
    } catch (err) {
        console.error("Error in GET /api/users/:_id/logs:", err);
        return jsonError(err, "Internal server error");
    }
};

export const GET = getExerciseLog;
export const POST = getExerciseLog;

const parseLogLimit = (limit: string | null) => {
    if (!limit) {
        return 1000;
    }

    const parsedLimit = Number(limit);

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 1000) {
        throw new ApiRequestError("Limit must be an integer between 1 and 1000");
    }

    return parsedLimit;
};
