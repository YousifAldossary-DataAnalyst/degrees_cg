// // utils/mergeAudio.js
// const ffmpeg = require('fluent-ffmpeg');
// const ffmpegStatic = require('ffmpeg-static');
// const path = require('path');
// const fs = require('fs');

// ffmpeg.setFfmpegPath(ffmpegStatic);

// export const mergeAudioFiles = (audioFiles: any, outputFilePath: any) => {
//   return new Promise((resolve, reject) => {
//     const command = ffmpeg();

//     audioFiles.forEach((file:any) => {
//       command.input(file);
//     });

//     command
//       .on('end', () => {
//         resolve(outputFilePath);
//       })
//       .on('error', (err:any) => {
//         reject(err);
//       })
//       .mergeToFile(outputFilePath, path.dirname(outputFilePath));
//   });
// };

// module.exports = { mergeAudioFiles };

