import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

type Job = { prompt: string; out: string; size: string };

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
const PROD_DIR = path.join(OUT_DIR, 'products');

const productStyle =
  'professional e-commerce fashion catalog photography, ghost mannequin invisible body, soft studio lighting, plain light grey seamless background, centered composition, high detail, sharp focus, no text, no watermark, no logo';

const jobs: Job[] = [
  // Hero (landscape, valid 32-multiple size)
  {
    prompt:
      'Editorial fashion hero banner, two stylish young models wearing urban streetwear in black blue and red tones, confident pose, dark moody studio background with subtle blue light, cinematic, high fashion magazine style, full body, high quality',
    out: path.join(OUT_DIR, 'hero.png'),
    size: '1344x768',
  },
  // Categories (square)
  {
    prompt: `Flat lay of folded men's and women's denim pants jeans, blue tones, neatly arranged, top down view, ${productStyle}`,
    out: path.join(OUT_DIR, 'cat-pantalones.png'),
    size: '1024x1024',
  },
  {
    prompt: `Stack of folded cotton crew neck t-shirts in black white and red, neatly arranged, top down view, ${productStyle}`,
    out: path.join(OUT_DIR, 'cat-remeras.png'),
    size: '1024x1024',
  },
  {
    prompt: `Two jackets a black bomber and an indigo denim jacket on hangers side by side, ${productStyle}`,
    out: path.join(OUT_DIR, 'cat-camperas.png'),
    size: '1024x1024',
  },
  {
    prompt: `Two skirts a black pencil skirt and a blue denim skirt on hangers side by side, ${productStyle}`,
    out: path.join(OUT_DIR, 'cat-polleras.png'),
    size: '1024x1024',
  },
  // Hombre (portrait)
  { prompt: `Men's black cotton crew neck t-shirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-remera-negra.png'), size: '864x1152' },
  { prompt: `Men's royal blue cotton crew neck t-shirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-remera-azul.png'), size: '864x1152' },
  { prompt: `Men's slim fit blue denim jeans, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-jean-azul.png'), size: '864x1152' },
  { prompt: `Men's black chino trousers, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-chino-negro.png'), size: '864x1152' },
  { prompt: `Men's indigo blue denim jacket, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-campera-jean.png'), size: '864x1152' },
  { prompt: `Men's black bomber jacket, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'h-campera-negra.png'), size: '864x1152' },
  // Mujer (portrait)
  { prompt: `Women's white cotton crew neck t-shirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-remera-blanca.png'), size: '864x1152' },
  { prompt: `Women's red cotton crew neck t-shirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-remera-roja.png'), size: '864x1152' },
  { prompt: `Women's blue mom fit denim jeans, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-jean.png'), size: '864x1152' },
  { prompt: `Women's black pencil skirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-pollera-negra.png'), size: '864x1152' },
  { prompt: `Women's blue denim mini skirt, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-pollera-azul.png'), size: '864x1152' },
  { prompt: `Women's light beige linen open jacket, ghost mannequin, ${productStyle}`, out: path.join(PROD_DIR, 'm-campera.png'), size: '864x1152' },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function runOne(zai: any, job: Job) {
  let lastErr: any;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await zai.images.generations.create({ prompt: job.prompt, size: job.size });
      const b64 = res.data[0].base64;
      fs.mkdirSync(path.dirname(job.out), { recursive: true });
      fs.writeFileSync(job.out, Buffer.from(b64, 'base64'));
      return true;
    } catch (e: any) {
      lastErr = e;
      const msg = String(e.message || e);
      const is429 = msg.includes('429') || msg.includes('Too many requests');
      const wait = is429 ? 15000 * (attempt + 1) : 5000 * (attempt + 1);
      console.log(`  retry ${attempt + 1} in ${wait}ms: ${msg.slice(0, 80)}`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function main() {
  const zai = await ZAI.create();
  let done = 0;
  let failed = 0;
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    if (fs.existsSync(job.out)) {
      console.log(`[${i + 1}/${jobs.length}] EXISTS ${path.basename(job.out)}`);
      done++;
      continue;
    }
    process.stdout.write(`[${i + 1}/${jobs.length}] gen ${path.basename(job.out)} ... `);
    try {
      await runOne(zai, job);
      console.log('OK');
      done++;
    } catch (e: any) {
      console.log('FAIL ' + String(e.message).slice(0, 80));
      failed++;
    }
    // pause between requests to avoid rate limiting
    await sleep(4000);
  }
  console.log(`\nDONE ${done}/${jobs.length} ok, ${failed} failed`);
}

main().catch((e) => {
  console.error('Fatal', e);
  process.exit(1);
});
