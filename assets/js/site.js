(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  // Language
  const titles = { en: root.dataset.titleEn, es: root.dataset.titleEs };
  const langBtn = document.getElementById('lang-toggle');
  const paintLang = () => {
    langBtn.textContent = root.lang === 'en' ? 'ES' : 'EN';
    langBtn.setAttribute('aria-label', root.lang === 'en' ? 'Ver en español' : 'View in English');
    if (titles[root.lang]) document.title = titles[root.lang];
  };
  langBtn.addEventListener('click', () => {
    root.lang = root.lang === 'en' ? 'es' : 'en';
    store('site-lang', root.lang);
    paintLang();
    document.dispatchEvent(new Event('langchange'));
  });
  paintLang();

  // Calendly loads only when someone asks for it
  document.querySelectorAll('[data-calendly]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const open = () => window.Calendly ? Calendly.initPopupWidget({ url: a.href }) : window.open(a.href, '_blank', 'noopener');
    if (window.Calendly) return open();
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.append(css);
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.onload = open; s.onerror = open;
    document.head.append(s);
  }));

  // WebGL waves behind the page; the CSS background stays if they cannot load
  const script = src => new Promise((ok, no) => {
    const s = document.createElement('script');
    s.src = src; s.onload = ok; s.onerror = no;
    document.head.append(s);
  });
  if (!reduced && !navigator.connection?.saveData) addEventListener('load', async () => {
    try {
      await script('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
      await script('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js');
      VANTA.WAVES({ el: '#bg', THREE, mouseControls: true, touchControls: false, gyroControls: false, color: 0x0a1f2e, shininess: 28, waveHeight: 16, waveSpeed: .5, zoom: .9 });
    } catch (e) {}
  });

  // Typed role line
  const typed = document.querySelector('.typed');
  if (typed && !reduced) {
    const out = typed.querySelector('.typed-text');
    let timer;
    const type = () => {
      clearTimeout(timer);
      const text = typed.dataset[root.lang];
      let i = 0;
      const step = () => {
        out.textContent = text.slice(0, ++i);
        if (i < text.length) timer = setTimeout(step, 28);
      };
      step();
    };
    typed.setAttribute('aria-label', typed.dataset[root.lang]);
    type();
    document.addEventListener('langchange', () => {
      typed.setAttribute('aria-label', typed.dataset[root.lang]);
      type();
    });
  } else if (typed) {
    typed.classList.add('static');
  }

  // Project filters and "show more"
  const grid = document.getElementById('grid');
  if (grid) {
    const cards = [...grid.querySelectorAll('.card')];
    const more = document.getElementById('more');
    const privateHead = document.getElementById('private-head');
    if (reduced) grid.querySelectorAll('video').forEach(v => { v.autoplay = false; v.pause(); });
    const filters = document.querySelectorAll('[data-filter]');
    let filter = 'all', expanded = false;
    const paint = animate => {
      let shown = 0;
      cards.forEach(c => {
        const match = filter === 'all' || c.dataset.tags.split(' ').includes(filter);
        const show = match && (filter !== 'all' || expanded || !('extra' in c.dataset));
        c.hidden = !show;
        if (show && animate && !reduced) c.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 280, delay: shown++ * 35, easing: 'ease-out', fill: 'backwards' });
      });
      more.hidden = filter !== 'all' || expanded;
      privateHead.hidden = !cards.some(c => c.matches('.private:not(.lead)') && !c.hidden);
    };
    filters.forEach(b => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      filters.forEach(x => x.setAttribute('aria-pressed', x === b));
      paint(true);
    }));
    more.addEventListener('click', () => { expanded = true; paint(true); });
    paint(false);

    // Light that follows the pointer inside a card
    grid.addEventListener('pointermove', e => {
      const c = e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--x', e.clientX - r.left + 'px');
      c.style.setProperty('--y', e.clientY - r.top + 'px');
    });
  }

  // The sidebar scrolls away beneath the floating contact card instead of showing above it
  const contact = document.getElementById('contact');
  const rest = document.querySelector('.side-rest');
  if (contact && rest) {
    const wide = matchMedia('(min-width: 1001px)');
    const clip = () => {
      const hidden = contact.getBoundingClientRect().bottom + 16 - rest.getBoundingClientRect().top;
      rest.style.clipPath = wide.matches && hidden > 0 ? `inset(${hidden}px 0 0 0)` : '';
    };
    addEventListener('scroll', clip, { passive: true });
    addEventListener('resize', clip);
    clip();
    // Open jobs balance the two columns; on one column they only add length
    if (!wide.matches) document.querySelectorAll('.job[open]').forEach((j, i) => { if (i) j.open = false; });
  }

  // Stack chips appear in sequence, once
  const groups = document.querySelectorAll('.stack-group');
  if (groups.length && !reduced && 'IntersectionObserver' in window) {
    root.classList.add('anim');
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .2 });
    groups.forEach(g => {
      [...g.querySelectorAll('li')].forEach((li, i) => li.style.setProperty('--i', i));
      io.observe(g);
    });
  }

  // Current section in the nav
  const links = [...document.querySelectorAll('.nav a[href^="#"]')].filter(l => !document.querySelector(l.getAttribute('href'))?.closest('.side'));
  if (links.length) {
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.toggleAttribute('data-on', l.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(l => { const t = document.querySelector(l.getAttribute('href')); if (t) spy.observe(t); });
  }

  // Live GitHub stars; the numbers in the HTML remain if the request fails
  const starEls = document.querySelectorAll('[data-repo] b, [data-total] b');
  if (starEls.length) fetch('https://api.github.com/users/facundoallia/repos?per_page=100')
    .then(r => r.ok ? r.json() : [])
    .then(repos => {
      if (!repos.length) return;
      const by = Object.fromEntries(repos.map(r => [r.name, r.stargazers_count]));
      document.querySelectorAll('[data-repo]').forEach(a => {
        if (by[a.dataset.repo] != null) a.querySelector('b').textContent = by[a.dataset.repo];
      });
      const total = document.querySelector('[data-total] b');
      if (total) total.textContent = repos.reduce((s, r) => s + r.stargazers_count, 0);
    }).catch(() => {});
})();
