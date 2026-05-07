/* =============================================================
   ZEIGERWERKE — site interactions
   ============================================================= */

(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-open');
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuToggle.classList.remove('is-open');
        nav.classList.remove('is-open');
      });
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .split-reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Split text into word-spans for headline reveal ---------- */
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = text.split(/\s+/).map((w, i) =>
      `<span class="word"><span style="--i:${i}">${w}</span></span>`
    ).join(' ');
  });

  /* ---------- Live time stamp ---------- */
  const stamp = document.querySelector('[data-live-time]');
  if (stamp) {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      stamp.textContent = `${h}:${m}`;
    };
    update();
    setInterval(update, 30000);
  }

  /* ---------- Cart store (in-memory) ---------- */
  const cart = {
    items: [],
    add(p) {
      const existing = this.items.find(i => i.ref === p.ref);
      if (existing) existing.qty += 1;
      else this.items.push({ ...p, qty: 1 });
      this.render();
      flash(`${p.name} hinzugefügt`);
    },
    remove(ref) {
      this.items = this.items.filter(i => i.ref !== ref);
      this.render();
    },
    total() {
      return this.items.reduce((s, i) => s + (i.priceNum || 0) * i.qty, 0);
    },
    count() {
      return this.items.reduce((s, i) => s + i.qty, 0);
    },
    render() {
      const list = document.querySelector('.cart-body');
      const totalEl = document.querySelector('[data-cart-total]');
      const countEl = document.querySelector('[data-cart-count]');
      if (countEl) {
        countEl.textContent = this.count();
        countEl.style.display = this.count() > 0 ? 'inline-block' : 'none';
      }
      if (!list) return;
      if (this.items.length === 0) {
        list.innerHTML = '<div class="cart-empty">Ihre Auswahl ist noch leer.<br><br>Entdecken Sie unsere Kollektion.</div>';
      } else {
        list.innerHTML = this.items.map(i => `
          <div class="cart-item">
            <div class="img"><img src="${i.image}" alt="${i.name}"></div>
            <div>
              <div class="ref">Réf. ${i.ref}</div>
              <h4 class="name">${i.name}</h4>
              <div class="price">€ ${i.priceNum.toLocaleString('de-DE')}</div>
            </div>
            <button class="remove" data-remove="${i.ref}">Entfernen</button>
          </div>
        `).join('');
        list.querySelectorAll('[data-remove]').forEach(btn => {
          btn.addEventListener('click', () => this.remove(btn.dataset.remove));
        });
      }
      if (totalEl) totalEl.textContent = '€ ' + this.total().toLocaleString('de-DE');
    }
  };

  /* ---------- Cart UI ---------- */
  const cartTrigger = document.querySelectorAll('[data-cart-open]');
  const cartClose = document.querySelectorAll('[data-cart-close]');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');
  const openCart = () => {
    cartDrawer && cartDrawer.classList.add('is-open');
    cartOverlay && cartOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeCart = () => {
    cartDrawer && cartDrawer.classList.remove('is-open');
    cartOverlay && cartOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  cartTrigger.forEach(b => b.addEventListener('click', openCart));
  cartClose.forEach(b => b.addEventListener('click', closeCart));

  /* ---------- Add-to-cart buttons (data attributes drive content) ---------- */
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('[data-product]') || btn;
      const p = {
        ref: card.dataset.ref || btn.dataset.ref,
        name: card.dataset.name || btn.dataset.name,
        priceNum: parseInt(card.dataset.price || btn.dataset.price, 10),
        image: card.dataset.image || btn.dataset.image
      };
      cart.add(p);
    });
  });

  /* ---------- Toast ---------- */
  function flash(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('is-shown'));
    clearTimeout(flash._h);
    flash._h = setTimeout(() => t.classList.remove('is-shown'), 2400);
  }

  /* ---------- Filter chips on shop page ---------- */
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-collection]');
  if (chips.length && cards.length) {
    chips.forEach(c => {
      c.addEventListener('click', () => {
        chips.forEach(x => x.classList.remove('is-active'));
        c.classList.add('is-active');
        const f = c.dataset.filter;
        cards.forEach(card => {
          const tags = (card.dataset.collection || '').split(' ');
          card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
        });
      });
    });

    /* Pre-filter from URL: kollektion.html?f=heritage */
    const params = new URLSearchParams(window.location.search);
    const initial = params.get('f');
    if (initial) {
      const target = Array.from(chips).find(c => c.dataset.filter === initial);
      if (target) target.click();
    }
  }

  /* ---------- Sort on shop page ---------- */
  const sortSel = document.querySelector('[data-sort]');
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      const grid = document.querySelector('[data-products-grid]');
      if (!grid) return;
      const items = Array.from(grid.children);
      const v = sortSel.value;
      items.sort((a, b) => {
        const pa = parseInt(a.dataset.price || 0, 10);
        const pb = parseInt(b.dataset.price || 0, 10);
        if (v === 'price-asc') return pa - pb;
        if (v === 'price-desc') return pb - pa;
        if (v === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return 0;
      });
      items.forEach(it => grid.appendChild(it));
    });
  }

  /* ---------- Thumb gallery on detail page ---------- */
  const thumbs = document.querySelectorAll('.thumb');
  const main = document.querySelector('.detail-main img');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('is-active'));
      t.classList.add('is-active');
      const src = t.querySelector('img').src;
      if (main) main.src = src;
    });
  });

  /* ---------- Form pretend-submit ---------- */
  document.querySelectorAll('[data-fake-submit]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.dataset.fakeSubmitMessage || 'Vielen Dank — wir melden uns persönlich.';
      flash(msg);
      form.reset();
      // Reset upload label too
      const upLabel = form.querySelector('.upload-label strong');
      if (upLabel && upLabel.dataset.original) upLabel.textContent = upLabel.dataset.original;
      // Scroll up so the user sees the toast and feels acknowledged
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    });
  });

  /* ---------- File upload visual feedback ---------- */
  document.querySelectorAll('.upload-zone input[type="file"]').forEach(inp => {
    const label = inp.parentElement.querySelector('.upload-label strong');
    if (label) label.dataset.original = label.textContent;
    inp.addEventListener('change', () => {
      if (!label) return;
      const n = inp.files.length;
      if (n === 0) { label.textContent = label.dataset.original; return; }
      label.textContent = n === 1 ? '1 Foto ausgewählt ✓' : `${n} Fotos ausgewählt ✓`;
    });
  });

  /* ---------- Newsletter form ---------- */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      flash('Eingetragen. Vielen Dank!');
      form.reset();
    });
  });
})();
