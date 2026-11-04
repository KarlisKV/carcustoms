'use strict';
const $ = id => document.getElementById(id);
const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
const write = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
function preferences(){ return {theme:$('theme').value,car:$('car').value.trim().slice(0,36),station:$('station').value.trim().slice(0,48)}; }
function update(){ const p=preferences(); $('dashboard').className='dashboard '+p.theme; $('car-label').textContent=p.car || 'Your car'; $('station-label').textContent=p.station || 'Your favorite station'; write('cartiles.preferences',JSON.stringify(p)); if(!$('next-step').hidden){$('selection-summary').textContent='Selected finish: '+$('theme').selectedOptions[0].textContent+'.';} }
try { const p=JSON.parse(read('cartiles.preferences')||'{}'); if(['sculpted','minimal','halloween'].includes(p.theme)) $('theme').value=p.theme; if(typeof p.car==='string') $('car').value=p.car.slice(0,36); if(typeof p.station==='string') $('station').value=p.station.slice(0,48); } catch {}
['theme','car','station'].forEach(id=>$(id).addEventListener('input',update)); update();

$('preferences').addEventListener('submit',e=>{e.preventDefault();update();$('next-step').hidden=false;$('selection-summary').textContent='Selected finish: '+$('theme').selectedOptions[0].textContent+'.';$('next-step').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});$('next-step').focus({preventScroll:true});});
