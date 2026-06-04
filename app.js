/* ============================================
   TEZTAR SERVICES — APP JAVASCRIPT
   ============================================ */

// ===== STATE =====
let currentUser = JSON.parse(localStorage.getItem('teztar_user')) || null;
let cart = JSON.parse(localStorage.getItem('teztar_cart')) || [];
let orders = JSON.parse(localStorage.getItem('teztar_orders')) || [];

// ===== PRODUCTS DATA =====
const products = [
  { id:1, name:'Basmati Rice 5kg', cat:'groceries', emoji:'🌾', price:1250, oldPrice:1500, rating:4.5, reviews:128, desc:'Premium quality long-grain basmati rice, fragrant and fluffy.', badge:'Sale' },
  { id:2, name:'Fresh Milk 1L', cat:'groceries', emoji:'🥛', price:180, oldPrice:null, rating:4.8, reviews:245, desc:'Fresh farm milk, pasteurized and packed daily.', badge:'Fresh' },
  { id:3, name:'Chicken Breast 1kg', cat:'food', emoji:'🍗', price:520, oldPrice:600, rating:4.6, reviews:89, desc:'Fresh boneless chicken breast, cleaned and ready to cook.', badge:'Sale' },
  { id:4, name:'Panadol 20 Tablets', cat:'medicine', emoji:'💊', price:95, oldPrice:null, rating:4.9, reviews:567, desc:'Paracetamol 500mg tablets for pain and fever relief.', badge:'Genuine' },
  { id:5, name:'Augmentin 625mg', cat:'medicine', emoji:'💉', price:450, oldPrice:null, rating:4.7, reviews:234, desc:'Amoxicillin/Clavulanate antibiotic. Prescription required.', badge:'Rx' },
  { id:6, name:'Samsung Galaxy A54', cat:'electronics', emoji:'📱', price:72000, oldPrice:85000, rating:4.4, reviews:156, desc:'6.4" AMOLED display, 50MP camera, 5000mAh battery.', badge:'Sale' },
  { id:7, name:'JBL Headphones', cat:'electronics', emoji:'🎧', price:8500, oldPrice:12000, rating:4.6, reviews:92, desc:'Wireless over-ear headphones with 40hr battery life.', badge:'Sale' },
  { id:8, name:'Men\'s Shalwar Kameez', cat:'fashion', emoji:'👘', price:2800, oldPrice:3500, rating:4.3, reviews:178, desc:'Premium lawn fabric, stitched, multiple sizes available.', badge:'New' },
  { id:9, name:'Women\'s Lawn Suit', cat:'fashion', emoji:'👗', price:3200, oldPrice:4000, rating:4.7, reviews:312, desc:'2-piece lawn suit with embroidered dupatta.', badge:'New' },
  { id:10, name:'Sofa Set 5-Seater', cat:'home', emoji:'🛋️', price:45000, oldPrice:55000, rating:4.2, reviews:45, desc:'Luxury velvet sofa set with wooden frame.', badge:'Sale' },
  { id:11, name:'Organic Shampoo', cat:'beauty', emoji:'🧴', price:650, oldPrice:800, rating:4.5, reviews:203, desc:'Sulfate-free shampoo with natural argan oil extracts.', badge:'Organic' },
  { id:12, name:'Face Cream SPF50', cat:'beauty', emoji:'🧖', price:1200, oldPrice:null, rating:4.8, reviews:421, desc:'Daily moisturizer with SPF50 sun protection for all skin types.', badge:'New' },
  { id:13, name:'Dettol Sanitizer 500ml', cat:'essentials', emoji:'🧹', price:320, oldPrice:380, rating:4.6, reviews:634, desc:'70% alcohol hand sanitizer, kills 99.9% of germs.', badge:'Essential' },
  { id:14, name:'Sunsilk Shampoo 400ml', cat:'beauty', emoji:'💆', price:380, oldPrice:null, rating:4.4, reviews:189, desc:'Hair fall solution shampoo with Biotin formula.', badge:null },
  { id:15, name:'Organic Honey 500g', cat:'groceries', emoji:'🍯', price:890, oldPrice:1100, rating:4.9, reviews:378, desc:'Pure Sidr honey from the hills of KPK, tested authentic.', badge:'Pure' },
  { id:16, name:'Laptop Stand', cat:'home', emoji:'💻', price:2500, oldPrice:3200, rating:4.5, reviews:87, desc:'Adjustable aluminum laptop stand for desk ergonomics.', badge:'Sale' },
  { id:17, name:'Energy Drink Pack', cat:'food', emoji:'🥤', price:720, oldPrice:null, rating:4.1, reviews:234, desc:'Pack of 6 energy drinks, various flavors.', badge:null },
  { id:18, name:'Vitamin C 1000mg', cat:'medicine', emoji:'🟠', price:750, oldPrice:900, rating:4.8, reviews:523, desc:'Effervescent vitamin C tablets, immune system support.', badge:'Sale' },
  { id:19, name:'Cooking Oil 5L', cat:'groceries', emoji:'🫙', price:1850, oldPrice:2200, rating:4.5, reviews:445, desc:'Premium sunflower cooking oil, cholesterol-free.', badge:'Sale' },
  { id:20, name:'Kids T-Shirt Pack', cat:'fashion', emoji:'👕', price:950, oldPrice:null, rating:4.6, reviews:167, desc:'Pack of 3 colorful cotton t-shirts for kids (2-10 years).', badge:'New' },
];

