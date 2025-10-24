# Deployment Guide

## Quick Deploy Commands

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Run `npm run build`
2. Upload the `build` folder to Netlify
3. The `_redirects` file will handle SPA routing

### Deploy to Vercel
1. Run `npm run build`
2. Upload the `build` folder to Vercel
3. Vercel automatically handles SPA routing

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Run `npm run deploy`

### Deploy to Apache Server
1. Run `npm run build`
2. Upload contents of `build` folder to your web server
3. The `.htaccess` file will handle SPA routing

## Files Created for Deployment

- `public/_redirects` - For Netlify SPA routing
- `public/.htaccess` - For Apache server SPA routing
- `public/manifest.json` - PWA manifest
- `package.json` - Added homepage and deploy scripts

## Troubleshooting

### 404 Errors
- Ensure `_redirects` file is in the build output
- Check that your hosting provider supports SPA routing
- Verify the `homepage` field in package.json is correct

### Font Loading Issues
- Fonts are loaded from Google Fonts CDN
- Ensure internet connection for font loading
- Fonts will fallback to system fonts if CDN fails

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check for any console errors during build
- Ensure Node.js version is 14 or higher

## Production Optimizations

The app includes:
- Minified CSS and JavaScript
- Optimized images and assets
- Gzip compression ready
- Service worker ready (PWA)
- SEO meta tags
- Responsive design