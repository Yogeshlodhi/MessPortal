// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, `C:\Users\Yogesh Kumar\Desktop\MessPortal\Backend\Temp`)
//         // cb(null, "../Temp")
//     },
//     filename: function(req, file, cb){
//         // const uniqueSuffix = Date.now() + '-' + Math.round
//         // (Math.random() * 1E9)
//         // cb(null, file.fieldname + '-' + uniqueSuffix)
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({
//     storage,
// })


// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Define the correct path to the Temp directory
// // const tempDir = path.join('C:', 'Users', 'Yogesh Kumar', 'Desktop', 'MessPortal', 'Backend', 'Temp');
// const tempDir = path.join(__dirname, 'Temp');

// // Ensure the Temp directory exists
// if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, tempDir); // Correct directory path
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Use the original filename
//     }
// });

// export const upload = multer({
//     storage,
// });


import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the correct path to the Temp directory
const tempDir = path.join(__dirname, 'Temp');

// Ensure the Temp directory exists
try {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
} catch (err) {
    console.error('Error creating Temp directory:', err);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Correct directory path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
        cb(null, uniqueSuffix + '-' + sanitizedFilename); // Use a unique and sanitized filename
    }
});

export const upload = multer({
    storage,
});
