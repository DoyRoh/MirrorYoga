// index.html과 인식 모델을 www 폴더에 모은다 (iOS 앱에 들어갈 파일)
import { mkdir, copyFile, access, writeFile } from 'node:fs/promises';

const MP = 'node_modules/@mediapipe/tasks-vision';
const MODELS = {
  'pose_landmarker_lite.task': 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
  'pose_landmarker_full.task': 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task',
};
const exists = p => access(p).then(() => true, () => false);

await mkdir('www/mp/wasm', { recursive: true });
await copyFile('index.html', 'www/index.html');
await copyFile(`${MP}/vision_bundle.js`, 'www/mp/vision_bundle.js');
for (const f of ['vision_wasm_internal.js', 'vision_wasm_internal.wasm']) {
  await copyFile(`${MP}/wasm/${f}`, `www/mp/wasm/${f}`);
}
for (const [name, url] of Object.entries(MODELS)) {
  const out = `www/mp/${name}`;
  if (await exists(out)) continue;
  console.log('모델 내려받는 중:', name);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name} 내려받기 실패 (${res.status})`);
  await writeFile(out, Buffer.from(await res.arrayBuffer()));
}
console.log('www 준비 완료');
