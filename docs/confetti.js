function startConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const particles = [];
  const colors = ['#FF6B6B','#FFD166','#6BCB77','#4D96FF','#FF7AA2'];

  for (let i=0;i<120;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H - H,
      vx: (Math.random()-0.5)*6,
      vy: Math.random()*6 + 2,
      size: Math.random()*8+4,
      color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*360,
      vr: (Math.random()-0.5)*10
    });
  }

  function frame(){
    ctx.clearRect(0,0,W,H);
    for (let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
      if (p.y > H + 30) p.y = -10;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  setTimeout(()=>canvas.remove(), 6000);
}