// ===== NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  closeMobileMenu();
  if (page === 'shop') renderShopProducts();
  if (page === 'cart') renderCart();
  if (page === 'home') renderHomeFeatured();
  if (page === 'dashboard') renderDashboard();
  if (page === 'orders') renderOrders();
}

// ===== SCROLL NAVBAR =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  links.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  setTimeout(() => { t.className = 'toast'; }, 3200);
}

// ===== MODALS =====
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function closeModalOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}
function switchModal(from, to) { closeModal(from); setTimeout(() => openModal(to), 200); }

// ===== PASSWORD TOGGLE =====
function togglePass(id, icon) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ===== USER DROPDOWN =====
function toggleUserDropdown() {
  document.getElementById('userDropdown').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#userMenu')) {
    const dd = document.getElementById('userDropdown');
    if (dd) dd.classList.remove('open');
  }
});

// ===== AUTH =====
function login(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  const users = JSON.parse(localStorage.getItem('teztar_users') || '[]');
  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) {
    // Demo: allow any login if no registered users
    if (users.length === 0) {
      const demoUser = { name: 'Demo User', email, firstName: 'Demo', lastName: 'User', phone: '+92 300 0000000', type: 'customer' };
      setUser(demoUser);
      closeModal('loginModal');
      showToast('Welcome back! You are logged in. 👋');
      showPage('dashboard');
      return;
    }
    showToast('Invalid email or password', 'error'); return;
  }
  setUser(user);
  closeModal('loginModal');
  showToast('Welcome back, ' + user.firstName + '! 👋');
  showPage('dashboard');
}

