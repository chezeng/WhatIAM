import { put } from "@vercel/blob";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const importAssets = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dataDir = path.join(__dirname, '../data');

    fs.readdir(dataDir, async (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            try {
                const { url } = await put(`articles/${file}`, fileContent, {
                    access: 'public',
                    token: process.env.BLOB_READ_WRITE_TOKEN
                });
                console.log(`Uploaded ${file} to ${url}`);
            } catch (uploadErr) {
                console.error(`Error uploading ${file}:`, uploadErr);
            }
        }
    });
}

importAssets();
