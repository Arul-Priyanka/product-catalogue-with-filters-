import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import Filters from './components/Filters';

// Use Vite env var if set (VITE_API_BASE)
const API_BASE = import.meta.env.VITE_API_BASE || '';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    tag: '',
    minPrice: '',
    maxPrice: '',
    sort: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  async function fetchProducts() {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).trim() !== '') params.set(k, v);
      });

      // if API_BASE is set (production), use it; otherwise use relative path (works locally with vite proxy)
      const base = API_BASE || '';
      const url = `${base}/api/products?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchProducts error:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo">PC</div>
        <div>
          <div className="app-title">Product Catalogue</div>
          <div style={{ color: '#6b7280', fontSize: 13 }}>Filters • Hover effects • Teal & Navy</div>
        </div>
      </header>

      <div className="grid">
        <aside className="filters">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        <main>
          {loading ? <div>Loading...</div> : (
            <>
              <div style={{ marginBottom: 12, color: '#374151' }}>{products.length} products</div>
              <div className="products">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
