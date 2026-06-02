

const Cart = {

  
  get() {
    return JSON.parse(localStorage.getItem('raisin_cart') || '[]');
  },

  save(items) {
    localStorage.setItem('raisin_cart', JSON.stringify(items));
    Cart.updateBadge();
  },

  
  add(name, price, img) {
    const items = Cart.get();
    const existing = items.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ name, price, img, qty: 1 });
    }
    Cart.save(items);
    Cart.showToast(name, img);
  },

  remove(name) {
    const items = Cart.get().filter(i => i.name !== name);
    Cart.save(items);
  },

  updateQty(name, delta) {
    const items = Cart.get();
    const item = items.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      Cart.save(items.filter(i => i.name !== name));
    } else {
      Cart.save(items);
    }
  },

  clear() {
    Cart.save([]);
  },

  total() {
    return Cart.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  count() {
    return Cart.get().reduce((sum, i) => sum + i.qty, 0);
  },

  
  updateBadge() {
    const count = Cart.count();
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
    // Also update the cart span text
    document.querySelectorAll('.cart-icon-wrap').forEach(el => {
      el.setAttribute('data-count', count > 0 ? count : '');
    });
  },

  // ─── Toast Notification ─────────────
  showToast(name, img) {
    // Remove existing toasts
    document.querySelectorAll('.raisin-toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'raisin-toast';
    toast.innerHTML = `
      <div class="toast-inner">
        <div class="toast-img-wrap">
          ${img ? `<img src="${img}" alt="">` : '<div class="toast-img-placeholder">🍰</div>'}
        </div>
        <div class="toast-text">
          <span class="toast-label">Added to cart!</span>
          <span class="toast-name">${name}</span>
        </div>
        <div class="toast-check">✓</div>
      </div>
      <div class="toast-progress"></div>
    `;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('toast-show');
      });
    });

    // Animate out
    setTimeout(() => toast.classList.add('toast-hide'), 2800);
    setTimeout(() => toast.remove(), 3400);
  }
};

// ─── Inject toast + badge styles ──────
(function injectStyles() {
  if (document.getElementById('raisin-cart-styles')) return;
  const style = document.createElement('style');
  style.id = 'raisin-cart-styles';
  style.textContent = `
    /* CART BADGE */
    .cart-icon-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .cart-badge {
      position: absolute;
      top: -8px;
      right: -10px;
      background: #e55a71;
      color: white;
      font-size: 11px;
      font-weight: 600;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
      line-height: 1;
      display: none;
    }

    /* TOAST */
    .raisin-toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
      width: 300px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18);
      overflow: hidden;
      transform: translateY(120px) scale(0.9);
      opacity: 0;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                  opacity 0.4s ease;
      border: 1px solid rgba(248, 200, 220, 0.5);
    }

    .raisin-toast.toast-show {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    .raisin-toast.toast-hide {
      transform: translateY(20px) scale(0.95);
      opacity: 0;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }

    .toast-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
    }

    .toast-img-wrap {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
      background: #ffeef2;
    }

    .toast-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .toast-img-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }

    .toast-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .toast-label {
      font-size: 11px;
      color: #e55a71;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-family: 'Poppins', sans-serif;
    }

    .toast-name {
      font-size: 14px;
      font-weight: 500;
      color: #3a2a26;
      font-family: 'Poppins', sans-serif;
      line-height: 1.3;
    }

    .toast-check {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f8c8dc, #e55a71);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      flex-shrink: 0;
      animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
    }

    @keyframes popIn {
      from { transform: scale(0); }
      to   { transform: scale(1); }
    }

    .toast-progress {
      height: 3px;
      background: linear-gradient(90deg, #f8c8dc, #e55a71);
      border-radius: 0 0 20px 20px;
      animation: progressBar 2.6s linear forwards;
      transform-origin: left;
    }

    @keyframes progressBar {
      from { transform: scaleX(1); }
      to   { transform: scaleX(0); }
    }

    /* ADD TO CART BUTTON PULSE */
    @keyframes cartPulse {
      0%   { box-shadow: 0 0 0 0 rgba(229,90,113,0.5); }
      70%  { box-shadow: 0 0 0 10px rgba(229,90,113,0); }
      100% { box-shadow: 0 0 0 0 rgba(229,90,113,0); }
    }
    .cart-pulse {
      animation: cartPulse 0.6s ease;
    }

    /* SCROLL REVEAL */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

// ─── Init on DOM ready ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();

  // Wrap all cart icons with badge
  document.querySelectorAll('.cart').forEach(cartIcon => {
    const parent = cartIcon.parentElement;
    if (!parent.classList.contains('cart-icon-wrap')) {
      const wrap = document.createElement('span');
      wrap.className = 'cart-icon-wrap';
      const badge = document.createElement('span');
      badge.className = 'cart-badge';
      parent.insertBefore(wrap, cartIcon);
      wrap.appendChild(cartIcon);
      wrap.appendChild(badge);
    }
  });

  Cart.updateBadge();

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
