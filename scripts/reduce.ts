const {
    LOG_OK, LOG_FAIL, LOG_INFO, LOG_WARN , DIST_PATH, addSourceCode,
} = require('./tools.ts');
const STATIC_PATH = `${DIST_PATH}/static`;
const INDEX_FILE = `${STATIC_PATH}/index.html`;
const MIN_FILE = 'bundle.min.js';
const __FS = require('fs');
require('dotenv').config();
let data = __FS.readFileSync(INDEX_FILE, {encoding: 'utf8', flag: 'r'});

// bundle js files
const regex = /(<script\s*src([^<]*)*<\/script>)/ig;
let scripts = data.match(regex);
let minified  = '';
let replaceAble = '';
scripts.forEach(script => {
    LOG_OK(`script detected: ${script}`);
    const filename = script.match(/src=\"([^\"]*)/);
    if(!replaceAble){
        replaceAble = script.replace(filename[1], MIN_FILE);
        data = data.replace(script, replaceAble);
    } else {
        data = data.replace(script, '');
    }
    const dataFile = __FS.readFileSync(`${STATIC_PATH}/${filename[1]}`, {encoding: 'utf8', flag: 'r'});
    minified += `\n${dataFile}`;
});
if(scripts.length > 0){
    __FS.writeFileSync(`${DIST_PATH}/static/${MIN_FILE}`, minified, {encoding: 'utf8', flag: 'w'});
    __FS.writeFileSync(`${DIST_PATH}/static/index.html`, data, {encoding: 'utf8', flag: 'w'});
    LOG_OK(`bundle created`)
} else {
    LOG_WARN('no bundle created')
}
