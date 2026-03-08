# ReelControl X 

![ReelControl X ](https://i.imgur.com/OVyzb5j.png)

*v1.2.0*

Take full control of IG videos with custom HTML5 video controls.

## ✨ Features

- **Play/Pause Control** - Click to play or pause any IG video
- **Progress Bar** - Seek to any point in the video with an interactive progress bar
- **Playback Speed** - Adjust speed from 0.5x to 2x (slow motion to fast forward)
- **Download Button (Optional)** - Download current video to your computer (disabled by default)
- **Time Display** - See current time and total duration at a glance
- **Universal Compatibility** - Works on IG feed videos, posts, reels, and stories
- **Toggle On/Off** - Enable or disable controls anytime from the extension popup
- **Clean UI** - Sleek, semi-transparent controls that don't interfere with content

![ReelControl X](https://i.imgur.com/uhH5HWD.png)

## 📥 Installation

### Option 1: Chrome Web Store (Recommended)
*Coming soon - Extension pending Chrome Web Store approval*

### Option 2: Install from Source (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top right corner)
4. Click **Load unpacked**
5. Select the `reelcontrol-x` folder
6. Visit IG and enjoy enhanced video controls!

## 🎯 Usage

1. **Enable/Disable**: Click the ReelControl X extension icon in your browser toolbar to toggle controls on or off
2. **Refresh**: Use the "Refresh Page" button in the popup to reload IG after toggling
3. **Video Controls**: Custom controls automatically appear at the bottom of all IG videos
   - Click the **play/pause button** (▶/❚❚) to control playback
   - Drag the **progress bar** to seek to any position
   - Use the **speed selector** to adjust playback speed
   - Monitor **time elapsed/remaining** in the time display
   - Download current video (optional, enable it from the popup toggle)

## 🛠️ Technical Details

### Built With
- Vanilla JavaScript (no dependencies)
- Chrome Extension Manifest V3
- CSS3 for styling

### Architecture
- **manifest.json** - Extension configuration and permissions
- **content.js** - Main script that injects video controls into IG pages
- **content.css** - Styling for custom video controls
- **popup.html** - Extension popup interface
- **popup.js** - Popup functionality and settings management

### Permissions Required
- `activeTab` - Access to the current tab for control injection
- `scripting` - Inject custom controls into IG pages
- `storage` - Save user preferences (enable/disable state)
- `host_permissions` - Access to `https://www.instagram.com/*`

## 🔒 Privacy

ReelControl X:
- Does **NOT** collect or transmit any user data
- Does **NOT** track browsing activity
- Only operates on IG web pages
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

**Enjoy better video control on IG!** ⭐️

<details>
   <summary><strong>Privacy Policy</strong></summary>

### Privacy Policy for ReelControl X

**Last updated:** 2026-03-07

#### Overview
ReelControl X is designed to run locally in your browser and does not monetize user data.

#### Data Collection
ReelControl X **does not collect, store, or sell personal data**.

#### Data Processing
The extension only processes page content on supported IG pages to:
- detect HTML5 video elements,
- render custom playback controls,
- apply user-selected playback behavior.

This processing happens locally in the browser session.

#### Permissions and Purpose
- **`storage`**: Saves extension preferences (for example, enabled/disabled state and UI options) on the user’s device.
- **Host permissions (IG domains)**: Required to run controls on supported IG pages.
- **`activeTab` / `scripting`**: Used only to inject extension functionality into the current tab when needed.

#### Data Sharing
No user data is transmitted to external servers by ReelControl X.  
No analytics, ad trackers, or third-party telemetry are included.

#### Cookies
ReelControl X does not create or manage tracking cookies.

#### Children’s Privacy
ReelControl X is not directed to children under 13 and does not knowingly collect children’s personal data.

#### Security
Because data stays local to the browser, exposure risk is minimized. Users are responsible for securing their own device and browser profile.

#### Changes to This Policy
This policy may be updated to reflect feature or compliance changes. The latest version will always be published in this README and in the Chrome Web Store listing.

#### Contact
For privacy questions or requests, contact: **juanbrujo@gmail.com**

</details>
