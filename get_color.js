const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const imagePath = path.join(__dirname, 'public/images/sequence/frame_0.png');

fs.createReadStream(imagePath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function () {
        // Read the top-left pixel (0, 0)
        const r = this.data[0];
        const g = this.data[1];
        const b = this.data[2];
        const a = this.data[3];

        console.log(`Dimensions: ${this.width}x${this.height}`);
        console.log(`RGB: ${r}, ${g}, ${b}`);
        console.log(`Hex: #${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    });
