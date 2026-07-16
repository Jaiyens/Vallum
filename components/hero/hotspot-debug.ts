import { hotspotRectsAt, coverTransform, rectToStage } from "./hotspots";

// Dev-only rect visualizer for tuning hotspots against real footage.
// Mounted lazily behind a NODE_ENV guard plus a ?hotspots=1 flag; the
// dynamic import means it never ships in production bundles.
export function mountHotspotDebug(
  stage: HTMLElement,
  video: HTMLVideoElement,
): () => void {
  const layer = document.createElement("div");
  layer.style.cssText =
    "position:absolute;inset:0;pointer-events:none;z-index:60;";
  stage.appendChild(layer);
  const pool: HTMLDivElement[] = [];
  const draw = () => {
    const rects = hotspotRectsAt(video.currentTime);
    const c = coverTransform(stage.clientWidth, stage.clientHeight);
    while (pool.length < rects.length) {
      const el = document.createElement("div");
      el.style.cssText =
        "position:absolute;left:0;top:0;outline:1px dashed #22ff88;" +
        "font:10px monospace;color:#22ff88;";
      layer.appendChild(el);
      pool.push(el);
    }
    pool.forEach((el, i) => {
      const r = rects[i];
      if (!r) {
        el.style.display = "none";
        return;
      }
      const s = rectToStage(r, c);
      el.style.display = "block";
      el.style.transform = `translate(${s.x}px,${s.y}px)`;
      el.style.width = `${s.w}px`;
      el.style.height = `${s.h}px`;
      el.textContent = `${video.currentTime.toFixed(2)}s #${i}`;
    });
  };
  const id = window.setInterval(draw, 100);
  return () => {
    clearInterval(id);
    layer.remove();
  };
}
