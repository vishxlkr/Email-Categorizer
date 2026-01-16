# Deployment Guide

## Backend Deployment (Vercel)

### Prerequisites

-  Vercel account
-  MongoDB Atlas database
-  OpenAI API key

### Steps:

1. **Install Vercel CLI** (optional)

   ```bash
   npm install -g vercel
   ```

2. **Configure Environment Variables in Vercel**

   Go to your Vercel project settings and add:

   -  `MONGO_URI` - Your MongoDB connection string
   -  `OPENAI_API_KEY` - Your OpenAI API key
   -  `NODE_ENV` - Set to "production"

3. **Deploy from GitHub**

   -  Push your code to GitHub
   -  Connect repository to Vercel
   -  Set root directory to `server`
   -  Vercel will auto-detect settings from `vercel.json`

4. **Manual Deploy** (alternative)

   ```bash
   cd server
   vercel
   ```

5. **Get your Backend URL**
   -  Example: `https://your-project.vercel.app`

---

## Frontend Deployment (Render)

### Prerequisites

-  Render account
-  Backend URL from Vercel deployment

### Steps:

1. **Update Environment Variable**

   In Render dashboard, add environment variable:

   -  Key: `VITE_API_URL`
   -  Value: `https://your-backend-url.vercel.app/api`

2. **Deploy from GitHub**

   -  Connect your GitHub repository to Render
   -  Create a new Static Site
   -  Set root directory to `client`
   -  Build Command: `npm install && npm run build`
   -  Publish Directory: `dist`
   -  Auto-deploy: Enable

3. **Manual Configuration** (alternative)

   If using `render.yaml`:

   -  Ensure `render.yaml` is in the client directory
   -  Render will automatically detect it
   -  Update `VITE_API_URL` in Render dashboard

4. **Update CORS**

   Add your Render frontend URL to backend CORS settings in `server/src/app.js`:

   ```javascript
   app.use(
      cors({
         origin: [
            "http://localhost:5173",
            "https://your-frontend-url.onrender.com",
         ],
      })
   );
   ```

   Redeploy backend after this change.

---

## Post-Deployment Checklist

-  [ ] Backend is accessible at Vercel URL
-  [ ] Frontend is accessible at Render URL
-  [ ] Environment variables are set correctly
-  [ ] CORS is configured properly
-  [ ] MongoDB connection works
-  [ ] API endpoints respond correctly
-  [ ] Frontend can communicate with backend
-  [ ] Seed database works via Refresh button

---

## Troubleshooting

### Backend Issues:

-  **500 Error**: Check MongoDB connection string
-  **CORS Error**: Add frontend URL to CORS whitelist
-  **OpenAI Error**: Verify API key or rely on fallback

### Frontend Issues:

-  **API Connection Failed**: Verify `VITE_API_URL` environment variable
-  **Build Failed**: Check Node version (should be 16+)
-  **Blank Page**: Check browser console for errors

### Common Fixes:

1. Clear build cache and redeploy
2. Check all environment variables are set
3. Verify MongoDB IP whitelist (allow all: 0.0.0.0/0)
4. Check API endpoint URLs in browser network tab

---

## Local Testing with Production Settings

```bash
# Backend
cd server
npm start

# Frontend (in new terminal)
cd client
VITE_API_URL=http://localhost:5000/api npm run dev
```

---

## URLs to Update After Deployment

1. Update `README.md` with live demo URLs
2. Update CORS in `server/src/app.js`
3. Set `VITE_API_URL` in Render environment variables
