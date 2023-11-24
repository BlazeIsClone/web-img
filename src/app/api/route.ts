import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import crypto from "crypto";
import fs from "fs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const file = body["files[]"] as File;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = path.parse(file.name).name;

  const fileHash = crypto.randomBytes(16).toString("hex");

  const fileDir = `public/storage/${fileHash}`;

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  sharp(buffer)
    .webp()
    .toFile(`public/storage/${fileHash}/${filename}.webp`, (err, info) => {
      console.log(info, err);
    });

  return new NextResponse(fileHash);
}
