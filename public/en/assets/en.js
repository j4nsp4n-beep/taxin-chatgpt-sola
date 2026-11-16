(() => {
  'use strict';

  const doc = document.documentElement;
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smooth = value => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  doc.classList.add('js');
  body.classList.add('motion-ready');

  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.top-progress');
  const hero = document.querySelector('.hero');
  const heroSpace = document.querySelector('.hero-space');
  const convergence = document.querySelector('.convergence-scene');
  const convergenceCanvas = document.querySelector('.convergence-canvas');
  const packet = document.querySelector('.review-packet');
  const fragments = [...document.querySelectorAll('.source-fragment')];
  const scenes = [...document.querySelectorAll('main .scene')];
  const progressLinks = [...document.querySelectorAll('.section-progress a')];
  const revealTargets = [...document.querySelectorAll('[data-reveal],[data-stagger],[data-kinetic]')];
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  let network;
  let paths = [];

  if ('IntersectionObserver' in window && !reduced.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }

  function buildNetwork() {
    if (!convergenceCanvas || !packet || fragments.length === 0 || network) return;
    network = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    network.setAttribute('class', 'convergence-network');
    network.setAttribute('aria-hidden', 'true');
    network.setAttribute('focusable', 'false');
    fragments.forEach(() => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'network-path');
      network.appendChild(path);
      paths.push(path);
    });
    convergenceCanvas.insertBefore(network, convergenceCanvas.firstChild);
  }

  function updateNetwork(progress) {
    if (!network || !convergenceCanvas || !packet || window.innerWidth <= 760) return;
    const canvasRect = convergenceCanvas.getBoundingClientRect();
    const packetRect = packet.getBoundingClientRect();
    const targetX = packetRect.left - canvasRect.left + packetRect.width / 2;
    const targetY = packetRect.top - canvasRect.top + packetRect.height / 2;
    const pathProgress = smooth((progress - 0.08) / 0.46);

    fragments.forEach((fragment, index) => {
      const rect = fragment.getBoundingClientRect();
      const x = rect.left - canvasRect.left + rect.width / 2;
      const y = rect.top - canvasRect.top + rect.height / 2;
      const bend = index % 2 === 0 ? -46 : 46;
      const midX = x + (targetX - x) * 0.5;
      const d = `M ${x.toFixed(1)} ${y.toFixed(1)} C ${(midX + bend).toFixed(1)} ${y.toFixed(1)}, ${(midX - bend).toFixed(1)} ${targetY.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
      const path = paths[index];
      path.setAttribute('d', d);
      path.style.opacity = String(0.18 + pathProgress * 0.72);
      path.style.strokeDashoffset = String(1 - pathProgress);
    });
  }

  function updateConvergence(progress) {
    if (!convergenceCanvas || !packet) return;
    doc.style.setProperty('--conv', progress.toFixed(4));

    if (window.innerWidth <= 760 || reduced.matches) {
      fragments.forEach(fragment => {
        fragment.style.transform = '';
        fragment.style.opacity = '1';
      });
      return;
    }

    const packetX = packet.offsetLeft + packet.offsetWidth / 2;
    const packetY = packet.offsetTop + packet.offsetHeight / 2;
    const targetOffsets = [
      [-92, -116], [-118, -32], [-78, 82], [94, -104], [116, 26]
    ];
    const gather = smooth((progress - 0.08) / 0.55);
    const dissolve = smooth((progress - 0.58) / 0.2);

    fragments.forEach((fragment, index) => {
      const startX = fragment.offsetLeft + fragment.offsetWidth / 2;
      const startY = fragment.offsetTop + fragment.offsetHeight / 2;
      const offset = targetOffsets[index] || [0, 0];
      const moveX = (packetX + offset[0] - startX) * gather;
      const moveY = (packetY + offset[1] - startY) * gather;
      const rotation = [-5, 3, -2, 4, -3][index] * (1 - gather);
      const scale = 1 - gather * 0.22;
      fragment.style.transform = `translate3d(${moveX.toFixed(1)}px,${moveY.toFixed(1)}px,${(gather * 70).toFixed(1)}px) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      fragment.style.opacity = String(1 - dissolve * 0.7);
    });

    updateNetwork(progress);
  }

  function activeScene() {
    const probe = window.innerHeight * 0.38;
    let active = 0;
    let best = Infinity;
    scenes.forEach((scene, index) => {
      const rect = scene.getBoundingClientRect();
      const distance = Math.abs(rect.top - probe);
      if (rect.bottom > 0 && rect.top < window.innerHeight && distance < best) {
        best = distance;
        active = index;
      }
    });
    progressLinks.forEach((link, index) => {
      const selected = index === active;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function render() {
    frame = 0;
    const y = window.scrollY;
    const total = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pageProgress = clamp(y / total);
    if (progressBar) progressBar.style.transform = `scaleX(${pageProgress.toFixed(4)})`;
    if (header) header.classList.toggle('is-scrolled', y > 24);

    if (hero && heroSpace && !reduced.matches) {
      const rect = hero.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, rect.height));
      hero.style.setProperty('--hero-shift', String(progress * 48));
      heroSpace.style.setProperty('--hero-y1', `${(-progress * 22 + pointerY * 6).toFixed(1)}px`);
      heroSpace.style.setProperty('--hero-y2', `${(-progress * 38 - pointerY * 8).toFixed(1)}px`);
      heroSpace.style.setProperty('--hero-y3', `${(-progress * 54 + pointerY * 10).toFixed(1)}px`);
      heroSpace.style.setProperty('--hero-y4', `${(-progress * 68 - pointerY * 5).toFixed(1)}px`);
      heroSpace.style.transform = `translate3d(${(pointerX * 5).toFixed(1)}px,0,0)`;
    }

    if (convergence) {
      const rect = convergence.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = reduced.matches ? 1 : clamp(-rect.top / travel);
      updateConvergence(progress);
    }

    activeScene();
  }

  function queueRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  if (heroSpace && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced.matches) {
    heroSpace.addEventListener('pointermove', event => {
      const rect = heroSpace.getBoundingClientRect();
      pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1) - 0.5;
      pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1) - 0.5;
      queueRender();
    }, { passive: true });
    heroSpace.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
      queueRender();
    }, { passive: true });
  }

  progressLinks.forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
    });
  });

  function onReducedMotionChange() {
    if (reduced.matches) revealTargets.forEach(target => target.classList.add('is-visible'));
    queueRender();
  }

  buildNetwork();
  window.addEventListener('scroll', queueRender, { passive: true });
  window.addEventListener('resize', queueRender, { passive: true });
  if (typeof reduced.addEventListener === 'function') reduced.addEventListener('change', onReducedMotionChange);
  else if (typeof reduced.addListener === 'function') reduced.addListener(onReducedMotionChange);
  requestAnimationFrame(render);
})();
