# Publishing Guide for ReelControl X

This guide will help you publish ReelControl X to the Chrome Web Store.

## Prerequisites

Before publishing, you need to create the required icon files:

### Required Icons

Create the following PNG icons and place them in the `icons/` folder:

- **icon16.png** - 16x16 pixels (toolbar icon)
- **icon48.png** - 48x48 pixels (extension management page)
- **icon128.png** - 128x128 pixels (Chrome Web Store)

**Icon Design Tips:**
- Use a simple, recognizable symbol (video play button, film reel, or "RC" monogram)
- Use Instagram-inspired colors (gradient from #833AB4 → #E4405F → #FCAF45)
- Ensure icons are clear and visible at all sizes
- Use transparent background (PNG with alpha channel)
- Keep design consistent across all sizes

### Additional Promotional Images (for Chrome Web Store)

You'll also need:

1. **Small promotional tile** - 440x280 pixels
2. **Large promotional tile** - 920x680 pixels  
3. **Marquee promotional tile** - 1400x560 pixels (optional)
4. **Screenshots** - 1280x800 or 640x400 pixels (at least 1, up to 5)
   - Show the extension in action on Instagram
   - Highlight key features (speed control, progress bar, etc.)

## Publishing Steps

### 1. Prepare Your Package

1. Ensure all required files are present:
   - ✅ manifest.json
   - ✅ content.js
   - ✅ content.css
   - ✅ popup.html
   - ✅ popup.js
   - ✅ README.md
   - ⚠️ icons/icon16.png
   - ⚠️ icons/icon48.png
   - ⚠️ icons/icon128.png

2. Test the extension thoroughly:
   - Install in Developer Mode
   - Test on various Instagram pages (feed, reels, stories, posts)
   - Check all controls (play/pause, seek, speed)
   - Verify toggle on/off functionality
   - Test on different video types

### 2. Create a ZIP Package

```bash
# From the project root
zip -r reelcontrol-x.zip . -x "*.git*" "*.DS_Store" "PUBLISH.md" "node_modules/*"
```

Or manually:
1. Select all necessary files (excluding .git, PUBLISH.md, etc.)
2. Right-click → Compress
3. Name it `reelcontrol-x.zip`

### 3. Chrome Web Store Developer Account

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay the one-time $5 developer registration fee (if not already registered)
3. Sign in with your Google account

### 4. Submit Your Extension

1. Click **"New Item"** in the dashboard
2. Upload your `reelcontrol-x.zip` file
3. Fill in the required information:

#### Store Listing
- **Detailed description**: Expand on features, benefits, and how it works
- **Category**: Productivity or Social & Communication
- **Language**: English (and/or others)
- **Screenshots**: Upload 3-5 high-quality screenshots
- **Promotional images**: Upload the tiles created earlier
- **Privacy policy**: Since the extension doesn't collect data, you can state:
  ```
  ReelControl X does not collect, store, or transmit any user data.
  All settings are stored locally on your device.
  The extension only operates on Instagram.com.
  ```

#### Privacy
- **Single purpose**: "Enhance Instagram video viewing experience with custom playback controls"
- **Permission justification**: Explain each permission:
  - `activeTab`: To inject controls into the active Instagram tab
  - `scripting`: To add custom video controls to Instagram pages
  - `storage`: To save user preferences (enabled/disabled state)
  - `host_permissions`: To access Instagram.com pages

#### Distribution
- **Visibility**: Public
- **Regions**: All regions (or select specific ones)

### 5. Pricing & Distribution

- Select **Free** (recommended)
- Choose countries where you want to distribute

### 6. Review Process

- Submit for review
- Review typically takes 1-3 business days
- You'll receive an email when approved or if changes are needed
- Monitor the Developer Dashboard for status updates

## After Publishing

### Update Process

When you need to release updates:

1. Update the version number in `manifest.json` (e.g., 1.1.0 → 1.2.0)
2. Create a new ZIP package
3. Go to Developer Dashboard → Your extension → Package
4. Upload the new package
5. Submit for review

### Version Numbering

Follow semantic versioning:
- **Major** (1.x.x): Breaking changes or major new features
- **Minor** (x.1.x): New features, backward compatible
- **Patch** (x.x.1): Bug fixes

### Monitoring

- Check user reviews and respond promptly
- Monitor crash reports in the dashboard
- Track installation statistics
- Address reported issues quickly

## Marketing Tips

1. **GitHub Repository**: Create a public repo and link it in the store listing
2. **Social Media**: Share on Twitter, Reddit (r/chrome), ProductHunt
3. **Demo Video**: Create a short video showing the extension in action
4. **Blog Post**: Write about why you built it and how it works
5. **Ask for Reviews**: Encourage satisfied users to leave positive reviews

## Useful Links

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Chrome Extension Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)
- [Chrome Web Store Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Best Practices](https://developer.chrome.com/docs/webstore/best_practices/)

## Support

If you encounter issues during publishing:
1. Check the [Chrome Web Store Help](https://support.google.com/chrome_webstore/)
2. Review rejection reasons carefully and address all points
3. Update documentation if policies change

---

**Good luck with your publication! 🚀**
