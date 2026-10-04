if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js');
let dip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e;const b=document.getElementById('install');if(b)b.hidden=false;});
document.addEventListener('click',e=>{if(e.target.id==='install'&&dip){dip.prompt();dip=null;e.target.hidden=true;}});
