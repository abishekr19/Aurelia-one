const root = document.documentElement;
const stage = document.querySelector('#productStage');
const model = document.querySelector('#heroProductRender');
const zoomReadout = document.querySelector('#zoomReadout');
const toast = document.querySelector('#stageToast');
const stageProgress = document.querySelector('#stageProgress');
const loader = document.querySelector('.loader');
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let yaw = -18;
let pitch = -5;
let zoom = 1;
let pointerId = null;
const activePointers = new Map();
let pinchStart = null;
let pointerStart = { x: 0, y: 0, yaw: 0, pitch: 0 };
let toastTimer;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const setCamera = (nextYaw = yaw, nextPitch = pitch, nextZoom = zoom) => {
  yaw = nextYaw;
  pitch = clamp(nextPitch, -22, 22);
  zoom = clamp(nextZoom, .78, 1.28);
  root.style.setProperty('--stage-yaw', `${yaw}deg`);
  root.style.setProperty('--stage-pitch', `${pitch}deg`);
  root.style.setProperty('--stage-scale', zoom);
  zoomReadout.textContent = `${Math.round(zoom * 100)}%`;
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
};

const setActiveOrbit = (button) => {
  document.querySelectorAll('.orbit-button').forEach((item) => item.classList.remove('active'));
  if (button) button.classList.add('active');
};

document.querySelectorAll('.orbit-button').forEach((button) => {
  button.addEventListener('click', () => {
    setCamera(Number(button.dataset.yaw), Number(button.dataset.pitch), zoom);
    setActiveOrbit(button);
  });
});

document.querySelectorAll('[data-zoom]').forEach((button) => {
  button.addEventListener('click', () => setCamera(yaw, pitch, zoom + Number(button.dataset.zoom)));
});

stage.addEventListener('wheel', (event) => {
  event.preventDefault();
  setCamera(yaw, pitch, zoom + (event.deltaY > 0 ? -.05 : .05));
}, { passive: false });

stage.addEventListener('pointerdown', (event) => {
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (activePointers.size === 2) {
    const [first, second] = [...activePointers.values()];
    pinchStart = { distance: Math.hypot(second.x - first.x, second.y - first.y), zoom };
    model.classList.add('is-dragging');
    return;
  }
  pointerId = event.pointerId;
  stage.setPointerCapture(pointerId);
  model.classList.add('is-dragging');
  pointerStart = { x: event.clientX, y: event.clientY, yaw, pitch };
});
stage.addEventListener('pointermove', (event) => {
  if (activePointers.has(event.pointerId)) activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (activePointers.size === 2 && pinchStart) {
    const [first, second] = [...activePointers.values()];
    const distance = Math.hypot(second.x - first.x, second.y - first.y);
    setCamera(yaw, pitch, pinchStart.zoom + (distance - pinchStart.distance) / 380);
    return;
  }
  if (pointerId !== event.pointerId) return;
  const nextYaw = pointerStart.yaw + (event.clientX - pointerStart.x) * .42;
  const nextPitch = pointerStart.pitch - (event.clientY - pointerStart.y) * .26;
  setCamera(nextYaw, nextPitch, zoom);
});
const endDrag = (event) => {
  if (event?.pointerId !== undefined) activePointers.delete(event.pointerId);
  if (activePointers.size < 2) pinchStart = null;
  if (activePointers.size === 0) { pointerId = null; model.classList.remove('is-dragging'); }
};
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
stage.addEventListener('pointerleave', () => { if (pointerId !== null) endDrag(); });

stage.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') setCamera(yaw - 8, pitch, zoom);
  if (event.key === 'ArrowRight') setCamera(yaw + 8, pitch, zoom);
  if (event.key === '+' || event.key === '=') setCamera(yaw, pitch, zoom + .1);
  if (event.key === '-') setCamera(yaw, pitch, zoom - .1);
});

document.querySelectorAll('.hotspot').forEach((hotspot) => {
  hotspot.addEventListener('click', (event) => {
    event.stopPropagation();
    setCamera(Number(hotspot.dataset.yaw), Number(hotspot.dataset.pitch), zoom);
    showToast(hotspot.dataset.message);
  });
});

