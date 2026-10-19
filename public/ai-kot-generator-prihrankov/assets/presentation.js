(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 761px)');
  const chapters = [...document.querySelectorAll('.chapter')];
  const progressLinks = [...document.querySelectorAll('.section-progress a')];
  const clamp = value => Math.max(0, Math.min(1, value));

  // The document is complete without scripting. This class is added only after
  // interactive panels and observers have been wired.
  document.querySelectorAll('[data-steps]').forEach(group => {
    const tabs = [...group.querySelectorAll('.steps-nav [role="tab"]')];
    const panels = tabs.map(tab => group.querySelector(`#${CSS.escape(tab.getAttribute('aria-controls'))}`));
    const show = (index, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[tabIndex].hidden = !active;
      });
      if (moveFocus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => show(index));
      tab.addEventListener('keydown', event => {
        let next = null;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        event.preventDefault();
        show(next, true);
      });
    });
    show(0);
  });
  root.classList.add('js-enabled');

  // Split kinetic headings while preserving explicit line breaks and text copy.
  document.querySelectorAll('[data-kinetic]').forEach(element => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let wordIndex = 0;
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part || /^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }
        const mask = document.createElement('span');
        const word = document.createElement('span');
        mask.className = 'kinetic-word';
        word.textContent = part;
        word.style.transitionDelay = `${Math.min(wordIndex * 55, 440)}ms`;
        mask.append(word);
        fragment.append(mask);
        wordIndex += 1;
      });
      node.replaceWith(fragment);
    });
  });

  const revealTargets = [...document.querySelectorAll('[data-reveal],[data-direction],[data-stagger],[data-kinetic]')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  }
  root.classList.add('motion-ready');

  // Counter blooms are limited to figures already present in the source copy.
  const counters = [...document.querySelectorAll('[data-count]')];
  const formatCounter = (element, value) => {
    if (element.dataset.format === 'sl') return new Intl.NumberFormat('sl-SI').format(value);
    return String(value);
  };
  const runCounter = element => {
    const target = Number(element.dataset.count || element.textContent.replace(/\D/g, ''));
    if (reduced.matches) {
      element.textContent = formatCounter(element, target);
      return;
    }
    const started = performance.now();
    const duration = 1100;
    const tick = now => {
      const p = clamp((now - started) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      element.textContent = formatCounter(element, Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.55 });
    counters.forEach(counter => countObserver.observe(counter));
  } else {
    counters.forEach(runCounter);
  }

  // Active chapter is reflected in the compact rail and in the document title.
  let activeIndex = -1;
  const activate = index => {
    if (index === activeIndex) return;
    activeIndex = index;
    progressLinks.forEach((link, linkIndex) => {
      const active = linkIndex === index;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    const title = chapters[index]?.dataset.title;
    document.title = index === 0 ? 'AI kot generator prihrankov | AI Sistemi' : `${title} | AI Sistemi`;
  };
  const chapterObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) activate(chapters.indexOf(visible.target));
  }, { threshold: [0.15, 0.35, 0.65], rootMargin: '-18% 0px -38% 0px' });
  chapters.forEach(chapter => chapterObserver.observe(chapter));
  activate(0);

  // Hero depth, the dossier convergence and process travel share one rAF read.
  const hero = document.querySelector('.cover');
  const heroSpace = document.querySelector('.hero-space');
  const heroPieces = heroSpace ? [...heroSpace.querySelectorAll('.hero-glass,.hero-core')] : [];
  const convergence = document.querySelector('.convergence');
  const processWindows = [...document.querySelectorAll('.flow-window')];
  let pointerX = 0;
  let pointerY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;

  const configureMotion = () => {
    root.classList.toggle('motion-ok', wide.matches && !reduced.matches);
    queueFrame();
  };
  const renderMotion = () => {
    frame = 0;
    const readingLine = innerHeight * .42;
    const chapterIndex = chapters.findIndex(chapter => {
      const box = chapter.getBoundingClientRect();
      return box.top <= readingLine && box.bottom > readingLine;
    });
    if (chapterIndex >= 0) activate(chapterIndex);
    currentX += (pointerX - currentX) * 0.11;
    currentY += (pointerY - currentY) * 0.11;
    if (hero && heroSpace && wide.matches && !reduced.matches) {
      const rect = hero.getBoundingClientRect();
      const scrollProgress = clamp(-rect.top / Math.max(rect.height * 0.72, 1));
      const factors = [1, .55, .8, .3];
      heroPieces.forEach((piece, index) => {
        const depth = factors[index] || .5;
        piece.style.setProperty('--px', `${(currentX * depth * 22 * (1 - scrollProgress)).toFixed(2)}px`);
        piece.style.setProperty('--py', `${(currentY * depth * 16 - scrollProgress * depth * 34).toFixed(2)}px`);
      });
    }
    if (convergence && root.classList.contains('motion-ok')) {
      const rect = convergence.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height - innerHeight, 1));
      const gather = clamp((progress - .06) / .68);
      convergence.style.setProperty('--g', String(gather * gather * (3 - 2 * gather)));
    } else if (convergence) {
      convergence.style.setProperty('--g', '1');
    }
    processWindows.forEach(windowElement => {
      const rail = windowElement.querySelector('[data-process-pan]');
      if (!rail || !wide.matches || reduced.matches) {
        if (rail) rail.style.transform = 'none';
        return;
      }
      const rect = windowElement.getBoundingClientRect();
      const progress = clamp((innerHeight - rect.top) / Math.max(innerHeight + rect.height, 1));
      const over = Math.max(rail.scrollWidth - windowElement.clientWidth, 0);
      rail.style.transform = `translate3d(${(-over * progress).toFixed(2)}px,0,0)`;
    });
    if (Math.abs(pointerX - currentX) > .002 || Math.abs(pointerY - currentY) > .002) queueFrame();
  };
  const queueFrame = () => {
    if (!frame) frame = requestAnimationFrame(renderMotion);
  };
  if (hero) {
    hero.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX / innerWidth * 2 - 1;
      pointerY = event.clientY / innerHeight * 2 - 1;
      queueFrame();
    });
    hero.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
      queueFrame();
    });
  }
  addEventListener('scroll', queueFrame, { passive: true });
  addEventListener('resize', configureMotion, { passive: true });
  reduced.addEventListener('change', configureMotion);
  wide.addEventListener('change', configureMotion);
  configureMotion();

  // Scrollcraft supplies the shared pointer material and progress runtime.
  if (window.ScrollCraft) window.ScrollCraft.mount(document);

  // Print expands every source document and every tab panel, then restores state.
  let printState = null;
  const expandForPrint = () => {
    if (printState) return;
    printState = {
      details: [...document.querySelectorAll('details')].map(detail => [detail, detail.open]),
      panels: [...document.querySelectorAll('.steps-panel')].map(panel => [panel, panel.hidden])
    };
    printState.details.forEach(([detail]) => { detail.open = true; });
    printState.panels.forEach(([panel]) => { panel.hidden = false; });
  };
  const restoreAfterPrint = () => {
    if (!printState) return;
    printState.details.forEach(([detail, open]) => { detail.open = open; });
    printState.panels.forEach(([panel, hidden]) => { panel.hidden = hidden; });
    printState = null;
  };
  addEventListener('beforeprint', expandForPrint);
  addEventListener('afterprint', restoreAfterPrint);
  document.getElementById('print-page')?.addEventListener('click', () => {
    expandForPrint();
    print();
    setTimeout(restoreAfterPrint, 500);
  });
})();
