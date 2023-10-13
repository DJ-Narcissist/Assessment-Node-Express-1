const readline = require('readline');
const https = require('https');
const fs = require('fs');
const urlModule = require('url');
const { response } = require('express');

if (process.argv.length !== 3) {
    console.error('Usage: node.js FILENAME');
    process.exit(1);
}


const filename = process.argv[2];

const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    output: process.stdout,
    terminal: false,
});

rl.on('line', (line) => {
    const cleanedURL = line.trim();

    const url = urlModule.parse(cleanedURL);
    const hostname = url.hostname;

    if (!hostname) {
        console.error(`Invalid URL: ${cleanedURL}`);
    } else {
        downloadAndSaveHTML(cleanedURL, hostname);
    }
});

function downloadAndSaveHTML(url,hostname) {
    const filename = `${hostname}.html`

    const options = {
        method : 'GET', 
        hostname: urlModule.parse(url).hostname,
        path : urlModule.parse(url).path,

    };
    const request = https.get(options, (response) => {
        if (response.statusCode !== 200){
            console.error(`Failed to download ${url}. Status Code: ${response.statusCode}`);

        }   else { 
            const fileStream = fs.createWriteStream(filename);

            response.on('data', (data) => {
                fileStream.write(data);
            });

            response.on('end', () => {
                fileStream.end();
                console.log(`Wrote to ${filename}`);
            });

            response.on('error',(err) => {
                console.log(`Error writing to ${filename}: ${err}`);
            });
        }
    });
    request.on('error', (err) => {
        console.error(`Error downloading ${url}: ${err}`);
    });
}

rl.on('close', () => {
    console.log('Download and save process completed.')
});
