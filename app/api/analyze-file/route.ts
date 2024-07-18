export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    const file: File | null = formData.get("upfile") as unknown as File;

    return Response.json({
      name: file.name,
      type: file.type,
      size: file.size
    });

  } catch (err: any) {
    console.error("Error: " + err);
    return new Response(err.message)
  }
  
};