function signup(e) {
  e.preventDefault();
  const fName = document.getElementById('signupFName').value.trim();
  const lName = document.getElementById('signupLName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const pass = document.getElementById('signupPass').value;
  const type = document.getElementById('signupType').value;
  if (pass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
  const users = JSON.parse(localStorage.getItem('teztar_users') || '[]');
  if (users.find(u => u.email === email)) { showToast('Email already registered', 'error'); return; }
  const newUser = { firstName: fName, lastName: lName, name: fName + ' ' + lName, email, phone, type, password: pass };
  users.push(newUser);
  localStorage.setItem('teztar_users', JSON.stringify(users));
  setUser(newUser);
  closeModal('signupModal');
  showToast('Account created! Welcome to Teztar 🎉');
  showPage('dashboard');
}

function googleLogin() {
  const demoUser = { name: 'Google User', email: 'user@gmail.com', firstName: 'Google', lastName: 'User', type: 'customer' };
  setUser(demoUser);
  closeModal('loginModal');
  closeModal('signupModal');
  showToast('Logged in with Google 👋');
  showPage('dashboard');
}

function setUser(user) {
  currentUser = user;
  localStorage.setItem('teztar_user', JSON.stringify(user));
  updateAuthUI();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('teztar_user');
  updateAuthUI();
  showPage('home');
  showToast('You have been logged out');
}

function updateAuthUI() {
  const authBtns = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  if (currentUser) {
    authBtns.style.display = 'none';
    userMenu.style.display = 'block';
    const initials = (currentUser.firstName || currentUser.name || 'U')[0].toUpperCase();
    document.getElementById('userInitials').textContent = initials;
    document.getElementById('dropdownName').textContent = currentUser.name || currentUser.firstName;
    document.getElementById('dropdownEmail').textContent = currentUser.email || '';
  } else {
    authBtns.style.display = 'flex';
    userMenu.style.display = 'none';
  }
}

function showProfile() {
  if (!currentUser) return;
  showToast('Profile: ' + (currentUser.name || currentUser.firstName));
}

// ===== PRODUCTS =====
function getStars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += i <= Math.floor(rating) ? '★' : (i - rating < 1 ? '½' : '☆');
  }
  return s;
}

function productCardHTML(p) {
  const badgeHTML = p.badge ? `<div class="product-badge ${p.badge === 'New' ? 'new' : ''}">${p.badge}</div>` : '';
  const oldPriceHTML = p.oldPrice ? `<span class="product-old-price">PKR ${p.oldPrice.toLocaleString()}</span>` : '';
  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-img" style="background:${getCatColor(p.cat)}">
        ${badgeHTML}
        <span>${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc.substring(0, 60)}...</div>
        <div class="product-rating">${getStars(p.rating)} <span>(${p.reviews})</span></div>
        <div class="product-footer">
          <div><span class="product-price">PKR ${p.price.toLocaleString()}</span>${oldPriceHTML}</div>
          <button class="btn-add-cart" onclick="event.stopPropagation();addToCart(${p.id})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function getCatColor(cat) {
  const colors = { groceries:'#e8f5e9', medicine:'#e3f2fd', electronics:'#fff3e0', fashion:'#fce4ec', home:'#f3e5f5', beauty:'#e8eaf6', food:'#e0f2f1', essentials:'#fafafa' };
  return colors[cat] || '#f5f5f5';
}

function renderHomeFeatured() {
  const featured = products.sort(() => 0.5 - Math.random()).slice(0, 8);
  document.getElementById('homeFeatured').innerHTML = featured.map(productCardHTML).join('');
}

function renderShopProducts() {
  applyFilters();
}

let currentCategory = 'all';
function filterCategory(cat) {
  currentCategory = cat;
  const radios = document.querySelectorAll('input[name="cat"]');
  radios.forEach(r => { if (r.value === cat) r.checked = true; });
  applyFilters();
}

function applyFilters() {
  const cat = document.querySelector('input[name="cat"]:checked')?.value || 'all';
  const search = document.getElementById('shopSearch')?.value.toLowerCase() || '';
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 50000);
  const fourStar = document.getElementById('filter4star')?.checked;
  const sort = document.getElementById('sortSelect')?.value || 'default';

  let filtered = products.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search) && !p.cat.toLowerCase().includes(search)) return false;
    if (p.price > maxPrice) return false;
    if (fourStar && p.rating < 4) return false;
    return true;
  });

  if (sort === 'price-low') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating);

  const container = document.getElementById('shopProducts');
  if (container) {
    container.innerHTML = filtered.length ? filtered.map(productCardHTML).join('') : '<div style="text-align:center;padding:3rem;color:#6B7280;font-size:15px;"><i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:1rem;opacity:0.3"></i>No products found</div>';
  }
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = filtered.length;
}

function updatePriceLabel(val) {
  const el = document.getElementById('priceLabel');
  if (el) el.textContent = parseInt(val).toLocaleString();
}

