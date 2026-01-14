const lanes = [
  { el: document.querySelector('.lane-1 .track'), pos:0, vel:0, ratio: 1.0 },
  { el: document.querySelector('.lane-2 .track'), pos:0, vel:0, ratio: 0.7 },
  { el: document.querySelector('.lane-3 .track'), pos:0, vel:0, ratio: 0.45 }
];

const friction = 0.92;
const idleSpeed = 0.15;
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
  const delta = window.scrollY - lastScroll;
  lastScroll = window.scrollY;

  lanes.forEach(l => {
    l.vel += delta * 0.25 * l.ratio;
  });
});

function animate(){
  lanes.forEach(l => {
    l.vel *= friction;
    if(Math.abs(l.vel) < 0.05) l.vel = idleSpeed * l.ratio;
    l.pos += l.vel;

    // infinite loop effect
    const trackWidth = l.el.scrollWidth / 2; // because we duplicated
    if(l.pos > trackWidth) l.pos -= trackWidth;
    if(l.pos < 0) l.pos += trackWidth;

    l.el.style.transform = `translateX(${-l.pos}px)`;
  });

  requestAnimationFrame(animate);
}

animate();
