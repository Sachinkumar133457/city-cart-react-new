import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Trash2, Plus, CheckCircle, LogOut, Mail, Star, X, Filter } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: 49.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', rating: 4.5 },
  { id: 2, name: 'Smart Fitness Watch', price: 79.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', rating: 4.7 },
  { id: 3, name: 'Classic Leather Wallet', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', rating: 4.3 },
  { id: 4, name: 'Minimalist Analog Watch', price: 89.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80', rating: 4.8 },
  { id: 5, name: 'Running Sports Shoes', price: 65.50, category: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', rating: 4.6 },
  { id: 6, name: 'Casual Denim Jacket', price: 55.00, category: 'Clothing', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80', rating: 4.4 },
  { id: 7, name: 'Stainless Steel Water Bottle', price: 18.99, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', rating: 4.9 },
  { id: 8, name: 'Professional DSLR Camera', price: 450.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', rating: 4.9 },
  { id: 9, name: 'Ergonomic Office Chair', price: 120.00, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1580481077494-e3299ac2505e?w=400&q=80', rating: 4.2 },
  { id: 10, name: 'Cotton Summer T-Shirt', price: 15.00, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', rating: 4.1 },
  { id: 11, name: 'Polarized Sunglasses', price: 35.00, category: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80', rating: 4.5 },
  { id: 12, name: 'Wireless Gaming Mouse', price: 45.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80', rating: 4.7 },
  { id: 13, name: 'Canvas Travel Backpack', price: 59.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', rating: 4.8 },
  { id: 14, name: 'Ceramic Coffee Mug', price: 12.50, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80', rating: 4.3 },
  { id: 15, name: 'Mechanical Keyboard', price: 95.00, category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', rating: 4.9 },
  { id: 16, name: 'Leather Formal Shoes', price: 85.00, category: 'Footwear', image: 'https://images.unsplash.com/photo-1533867617858-e7d97e060857?w=400&q=80', rating: 4.4 },
  { id: 17, name: 'Bluetooth Portable Speaker', price: 39.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', rating: 4.6 },
  { id: 18, name: 'Stylish Winter Beanie', price: 14.99, category: 'Clothing', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&q=80', rating: 4.2 },
  { id: 19, name: 'LED Desk Lamp', price: 28.00, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', rating: 4.7 },
  { id: 20, name: 'Running Track Pants', price: 32.00, category: 'Clothing', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80', rating: 4.3 },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  
  const [activeTab, setActiveTab] = useState('home'); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null); 

  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [newProd, setNewProd] = useState({ name: '', price: '', category: 'Electronics', image: '' });

  const categories = ['All', ...new Set(INITIAL_PRODUCTS.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceFilter === '0-19') matchesPrice = p.price >= 0 && p.price <= 19;
    else if (priceFilter === '20-39') matchesPrice = p.price >= 20 && p.price <= 39;
    else if (priceFilter === '40-59') matchesPrice = p.price >= 40 && p.price <= 59;
    else if (priceFilter === '60-79') matchesPrice = p.price >= 60 && p.price <= 79;
    else if (priceFilter === '80-99') matchesPrice = p.price >= 80 && p.price <= 99;
    else if (priceFilter === '100+') matchesPrice = p.price >= 100;

    return matchesSearch && matchesCat && matchesPrice;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleGoogleLogin = (isAdminEmail) => {
    if (isAdminEmail) {
      setUser({
        email: 'admin@citycart.com',
        name: 'Store Admin',
        role: 'admin'
      });
      setActiveTab('admin');
    } else {
      setUser({
        email: 'customer@gmail.com',
        name: 'Sachin Kumar',
        role: 'customer'
      });
      setActiveTab('customer');
    }
    setIsLoginOpen(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    const product = {
      id: Date.now(),
      name: newProd.name,
      price: parseFloat(newProd.price),
      category: newProd.category,
      image: newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      rating: 4.5
    };
    setProducts([product, ...products]);
    setNewProd({ name: '', price: '', category: 'Electronics', image: '' });
    alert('Product added successfully!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      
      {/* HEADER NAVBAR */}
      <header className="bg-sky-600 shadow-md sticky top-0 z-40 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div 
            onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}
            className="flex items-center space-x-2 cursor-pointer font-black text-2xl tracking-wider text-white"
          >
            <ShoppingCart className="w-8 h-8 text-white" />
            <span>CITY CART</span>
          </div>

          <div className="flex-1 max-w-md flex items-center">
            <div className="relative w-full flex">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-l-md border-0 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-900 shadow-inner"
              />
              <button className="bg-amber-500 hover:bg-amber-600 px-5 rounded-r-md text-gray-900 font-semibold flex items-center justify-center transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex items-center space-x-6 font-bold text-sm md:text-base">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}
              className={`hover:text-white transition ${activeTab === 'home' ? 'text-white underline underline-offset-4' : 'text-gray-200'}`}
            >
              HOME
            </button>
            
            <div className="relative group cursor-pointer py-1">
              <span className="hover:text-white transition flex items-center gap-1 text-gray-200">
                CATEGORIES ▾
              </span>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md py-2 hidden group-hover:block border border-gray-100 z-50">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setActiveTab('category'); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveTab(user.role === 'admin' ? 'admin' : 'customer')}
                  className="bg-amber-500 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow hover:bg-amber-400 transition flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  {user.role === 'admin' ? 'ADMIN DASHBOARD' : 'CUSTOMER PROFILE'}
                </button>
                <button 
                  onClick={() => { setUser(null); setActiveTab('home'); }}
                  title="Logout"
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-white text-gray-900 px-4 py-1.5 rounded-md text-sm font-bold shadow hover:bg-amber-400 transition flex items-center gap-2"
              >
                <User className="w-4 h-4" /> LOGIN
              </button>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md font-bold shadow-md transition flex items-center gap-2 relative border border-slate-600"
            >
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <span>CART</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* ADMIN DASHBOARD VIEW */}
        {activeTab === 'admin' && user?.role === 'admin' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Logged in as: {user.email}</p>
              </div>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-bold text-sm transition"
              >
                Back to Store
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-600" /> Add New Product
              </h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input 
                  type="text" 
                  placeholder="Product Name" 
                  value={newProd.name}
                  onChange={e => setNewProd({...newProd, name: e.target.value})}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
                  required 
                />
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="Price ($)" 
                  value={newProd.price}
                  onChange={e => setNewProd({...newProd, price: e.target.value})}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
                  required 
                />
                <select 
                  value={newProd.category}
                  onChange={e => setNewProd({...newProd, category: e.target.value})}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Image URL (optional)" 
                  value={newProd.image}
                  onChange={e => setNewProd({...newProd, image: e.target.value})}
                  className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500"
                />
                <button type="submit" className="md:col-span-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2 rounded-md transition shadow">
                  Publish Product
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Manage Store Products ({products.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-xs font-bold text-gray-600 uppercase">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3 flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded shadow-sm" />
                          <span className="font-semibold">{p.name}</span>
                        </td>
                        <td className="p-3"><span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold">{p.category}</span></td>
                        <td className="p-3 font-bold text-green-600">${p.price.toFixed(2)}</td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-md transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMER PROFILE VIEW */}
        {activeTab === 'customer' && user?.role === 'customer' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
            <div className="flex items-center space-x-4 border-b pb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-gray-900 text-2xl font-black shadow">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Mail className="w-4 h-4 text-amber-600" /> {user.email}
                </p>
                <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">
                  Verified Customer Account
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Order History</h3>
              <div className="bg-gray-50 p-4 rounded-xl border text-center text-gray-500 text-sm">
                No orders placed yet. Start shopping from the home page!
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('home')}
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-xl transition shadow"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* STOREFRONT HOME / CATEGORY VIEW */}
        {(activeTab === 'home' || activeTab === 'category') && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* SIDEBAR FILTERS */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">
                <div>
                  <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-amber-500" /> Filter By Category
                  </h2>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg font-medium text-sm transition ${selectedCategory === cat ? 'bg-amber-500 text-gray-900 font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <hr />

                <div>
                  <h3 className="text-md font-bold text-gray-900 mb-3">Filter By Price</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: '0-19', label: '$0 to $19' },
                      { id: '20-39', label: '$20 to $39' },
                      { id: '40-59', label: '$40 to $59' },
                      { id: '60-79', label: '$60 to $79' },
                      { id: '80-99', label: '$80 to $99' },
                      { id: '100+', label: '$100 or more' },
                    ].map(range => (
                      <label key={range.id} className="flex items-center gap-2.5 cursor-pointer hover:text-amber-600">
                        <input 
                          type="radio" 
                          name="priceFilter" 
                          checked={priceFilter === range.id}
                          onChange={() => setPriceFilter(range.id)}
                          className="text-amber-500 focus:ring-amber-400"
                        />
                        {range.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => { setSelectedCategory('All'); setPriceFilter('all'); setSearchQuery(''); }}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-lg text-sm shadow transition"
                >
                  RESET FILTERS
                </button>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-xl font-black text-gray-900">
                  {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`} 
                  <span className="text-sm font-normal text-gray-500 ml-2">({filteredProducts.length} items)</span>
                </h1>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl shadow-sm border text-gray-500">
                  <p className="text-lg font-bold">No products found matching your filters.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setPriceFilter('all'); setSearchQuery(''); }}
                    className="mt-4 bg-amber-500 text-gray-900 font-bold px-4 py-2 rounded-md shadow"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col justify-between group border border-gray-100">
                      <div>
                        <div className="relative overflow-hidden h-48 bg-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                          <span className="absolute top-2 left-2 bg-gray-900 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md shadow">
                            {product.category}
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" /> {product.rating}
                          </div>
                          <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                          <p className="text-lg font-black text-green-600">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-2.5 rounded-lg shadow transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium text-gray-400">
          All Right Reserved © Azad Team
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 relative">
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto text-gray-900 font-black text-xl shadow">
                C
              </div>
              <h2 className="text-2xl font-black text-gray-900">Sign in to City Cart</h2>
              <p className="text-sm text-gray-500">Choose your login role to test Admin or Customer view</p>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={() => handleGoogleLogin(true)}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign in with Google (Admin Dashboard)
              </button>

              <button 
                onClick={() => handleGoogleLogin(false)}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold text-gray-900 transition shadow"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Sign in with Google (Customer Account)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER & PAYPAL CHECKOUT */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
            
            <div className="p-4 border-b flex items-center justify-between bg-slate-800 text-white">
              <h2 className="font-black text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" /> Your Shopping Cart ({cart.reduce((s, i) => s + i.qty, 0)})
              </h2>
              <button onClick={() => { setIsCartOpen(false); setIsCheckout(false); setPaymentSuccess(false); }} className="hover:text-amber-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400 space-y-3">
                  <ShoppingCart className="w-16 h-16 mx-auto stroke-1" />
                  <p className="font-bold text-gray-600">Your cart is empty</p>
                </div>
              ) : isCheckout ? (
                <div className="space-y-6">
                  {paymentSuccess ? (
                    <div className="text-center py-12 space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
                      <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                      <p className="text-sm text-gray-600">Thank you for your purchase with PayPal. Your order has been placed.</p>
                      <button 
                        onClick={() => { setCart([]); setIsCheckout(false); setPaymentSuccess(false); setIsCartOpen(false); }}
                        className="bg-amber-500 font-bold px-6 py-2 rounded-lg text-gray-900 shadow"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 border-b pb-2">Checkout Summary</h3>
                      <div className="space-y-2 text-sm">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <span>{item.name} (x{item.qty})</span>
                            <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 flex justify-between font-black text-lg text-gray-900">
                        <span>Total Amount:</span>
                        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3">
                        <div className="flex items-center gap-2 font-bold text-blue-900">
                          <img src="https://www.svgrepo.com/show/328132/paypal.svg" className="w-6 h-6" alt="PayPal" />
                          PayPal Secure Checkout
                        </div>
                        <p className="text-xs text-blue-700">Click below to simulate secure payment via PayPal sandbox gateway.</p>
                        <button 
                          onClick={() => setPaymentSuccess(true)}
                          className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-3 rounded-lg shadow transition flex items-center justify-center gap-2"
                        >
                          Pay with <span className="italic font-black">PayPal</span> (${totalPrice.toFixed(2)})
                        </button>
                      </div>

                      <button 
                        onClick={() => setIsCheckout(false)}
                        className="w-full text-sm text-gray-500 hover:text-gray-800 font-medium py-1"
                      >
                        ← Back to Cart
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-black text-sm text-green-600">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isCheckout && cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50 space-y-3">
                <div className="flex justify-between font-black text-lg text-gray-900">
                  <span>Subtotal:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setIsCheckout(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-xl shadow transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}