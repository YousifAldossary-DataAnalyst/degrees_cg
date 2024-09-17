// import fs from 'fs';
// import path from 'path';
// import fetch from 'node-fetch';
// import os from 'os';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { mergeAudioFiles } from './merge-audio';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { audioUrls }: { audioUrls: string[] } = req.body;

//   // Ensure audioUrls is an array
//   if (!Array.isArray(audioUrls)) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   try {
//     // Use the system's temporary directory
//     const tmpDir = os.tmpdir();
//     // Download and store the audio files locally
//     const audioFiles: string[] = await Promise.all(
//       audioUrls.map(async (url: string, index: number) => {
//         const response = await fetch(url);
//         const arrayBuffer = await response.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
//         const filePath = path.join(tmpDir, `audio_chunk_${index}.mp3`);
//         fs.writeFileSync(filePath, buffer);
//         return filePath;
//       })
//     );

//     // Path to the output merged file
//     const outputFilePath: string = path.join(tmpDir, `merged_audio_${Date.now()}.mp3`);

//     // Merge the audio files
//     await mergeAudioFiles(audioFiles, outputFilePath);

//     // Read the merged file and send it as a response
//     const mergedAudio = fs.readFileSync(outputFilePath);
//     res.setHeader('Content-Type', 'audio/mpeg');
//     res.send(mergedAudio);

//     // Clean up temporary files
//     audioFiles.forEach((file) => fs.unlinkSync(file));
//     fs.unlinkSync(outputFilePath);
//   } catch (error) {
//     console.error('Error merging audio files:', error);
//     res.status(500).json({ error: 'Error merging audio files' });
//   }
// }