const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// CORS: allow a specific origin (set ALLOWED_ORIGIN in Render), default '*' for local/dev.
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Helper: path to products
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

function readProducts() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`Data file not found: ${DATA_FILE}`);
  }
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// GET /api/products with filters
app.get('/api/products', (req, res) => {
  try {
    let products = readProducts();
    const { category, tag, minPrice, maxPrice, q, sort } = req.query;

    if (category) products = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    if (tag) products = products.filter(p => (p.tags || []).map(t => t.toLowerCase()).includes(tag.toLowerCase()));
    if (minPrice) products = products.filter(p => p.price >= Number(minPrice));
    if (maxPrice) products = products.filter(p => p.price <= Number(maxPrice));
    if (q) {
      const term = q.toLowerCase();
      products = products.filter(p =>
        (p.name || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        ((p.tags || []).join(' ') || '').toLowerCase().includes(term)
      );
    }

    if (sort === 'price_asc') products.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') products.sort((a, b) => b.price - a.price);
    else if (sort === 'name') products.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    res.json(products);
  } catch (err) {
    console.error('Error in /api/products:', err);
    res.status(500).json({ error: 'Failed to load products', message: err.message });
  }
});

// Serve frontend build (single-service mode)
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // Safe fallback: serve index.html for any route NOT starting with /api
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'), err => {
      if (err) next(err);
    });
  });
}

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`ALLOWED_ORIGIN=${allowedOrigin}`);
});
