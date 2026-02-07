# 🚀 Deploying Blindspot to Vercel

This guide will walk you through deploying your game to Vercel so anyone can play it online!

## Prerequisites

1. A GitHub account (free)
2. A Vercel account (free) - sign up at [vercel.com](https://vercel.com)

## Step 1: Push to GitHub

First, create a new repository on GitHub:

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it `blindspot` (or whatever you prefer)
4. **Don't** initialize with README (we already have one)
5. Click **Create repository**

Then, push your local code to GitHub:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/blindspot.git

# Push your code
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New...** → **Project**
3. Import your `blindspot` repository from GitHub
4. Vercel will auto-detect it's a static site
5. Click **Deploy**
6. Wait 30-60 seconds... Done! 🎉

Your game will be live at: `https://blindspot-YOUR_USERNAME.vercel.app`

### Option B: Using Vercel CLI

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
cd d:\blindspot
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- What's your project's name? **blindspot**
- In which directory is your code located? **.**
- Want to override settings? **N**

Your game will be deployed! 🚀

## Step 3: Custom Domain (Optional)

To use a custom domain like `blindspot.yourdomain.com`:

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. Add your domain and follow DNS instructions

## Updating Your Game

After making changes:

```bash
# Commit your changes
git add .
git commit -m "Description of changes"
git push

# Vercel will automatically redeploy!
```

## Troubleshooting

### Game doesn't load
- Check browser console for errors (F12)
- Ensure all files are committed and pushed
- Verify `index.html` is in the root directory

### Assets not loading
- Check file paths are relative (not absolute)
- Ensure all files are in the repository

### Deployment fails
- Check Vercel build logs
- Ensure `vercel.json` is present
- Try redeploying from Vercel dashboard

## Performance Tips

Your game is already optimized for Vercel:
- ✅ Static files (no server needed)
- ✅ Small file size (~50KB total)
- ✅ No build process required
- ✅ Instant loading

## Sharing Your Game

Once deployed, share your game:
- Direct link: `https://your-project.vercel.app`
- Social media: Add a screenshot!
- Game dev communities: Reddit, Discord, etc.

## Next Steps

- Add analytics to track players
- Set up a custom domain
- Create a landing page with screenshots
- Add social media preview cards

---

**Congratulations! Your game is now live! 🎮**
