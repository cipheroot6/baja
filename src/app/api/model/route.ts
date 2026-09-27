import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'cad_models', 'buggy.glb');
    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);
    
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    return new NextResponse('Model not found', { status: 404 });
  }
}
