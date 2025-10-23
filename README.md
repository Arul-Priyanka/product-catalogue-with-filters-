# product-catalogue-with-filters-
my reactjs node product catalogue

# Product Catalogue with Filters

A **React + Node.js** project showcasing a **product catalog with filters, search, sorting, and hover effects**. Products are stored in a **JSON file** and described using **emoji, name, price, and description**. The frontend is styled using **teal and navy blue**.

---

## **Live Demo**

* **Backend API:** [https://product-catalogue-with-filters.onrender.com](https://product-catalogue-with-filters.onrender.com)
* **Frontend:** https://product-catalogue-with-filters-1.onrender.com

---

## **Features**

* List of products with **images (emoji)**, **name**, **price**, and **description**
* **Filters** by category, tag, price range, and search query
* **Sort** products by name or price
* **Hover effects** for better user experience
* Responsive **grid layout**
* Single-page application with clean **teal & navy blue** palette

---

## **Tech Stack**

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Data Storage:** JSON file (`products.json`)
* **Deployment:** Render (Backend Web Service + Frontend Static Site)

---

## **Getting Started (Local Development)**

### **Backend**

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start server:

```bash
node server.js
```

* Backend runs at `http://localhost:5000`
* API endpoint: `http://localhost:5000/api/products`

---

### **Frontend**

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

* Frontend runs at `http://localhost:5173` (or Vite-assigned port)
* Make sure `VITE_API_BASE` in `.env` points to your backend URL, e.g.:

```
VITE_API_BASE=http://localhost:5000
```

---

### **Build for Production**

```bash
npm run build
```

* This creates the `dist` folder ready for deployment.
* Set `VITE_API_BASE` to your **live backend URL** before building.

---

## **Project Structure**

```
product-catalog/
├─ backend/
│  ├─ data/
│  │  └─ products.json
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ ProductCard.jsx
│  │  │  └─ Filters.jsx
│  │  └─ App.jsx
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

---

## **API Endpoints**

* **GET /api/products**

Query parameters (optional):

| Parameter | Description                           |
| --------- | ------------------------------------- |
| category  | Filter by product category            |
| tag       | Filter by tag/label                   |
| minPrice  | Minimum price                         |
| maxPrice  | Maximum price                         |
| q         | Search term (name, description, tags) |
| sort      | `price_asc`, `price_desc`, `name`     |

**Example:**

```
GET /api/products?category=electronics&minPrice=100&sort=price_asc
```

---

## **Deployment**

* Backend: Render Web Service

  * Root: `backend`
  * Start: `node server.js`
  * Environment: `ALLOWED_ORIGIN=https://frontend-url`

* Frontend: Render Static Site

  * Root: `frontend`
  * Build: `npm install && npm run build`
  * Publish: `dist`
  * Environment: `VITE_API_BASE=https://product-catalogue-with-filters.onrender.com`

---

## **Contributing**

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## **License**

This project is open-source under the MIT License.

