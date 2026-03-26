# CPM Calculator

An interactive media planning tool for managing product rate cards and calculating CPMs. Built as a static site — no server required.

## Features

- **Product Rate Card** — maintain a list of products with retail CPMs, categories, specs, and notes
- **Solve-for Calculator** — enter any two of CPM / Cost / Impressions to calculate the third
- **Product Comparison** — compare CPMs side-by-side with a visual bar chart and budget scenario modeling
- **Quick Fill** — tap any product to pre-fill the calculator with its CPM
- **Persistent storage** — all products are saved to `localStorage` in the browser

## Deploy to Netlify via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USER/cpm-calculator.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
   - Select your repository
   - Build command: *(leave blank)*
   - Publish directory: `.`
   - Click **Deploy site**

3. Your site will be live at a `*.netlify.app` URL instantly.

## Local Development

Just open `index.html` in a browser — no build step needed.

## Customizing Default Products

Edit the `DEFAULT_PRODUCTS` array at the top of `app.js` to set your team's starting rate card. Products are only seeded from defaults if no data exists in `localStorage`.

To reset to defaults, run this in the browser console:
```js
localStorage.removeItem('cpm_products'); location.reload();
```
