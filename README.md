```
  ____                  _    ____                   _                    _    __  __
 |  _ \    ___    ___  | |  / ___|   ___    _ __   | |_   _ __    ___   | |   \ \/ /
 | |_) |  / _ \  / _ \ | | | |      / _ \  | '_ \  | __| | '__|  / _ \  | |    \  / 
 |  _ <  |  __/ |  __/ | | | |___  | (_) | | | | | | |_  | |    | (_) | | |    /  \ 
 |_| \_\  \___|  \___| |_|  \____|  \___/  |_| |_|  \__| |_|     \___/  |_|   /_/\_\
```

# ReelControl X

Take full control of Instagram videos with custom HTML5 video controls. ReelControl X adds professional playback controls to all Instagram videos including reels, posts, and stories.

## ✨ Features

- **Play/Pause Control** - Click to play or pause any Instagram video
- **Progress Bar** - Seek to any point in the video with an interactive progress bar
- **Playback Speed** - Adjust speed from 0.5x to 2x (slow motion to fast forward)
- **Time Display** - See current time and total duration at a glance
- **Universal Compatibility** - Works on Instagram feed videos, posts, reels, and stories
- **Toggle On/Off** - Enable or disable controls anytime from the extension popup
- **Clean UI** - Sleek, semi-transparent controls that don't interfere with content

## 📥 Installation

### Option 1: Chrome Web Store (Recommended)
*Coming soon - Extension pending Chrome Web Store approval*

### Option 2: Install from Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right corner)
4. Click **Load unpacked**
5. Select the `reelcontrol-x` folder
6. Visit Instagram and enjoy enhanced video controls!

## 🎯 Usage

1. **Enable/Disable**: Click the ReelControl X extension icon in your browser toolbar to toggle controls on or off
2. **Refresh**: Use the "Refresh Page" button in the popup to reload Instagram after toggling
3. **Video Controls**: Custom controls automatically appear at the bottom of all Instagram videos
   - Click the **play/pause button** (▶/❚❚) to control playback
   - Drag the **progress bar** to seek to any position
   - Use the **speed selector** to adjust playback speed
   - Monitor **time elapsed/remaining** in the time display

## 🛠️ Technical Details

### Built With
- Vanilla JavaScript (no dependencies)
- Chrome Extension Manifest V3
- CSS3 for styling

### Architecture
- **manifest.json** - Extension configuration and permissions
- **content.js** - Main script that injects video controls into Instagram pages
- **content.css** - Styling for custom video controls
- **popup.html** - Extension popup interface
- **popup.js** - Popup functionality and settings management

### Permissions Required
- `activeTab` - Access to the current tab for control injection
- `scripting` - Inject custom controls into Instagram pages
- `storage` - Save user preferences (enable/disable state)
- `host_permissions` - Access to `https://www.instagram.com/*`

## 🔒 Privacy

ReelControl X:
- Does **NOT** collect or transmit any user data
- Does **NOT** track browsing activity
- Only operates on Instagram.com
- All settings are stored locally on your device

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🐛 Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/shipibo-studio/reelcontrol-x/issues) on GitHub.

---

**Enjoy better video control on Instagram!** ⭐️
