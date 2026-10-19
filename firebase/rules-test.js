// ทดสอบ database.rules.json กับ Firebase Emulator:  cd firebase && npx firebase-tools emulators:exec --only database --project demo-checkin "node rules-test.js"
const NS='ns=demo-checkin-default-rtdb', B='http://127.0.0.1:9000';
const call = async (method, path, body, q='') => { const r = await fetch(`${B}/${path}.json?${NS}${q}`, {method, headers:{'Content-Type':'application/json'}, body: body===undefined?undefined:JSON.stringify(body)}); let j=null; try{j=await r.json();}catch(e){} return {s:r.status, j}; };
let pass=0, fail=0; const t=(name,res,want)=>{ const ok = want==='ok' ? res.s===200 : res.s!==200; (ok?pass++:fail++); console.log((ok?'PASS':'FAIL'), name, '->', res.s, ok?'':JSON.stringify(res.j)); };
const now = Date.now();
const rec = (o={}) => ({name:'นายทดสอบ ระบบ', sid:'69201030003', lat:14.99, lon:103.1, acc:12, ts:now, g:'ชช.1 CNC', ...o});
const photo = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
(async()=>{
  // app-shaped multi-path PATCH at root (student check-in with photo, round, area, device)
  t('student check-in (meta+photo, multi-path PATCH at root)', await call('PATCH','',{'checkin2_meta/a1':rec({d:20,in:true,rid:'r123',dev:'dabc123',ph:1}),'checkin2_photo/a1':photo}),'ok');
  t('student check-in without optional fields', await call('PATCH','',{'checkin2_meta/a2':rec({sid:'69201030004'})}),'ok');
  t('overwrite existing record (tamper)', await call('PATCH','',{'checkin2_meta/a2':rec({sid:'69201030005'})}),'deny');
  t('overwrite single field of existing record', await call('PUT','checkin2_meta/a2/sid','69201030009'),'deny');
  t('delete a record', await call('DELETE','checkin2_meta/a2'),'deny');
  t('bad sid format', await call('PUT','checkin2_meta/b1',rec({sid:'123'})),'deny');
  t('unknown extra field', await call('PUT','checkin2_meta/b2',rec({evil:'x'})),'deny');
  t('missing required field (no lat)', await call('PUT','checkin2_meta/b3',(({lat,...r})=>r)(rec())),'deny');
  t('timestamp 3 days old', await call('PUT','checkin2_meta/b4',rec({ts:now-3*864e5})),'deny');
  t('timestamp in the future', await call('PUT','checkin2_meta/b5',rec({ts:now+3600e3})),'deny');
  t('empty name', await call('PUT','checkin2_meta/b6',rec({name:''})),'deny');
  t('lat out of range', await call('PUT','checkin2_meta/b7',rec({lat:200})),'deny');
  t('photo wrong format', await call('PUT','checkin2_photo/p2','hello'),'deny');
  t('photo too large', await call('PUT','checkin2_photo/p3','data:image/jpeg;base64,'+'A'.repeat(400000)),'deny');
  t('photo overwrite', await call('PUT','checkin2_photo/a1',photo),'deny');
  t('photo delete (teacher cleanup)', await call('PATCH','',{'checkin2_photo/a1':null}),'ok');
  t('config + round write (teacher)', await call('PATCH','',{'checkin2_rounds/ชช_1/r9':{g:'ชช.1',start:now,until:null,name:'x'},'checkin2_config/ชช_1/round':{id:'r9',start:now}}),'ok');
  t('config PATCH deptMode/photo', await call('PATCH','checkin2_config/ชช_1',{deptMode:'some',depts:['692010301'],photo:true}),'ok');
  t('read config', await call('GET','checkin2_config/ชช_1'),'ok');
  t('read rounds', await call('GET','checkin2_rounds'),'ok');
  t('read meta (full)', await call('GET','checkin2_meta'),'ok');
  t('query meta by ts range (index)', await call('GET','checkin2_meta',undefined,`&orderBy=${encodeURIComponent('"ts"')}&startAt=${now-1000}&endAt=${now+1000}`),'ok');
  t('query meta by sid (index)', await call('GET','checkin2_meta',undefined,`&orderBy=${encodeURIComponent('"sid"')}&equalTo=${encodeURIComponent('"69201030003"')}`),'ok');
  t('query meta by non-indexed field (should fail -> client falls back)', await call('GET','checkin2_meta',undefined,`&orderBy=${encodeURIComponent('"name"')}&equalTo=${encodeURIComponent('"x"')}`),'deny');
  // other apps keep working
  t('other app: submissions write', await call('POST','submissions',{x:1}),'ok');
  t('other app: submissions read', await call('GET','submissions'),'ok');
  t('other app: general_visits', await call('POST','general_visits',{x:1}),'ok');
  t('other app: meditation write', await call('PUT','meditation/stu1/totalSeconds',120),'ok');
  t('other app: motherday-submissions', await call('POST','motherday-submissions',{x:1}),'ok');
  t('other app: scout-users', await call('PUT','scout-users/u1/points',5),'ok');
  t('old checkin (homecheckin_*)', await call('PATCH','',{'homecheckin_meta/z1':{a:1},'homecheckin_photo/z1':'img'}),'ok');
  t('unknown top-level path write', await call('PUT','randomx',{a:1}),'deny');
  t('unknown top-level path read', await call('GET','randomx'),'deny');
  t('root read', await call('GET',''),'deny');
  t('root wipe (DELETE /)', await call('DELETE',''),'deny');
  console.log(`\n${pass} passed, ${fail} failed`);
})();
