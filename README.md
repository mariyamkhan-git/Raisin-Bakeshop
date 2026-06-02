# 🍰 RAISIN Bakeshop

A multi-page front-end website for **RAISIN Bakeshop** — a luxury artisan bakery founded by Mariyam Raisin. Built with vanilla HTML, CSS, and JavaScript, the site offers a full online shopping experience including a menu, cart, custom cake orders, loyalty program, and more.

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero section, signature items, and brand philosophy |
| `menu.html` | Full product catalog with category filters (Cakes, Cookies, Sundaes) |
| `cart.html` | Shopping cart with quantity controls, order summary, and checkout modal |
| `custom.html` | Custom cake order form with live price calculator |
| `loyalty.html` | Loyalty program overview with points & rewards info |
| `login.html` | Login page for returning customers |
| `signup.html` | Account creation for new customers |
| `about.html` | Brand story, customer testimonials, FAQ, and contact form |

---

## ✨ Features

- **Product Catalog** — Browse 30+ items across Cakes, Cookies, and Sundaes with category filtering
- **Shopping Cart** — Add/remove items, adjust quantities, live subtotal and tax calculation (10%), animated transitions
- **Custom Cake Builder** — Select size, flavor, and frosting with a real-time price breakdown
- **Loyalty Program** — Points system (1 pt per RS 100 spent), unlockable discount rewards
- **Contact Form** — Message submission with success feedback on the About page
- **Floating Particles** — Animated hero background on the homepage
- **Scroll Reveal Animations** — Elements animate into view as the user scrolls
- **Responsive Navigation** — Consistent header with cart icon across all pages

---

## 🗂️ Project Structure

```
raisin-bakeshop/
├── index.html
├── menu.html
├── cart.html
├── custom.html
├── loyalty.html
├── login.html
├── signup.html
├── about.html
├── css/
│   ├── style.css        # Homepage styles
│   ├── menu.css
│   ├── cart.css
│   ├── custom.css
│   ├── loyalty.css      # Shared by loyalty, login, signup
│   └── about.css
├── js/
│   └── cart.js          # Shared cart logic (Cart.add, remove, update, total)
└── images/
    ├── logo new.png
    ├── mariyam raisin.jpeg
    ├── dreamcake.png
    ├── raisin shelf.png
    └── [product images...]
```

---

## 🛒 Cart System

The shared `js/cart.js` module exposes a `Cart` object used across all pages:

```js
Cart.add(name, price, img)   // Add item or increment quantity
Cart.remove(name)            // Remove item entirely
Cart.updateQty(name, delta)  // Change quantity by delta (+1 / -1)
Cart.clear()                 // Empty the cart
Cart.get()                   // Returns array of cart items
Cart.total()                 // Returns subtotal (before tax)
Cart.count()                 // Returns total item count
```

---

## 🎂 Custom Order Pricing

Custom cakes are priced by combining three selections:

| Component | Options | Price Range |
|-----------|---------|-------------|
| **Size** | 6" / 8" / 10" / 12" | RS 5,000 – RS 27,500 |
| **Flavor** | Vanilla, Chocolate, Red Velvet, Matcha, and more | RS 4,000 – RS 8,000 |
| **Frosting** | Buttercream, Cream Cheese, Ganache, Fondant | RS 2,500 – RS 8,000 


## 🛠️ Tech Stack

- **HTML5** — Semantic markup across all pages
- **CSS3** — Custom properties, flexbox, grid, keyframe animations
- **Vanilla JavaScript** — No frameworks or libraries

---

## 📍 Contact (Fictional)

- **Location:** 15-S Phase 5 DHA
- **Phone:** +92 300 1234567
- **Email:** hello@raisinbakeshop.com

---

*Made with 💗 by Mariyam*
