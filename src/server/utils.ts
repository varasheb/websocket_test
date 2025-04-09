import fs from 'fs/promises';
import path from 'path';
import { WebSocket } from 'ws';

const ROOT_FOLDER = path.resolve(__dirname, '../../teststream'); 

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

export async function streamFilesToClient(ws: WebSocket) {
  try {
    const filePaths = await getAllFiles(ROOT_FOLDER);

    for (const fullPath of filePaths) {
        const content = await fs.readFile(fullPath, 'utf-8');
        const relativePath = path.relative(ROOT_FOLDER, fullPath);
        const filename = path.basename(fullPath);
        const filetype = path.extname(fullPath).replace('.', '');
  
        ws.send(
          JSON.stringify({
            type: 'file',
            data: {
            //   content,
              path: relativePath,
              filename,
              filetype,
              action: 'stream',
            },
          })
        );
      };

    ws.send(JSON.stringify({ msg: 'file_stream_done' }));
  } catch (err) {
    console.error('❌ Error streaming files:', err);
    ws.send(
      JSON.stringify({ type: 'error', message: 'Failed to stream files.' })
    );
  }
}
