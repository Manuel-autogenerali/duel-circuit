import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const url='http://127.0.0.1:8085/';
function open(address){console.log('Abrí '+address);spawn('cmd.exe',['/c','start','',address],{windowsHide:true,stdio:'ignore'}).unref();}
let live=false;
try{const response=await fetch(url+'app.js',{signal:AbortSignal.timeout(1500)});live=response.ok&&(await response.text()).includes('BETA 2.0');}catch{}
if(live)open(url);
else{
 const child=spawn(process.execPath,[fileURLToPath(new URL('server.mjs',import.meta.url))],{env:{...process.env,PORT:'8085',DUEL_HOST:'127.0.0.1',DUEL_FALLBACK:'1'},windowsHide:true,stdio:['ignore','pipe','pipe']});
 child.stdout.on('data',data=>{const text=String(data);process.stdout.write(text);const match=text.match(/http:\/\/127\.0\.0\.1:\d+\//);if(match){open(match[0]);console.log('Dejá esta ventana abierta mientras probás el juego.');}});
 child.stderr.pipe(process.stderr);
 child.on('error',error=>{console.error(error.message);process.exitCode=1;});
}
