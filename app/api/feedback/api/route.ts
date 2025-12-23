import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("feedback")
    .insert([{ message }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
