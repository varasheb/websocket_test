import { WebSocketServer, WebSocket } from 'ws';
import { streamAIResponse } from './openai';
import {streamFilesToClient} from './utils'

export function startWebSocketServer(port = 8080) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (ws: WebSocket) => {
    ws.send(JSON.stringify({ type: 'connection', message: '🔌 WebSocket connected' }));

    // await streamFilesToClient(ws);
    ws.on('message', async (msg) => {
        let parsed: { prompt?: string };
      
        try {
          parsed = JSON.parse(msg.toString());
        } catch (err) {
          ws.send(JSON.stringify({ type: 'error', message: '❌ Invalid JSON format.' }));
          return;
        }
      
        const prompt = parsed.prompt;
      
        if (!prompt || typeof prompt !== 'string') {
          ws.send(JSON.stringify({ type: 'error', message: '❌ Missing or invalid "prompt" field.' }));
          return;
        }
      
        // 🔧 Special mode to simulate app generation
        if (prompt.includes('create application')) {
          try {
            await streamAIResponse(prompt, (chunk) => {
              // Simulate parsing chunk into file data (structure: path + content)
              const fileData = tryParseFileChunk(chunk); // You write this function
      
              if (fileData) {
                ws.send(JSON.stringify({
                  type: 'file',
                  data: {
                    path: fileData.path,
                    filename: path.basename(fileData.path),
                    filetype: path.extname(fileData.path).replace('.', ''),
                    content: fileData.content,
                    action: 'stream',
                  },
                }));
              }
            });
      
            ws.send(JSON.stringify({ type: 'done' }));
          } catch (err) {
            console.error('AI error:', err);
            ws.send(JSON.stringify({ type: 'error', message: '❌ AI processing failed' }));
          }
      
          return;
        }
      
        // 🧠 Default AI streaming (chat)
        try {
          await streamAIResponse(prompt, (chunk) => {
            ws.send(JSON.stringify({ type: 'ai_chunk', data: chunk }));
          });
          ws.send(JSON.stringify({ type: 'done' }));
        } catch (err) {
          console.error('AI Streaming error:', err);
          ws.send(JSON.stringify({ type: 'error', message: '❌ AI service error. Please try again later.' }));
        }
      });
      

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

  console.log(`✅ WebSocket server running at ws://localhost:${port}`);
}
