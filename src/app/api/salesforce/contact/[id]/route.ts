import { updateSObject } from "@/services/salesforce.service";
import type { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await updateSObject("Contact", params.id, body);
    return Response.json({});
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
