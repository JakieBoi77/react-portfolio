export const GET = async (req: Request, { params }: { params : { date: string } }) => {
  const date = params.date;

  // If input is a date string
  if (!isNaN(new Date(date).getTime())) {
    const parsedDate = new Date(date);
    return Response.json({
      "unix": parsedDate.getTime(),
      "utc": parsedDate.toUTCString()
    });
  }

  // If input is a numeric string
  else if (!isNaN(parseInt(date))) {
    const parsedDate = new Date(parseInt(date));
    return Response.json({
      "unix": parsedDate.getTime(),
      "utc": parsedDate.toUTCString()
    });
  }

  // If there is no input
  else if (date === null) {
    const parsedDate = new Date();
    return Response.json({
      "unix": parsedDate.getTime(),
      "utc": parsedDate.toUTCString()
    });
  }

  // Invalid input
  else {
    return Response.json({
      "error": "Invalid Date"
    });
  }
}