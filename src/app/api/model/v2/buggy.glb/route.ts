import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'cad_models', 'buggy.glb');
    const stat = fs.statSync(filePath);
    
    const stream = fs.createReadStream(filePath);
    const readable = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      }
    });

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    return new Response('Model not found', { status: 404 });
  }
}
