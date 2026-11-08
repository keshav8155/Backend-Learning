const { ImageKit } = require('@imagekit/nodejs')
require('dotenv').config();
const imageKit = new ImageKit({
  privateKey: process.env.PRIVATE_KEY_IMAGEKIT
});

async function uploadImage(buffer) {
    try {
        const result = await imageKit.files.upload({
            file: buffer.toString('base64'),
            fileName: 'image.jpg',
    }   );
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }};

module.exports = uploadImage;