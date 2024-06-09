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


import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the correct path to the Temp directory
const tempDir = path.join('C:', 'Users', 'Yogesh Kumar', 'Desktop', 'MessPortal', 'Backend', 'Temp');

// Ensure the Temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Correct directory path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

export const upload = multer({
    storage,
});