document.querySelectorAll('.js-reserve').forEach((button) => {
  button.addEventListener('click', () => {
    button.innerHTML = 'You’re on the list <span>✓</span>';
    button.classList.add('is-confirmed');
    showToast('Early access noted — we’ll meet you in the quiet.');
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .13 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

let scrollFrame = null;
const syncScrollPresentation = () => {
  const detail = document.querySelector('#detail');
  const rect = detail.getBoundingClientRect();
  const progress = clamp((window.innerHeight * .72 - rect.top) / (rect.height + window.innerHeight * .25), 0, 1);
  stageProgress.textContent = `${String(Math.round(progress * 4) + 1).padStart(2, '0')} / 05`;
  if (!reducedMotion && progress > .08 && progress < .82 && pointerId === null) {
    const scrollYaw = -18 + progress * 188;
    const scrollPitch = -5 + Math.sin(progress * Math.PI) * 8;
    setCamera(scrollYaw, scrollPitch, zoom);
  }
};
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => { syncScrollPresentation(); scrollFrame = null; });
}, { passive: true });
syncScrollPresentation();

if (reducedMotion) loader.classList.add('is-done');
else window.setTimeout(() => loader.classList.add('is-done'), 900);
setCamera();

const unknownNoteCopy = {
  threshold: 'The room does not go quiet. It changes its distance.',
  drift: 'A signal can be measured without being understood. We left that space open on purpose.',
  return: 'The first sound back is never the loudest one. It is the one you notice.',
};

document.querySelectorAll('.unknown-note').forEach((note) => {
  note.addEventListener('click', () => {
    document.querySelectorAll('.unknown-note').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    note.classList.add('active');
    note.setAttribute('aria-selected', 'true');
    document.querySelector('#unknownOutput').textContent = unknownNoteCopy[note.dataset.note];
  });
});

const anatomyLayers = {
  driver: { index: 'LAYER 01 / 03', title: 'A room inside the room.', copy: 'A custom 40mm driver keeps the low end physical and the high end unforced — an intimate field with no hard edge.', measure: '40mm' },
  sensor: { index: 'LAYER 02 / 03', title: 'The world, measured softly.', copy: 'Twelve micro-sensors read the room without making a show of it, allowing cancellation to feel like atmosphere instead of force.', measure: '12×' },
  seal: { index: 'LAYER 03 / 03', title: 'The last inch of distance.', copy: 'Memory foam finds the individual shape of your ear, closing the gap between body and sound without pressure.', measure: '3.7mm' },
};
const anatomyProduct = document.querySelector('#anatomyProduct');
document.querySelectorAll('.anatomy-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.anatomy-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const layer = anatomyLayers[tab.dataset.layer];
    document.querySelector('#anatomyLayerIndex').textContent = layer.index;
    document.querySelector('#anatomyTitle').textContent = layer.title;
    document.querySelector('#anatomyCopy').textContent = layer.copy;
    document.querySelector('#anatomyMeasure').textContent = layer.measure;
    anatomyProduct.style.setProperty('--anatomy-yaw', `${tab.dataset.yaw}deg`);
  });
});

const materialCopy = {
  graphite: { index: '01', eyebrow: 'Finish 01 / Graphite', title: 'A quiet surface<br />for loud ideas.', copy: 'Soft-touch graphite absorbs stray reflections without becoming flat. It feels like a stone found after dark.', texture: 'microtexture / 7.2μ' },
  aster: { index: '02', eyebrow: 'Finish 02 / Aster', title: 'The afterimage<br />of a violet sky.', copy: 'Aster catches the edge of the light. It is the most visible finish — a signal for people who know where to look.', texture: 'microtexture / 5.8μ' },
  oxide: { index: '03', eyebrow: 'Finish 03 / Oxide', title: 'Warmth,<br />held in shadow.', copy: 'Oxide is a restrained copper-brown that makes the instrument feel found, worn in, and quietly personal.', texture: 'microtexture / 6.4μ' },
};
const materialDisplay = document.querySelector('#materialDisplay');
const materialCopyPanel = document.querySelector('#materialCopy');
document.querySelectorAll('.material-choice').forEach((choice) => {
  choice.addEventListener('click', () => {
    const material = choice.dataset.material;
    document.querySelectorAll('.material-choice').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    choice.classList.add('active');
    choice.setAttribute('aria-selected', 'true');
    materialDisplay.className = `material-display material-${material} reveal is-visible`;
    const copy = materialCopy[material];
    document.querySelector('#materialIndex').textContent = copy.index;
    materialCopyPanel.innerHTML = `<p class="eyebrow">${copy.eyebrow}</p><h3>${copy.title}</h3><p>${copy.copy}</p><span class="mono">${copy.texture}</span>`;
  });
});
