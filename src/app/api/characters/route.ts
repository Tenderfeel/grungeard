import { NextResponse } from "next/server";
import characters from "@submodule/zzz-wiki-scrap/data/characters";

export async function GET() {
  return NextResponse.json(characters);
}
