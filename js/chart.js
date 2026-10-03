// chart.js — نمودار Canvas از ۱۰ تست آخر

import { getLastN } from './history.js';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return ctx;
}

function drawChart() {
  const canvas = document.getElementById('result-chart');
  if (!canvas) return;

  const ctx = setupCanvas(canvas);
  const rect = canvas.getBoundingClientRect();

  // داده‌ها
  const data = getLastN(10);
  if (data.length === 0) return;

  const wpmValues = data.map((d) => d.wpm);

  // حاشیه‌ها
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = rect.width - padding.left - padding.right;
  const chartHeight = rect.height - padding.top - padding.bottom;

  // مقادیر min/max
  const maxWPM = Math.max(...wpmValues, 10);
  const minWPM = 0;

  // پاک کردن
  ctx.clearRect(0, 0, rect.width, rect.height);

  // استایل محور
  ctx.strokeStyle = '#9ca3af';
  ctx.lineWidth = 1;
  ctx.beginPath();

  // محور Y
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + chartHeight);

  // محور X
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  // نقاط
  const points = wpmValues.map((wpm, i) => {
    const x = padding.left + (i / Math.max(wpmValues.length - 1, 1)) * chartWidth;
    const y = padding.top + chartHeight - (wpm / maxWPM) * chartHeight;
    return { x, y, wpm };
  });

  // خط
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  // دایره‌ها
  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
  });

  // لیبل محور Y
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px system-ui';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  ctx.fillText(maxWPM, padding.left - 8, padding.top);
  ctx.fillText('0', padding.left - 8, padding.top + chartHeight);

  // لیبل محور X
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('۱۰ تست آخر', padding.left + chartWidth / 2, padding.top + chartHeight + 10);
}

export {
  drawChart
};