function resetFilters() {
  document.querySelectorAll('input[name="cat"]').forEach((r, i) => r.checked = i === 0);
  const pr = document.getElementById('priceRange');
  if (pr) { pr.value = 50000; updatePriceLabel(50000); }
  const fs = document.getElementById('filter4star');
  if (fs) fs.checked = false;
  const ss = document.getElementById('shopSearch');
  if (ss) ss.value = '';
  const so = document.getElementById('sortSelect');
  if (so) so.value = 'default';
  applyFilters();
}

// ===== PRODUCT DETAIL =====
function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const content = document.getElementById('productModalContent');
  content.innerHTML = `
    <button class="modal-close" onclick="closeModal('productModal')"><i class="fas fa-times"></i></button>
    <div class="product-modal-content">
      <div class="product-modal-img" style="background:${getCatColor(p.cat)}">${p.emoji}</div>
      <div class="product-modal-info">
        <div class="product-cat">${p.cat}</div>
        <h2>${p.name}</h2>
        <div class="product-rating">${getStars(p.rating)} <span style="color:#6B7280;font-size:13px">${p.rating} (${p.reviews} reviews)</span></div>
        <p>${p.desc}</p>
        <div class="product-modal-price">PKR ${p.price.toLocaleString()} ${p.oldPrice ? `<span style="font-size:16px;color:#9CA3AF;text-decoration:line-through;font-weight:400">PKR ${p.oldPrice.toLocaleString()}</span>` : ''}</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn-primary" onclick="addToCart(${p.id});closeModal('productModal')"><i class="fas fa-cart-plus"></i> Add to Cart</button>
          <button class="btn-amber" onclick="addToCart(${p.id});closeModal('productModal');showPage('cart')"><i class="fas fa-bolt"></i> Buy Now</button>
        </div>
        <div style="margin-top:1rem;padding:10px 14px;background:#f0faf5;border-radius:8px;font-size:12px;color:#0F6E56;display:flex;align-items:center;gap:8px">
          <i class="fas fa-shield-alt"></i> 100% genuine product — verified by Teztar
        </div>
      </div>
    </div>
  `;
  openModal('productModal');
}

// ===== CART =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, cat: p.cat, qty: 1 });
  }
  saveCart();
  showToast(`${p.name} added to cart 🛒`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('teztar_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  document.getElementById('cartBadge').style.display = total > 0 ? 'flex' : 'none';
  const dashCount = document.getElementById('dashCartCount');
  if (dashCount) dashCount.textContent = total + ' items';
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <h3 style="margin-bottom:8px;color:#374151">Your cart is empty</h3>
        <p style="margin-bottom:1.5rem">Add some products to get started</p>
        <button class="btn-primary" onclick="showPage('shop')"><i class="fas fa-store"></i> Browse Products</button>
      </div>`;
    updateCartTotals();
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img" style="background:${getCatColor(item.cat)}">${item.emoji}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>PKR ${item.price.toLocaleString()} each</p>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="updateQty(${item.id},-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id},1)">+</button>
      </div>
      <div class="cart-item-price">PKR ${(item.price * item.qty).toLocaleString()}</div>
      <button class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + 99 + tax;
  const s = (n) => 'PKR ' + n.toLocaleString();
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cartSubtotal', s(subtotal));
  set('cartTax', s(tax));
  set('cartTotal', s(total));
}

function checkout() {
  if (!currentUser) {
    showToast('Please login to checkout', 'error');
    openModal('loginModal');
    return;
  }
  if (cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }
  renderCheckoutSummary();
  openModal('checkoutModal');
  const nameEl = document.getElementById('co-name');
  if (nameEl && currentUser) nameEl.value = currentUser.name || '';
  const phoneEl = document.getElementById('co-phone');
  if (phoneEl && currentUser) phoneEl.value = currentUser.phone || '';
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItems');
  if (!container) return;
  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.emoji} ${item.name} ×${item.qty}</span>
      <span>PKR ${(item.price * item.qty).toLocaleString()}</span>
    </div>
  `).join('');
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const total = subtotal + 99 + Math.round(subtotal * 0.05);
  const el = document.getElementById('checkoutTotal');
  if (el) el.textContent = 'PKR ' + total.toLocaleString();
}

function placeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('co-name').value;
  const phone = document.getElementById('co-phone').value;
  const address = document.getElementById('co-address').value;
  const city = document.getElementById('co-city').value;
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const total = subtotal + 99 + Math.round(subtotal * 0.05);
  const order = {
    id: 'TZ' + Date.now(),
    items: [...cart],
    total,
    name, phone, address, city, payment,
    date: new Date().toLocaleDateString('en-PK'),
    status: 'processing'
  };
  orders.unshift(order);
  localStorage.setItem('teztar_orders', JSON.stringify(orders));
  cart = [];
  saveCart();
  closeModal('checkoutModal');
  showToast('Order placed successfully! 🎉 Order ID: ' + order.id);
  showPage('orders');
}

// ===== DASHBOARD =====
function renderDashboard() {
  if (currentUser) {
    const greeting = document.getElementById('dashboardGreeting');
    if (greeting) greeting.textContent = 'Welcome back, ' + (currentUser.firstName || currentUser.name) + '!';
  }
  updateCartBadge();
  const container = document.getElementById('recentOrders');
  if (!container) return;
  const recent = orders.slice(0, 3);
  container.innerHTML = recent.length ? recent.map(orderCardHTML).join('') :
    '<div style="text-align:center;padding:2rem;color:#9CA3AF"><i class="fas fa-box" style="font-size:36px;display:block;margin-bottom:8px;opacity:0.3"></i>No orders yet</div>';
}

function renderOrders() {
  const container = document.getElementById('ordersList');
  if (!container) return;
  container.innerHTML = orders.length ? orders.map(orderCardHTML).join('') :
    `<div style="text-align:center;padding:4rem;color:#6B7280">
      <i class="fas fa-box" style="font-size:64px;display:block;margin-bottom:1rem;opacity:0.2"></i>
      <h3 style="margin-bottom:8px">No orders yet</h3>
      <p style="margin-bottom:1.5rem">Start shopping to see your orders here</p>
      <button class="btn-primary" onclick="showPage('shop')"><i class="fas fa-store"></i> Shop Now</button>
    </div>`;
}

function orderCardHTML(o) {
  const statusMap = { processing: 'processing', shipped: 'shipped', delivered: 'delivered' };
  const st = statusMap[o.status] || 'processing';
  const statusLabels = { processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered' };
  return `
    <div class="order-card">
      <div>
        <div class="order-id">#${o.id}</div>
        <div class="order-date">${o.date}</div>
        <div style="font-size:12px;color:#6B7280;margin-top:4px">${o.items.length} item(s) • ${o.city || ''}</div>
      </div>
      <span class="order-status ${st}">${statusLabels[o.status] || 'Processing'}</span>
      <div class="order-total">PKR ${o.total.toLocaleString()}</div>
    </div>
  `;
}

// ===== MERCHANT FORM =====
function submitMerchant(e) {
  e.preventDefault();
  closeModal('merchantModal');
  showToast('Application submitted! Our team will contact you within 24 hours. 📧');
}

// ===== DRIVER FORM =====
function submitDriver(e) {
  e.preventDefault();
  closeModal('driverModal');
  showToast('Driver application submitted! Welcome to the Teztar team. 🏍️');
}

// ===== OVERSEAS FORM =====
function submitOverseas(e) {
  e.preventDefault();
  closeModal('overseasModal');
  showToast('Overseas order request submitted! We\'ll confirm via WhatsApp shortly. 🌍');
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Message sent! We\'ll reply within 2 hours. 📨');
}

// ===== INIT =====
function init() {
  updateAuthUI();
  updateCartBadge();
  renderHomeFeatured();
  showPage('home');
}

init();
