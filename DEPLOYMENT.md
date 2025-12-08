# Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Repository named `facundoallia.github.io` (or `<username>.github.io`)

## 🚀 Initial Setup

### 1. Initialize Git Repository (if not already done)

```powershell
cd "c:\Portfolio GitHub\facundoallia.github.io"
git init
git add .
git commit -m "Initial commit: Complete portfolio website"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name it **exactly**: `facundoallia.github.io`
4. Do NOT initialize with README (we already have one)
5. Click "Create Repository"

### 3. Connect Local Repository to GitHub

```powershell
git remote add origin https://github.com/facundoallia/facundoallia.github.io.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Click "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select branch: `main`
6. Select folder: `/ (root)`
7. Click "Save"

## ✅ Verify Deployment

After 1-2 minutes, your site should be live at:
```
https://facundoallia.github.io
```

## 🔄 Making Updates

After making changes to your site:

```powershell
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Update: Brief description of changes"

# Push to GitHub
git push origin main
```

Changes will be live within 1-2 minutes.

## 🛠️ Common Issues & Solutions

### Issue: Site not loading after 5 minutes
**Solution**: 
- Check GitHub Pages settings
- Ensure `index.html` is in the root directory
- Check Actions tab for build errors

### Issue: Images not loading
**Solution**:
- Verify image paths use relative URLs
- Check file names match exactly (case-sensitive)
- Ensure images are in `assets/images/` folder

### Issue: CSS not applying
**Solution**:
- Verify CSS links in HTML use relative paths
- Check browser console for 404 errors
- Clear browser cache (Ctrl+Shift+R)

### Issue: Theme toggle not working
**Solution**:
- Check browser console for JavaScript errors
- Verify `themes.js` is loaded correctly
- Try in incognito mode to rule out localStorage issues

## 📦 Files Checklist

Ensure these files exist in your repository:

- ✅ `index.html` - Main page
- ✅ `consulting.html` - Consulting page
- ✅ `README.md` - Documentation
- ✅ `.gitignore` - Git ignore rules
- ✅ `assets/css/base.css` - Base styles
- ✅ `assets/css/main.css` - Component styles
- ✅ `assets/css/themes.css` - Theme variables
- ✅ `assets/js/main.js` - Language toggle
- ✅ `assets/js/themes.js` - Theme toggle
- ✅ `assets/images/profile.jpg` - Profile photo
- ✅ `assets/docs/CV_Facundo_Allia_EN.pdf` - CV PDF

## 🔍 Testing Before Deploy

### Local Testing
1. Open `index.html` in a browser
2. Test language toggle (ES/EN button)
3. Test theme toggle (moon/sun icon)
4. Test all navigation links
5. Test responsive design (resize browser)
6. Test consulting page Calendly integration

### Cross-Browser Testing
Test in:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari (if available)
- ✅ Mobile browsers

### Responsive Testing
Test at these breakpoints:
- Desktop: 1920px, 1440px, 1200px
- Tablet: 768px
- Mobile: 480px, 375px, 320px

## 📱 Mobile Testing

Use browser DevTools:
1. Press F12
2. Click device toolbar icon
3. Test different device presets
4. Check touch interactions work

## 🔒 Security Notes

- ✅ No sensitive data in code
- ✅ No API keys exposed
- ✅ All external links use HTTPS
- ✅ Calendly integration uses official widget

## 🎯 SEO Checklist

- ✅ Meta descriptions added
- ✅ Title tags optimized
- ✅ Alt text for images
- ✅ Semantic HTML structure
- ✅ Mobile-friendly design
- ✅ Fast loading times

## 📈 Analytics (Optional)

To add Google Analytics later:

1. Get your GA4 tracking ID
2. Add this to `<head>` of both HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔄 Continuous Updates

### Regular Maintenance
- Update CV PDF as needed
- Add new projects to portfolio
- Update experience section
- Check all external links work
- Update contact information

### Version Control Best Practices
```powershell
# Create feature branch for major changes
git checkout -b feature/new-project

# Make changes and test locally

# Commit changes
git add .
git commit -m "Add: New project XYZ"

# Merge to main
git checkout main
git merge feature/new-project

# Push to GitHub
git push origin main
```

## 📞 Support

If you encounter issues:
1. Check GitHub Pages documentation
2. Review browser console errors
3. Test in incognito mode
4. Check GitHub Actions for build logs

## 🎉 Success!

Your portfolio is now live and professional! 

Remember to:
- Share your new portfolio URL on LinkedIn
- Update your email signature
- Add to your CV
- Share on social media

---

**Portfolio URL**: https://facundoallia.github.io
**Last Updated**: December 2025
