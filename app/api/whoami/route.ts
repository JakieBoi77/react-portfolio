export const GET = async (request: Request) => {
  return Response.json({
    "ipaddress": request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    "language": request.headers.get("accept-language"),
    "software": request.headers.get("user-agent")
  })
}