// Force inject styles
const style = document.createElement('style');
style.textContent = `
  .insta-vid-container { position: relative !important; display: block !important; width: 100% !important; }
  .insta-vid-controls { position: absolute !important; bottom: 0 !important; left: 10% !important; right: 10% !important; width: 80% !important; margin: 0 auto !important; background: rgba(0, 0, 0, 0.6) !important; padding: 6px !important; display: flex !important; align-items: center !important; gap: 6px !important; opacity: 0 !important; transition: opacity 0.3s ease !important; border-radius: 12px 12px 0 0 !important; z-index: 999999 !important; }
  .insta-vid-controls:not(.insta-vid-story) { bottom: 0 !important; }
  .insta-vid-controls.insta-vid-story { left: 2.5% !important; right: 2.5% !important; width: 95% !important; bottom: 70px !important; border-radius: 12px!important; }
  .insta-vid-playpause { background: rgba(255,255,255,0.3) !important; border: none !important; color: white !important; font-size: 12px !important; cursor: pointer !important; padding: 4px 8px !important; border-radius: 6px !important; min-width: 34px !important; }
  .insta-vid-progress { flex: 1 !important; height: 6px !important; cursor: pointer !important; accent-color: #e4405f !important; }
  .insta-vid-time { color: white !important; font-size: 12px !important; min-width: 80px !important; font-family: system-ui !important; }
  .insta-vid-speed { background: rgba(0,0,0,0.7) !important; color: white !important; border: none !important; padding: 6px 8px !important; border-radius: 4px !important; font-size: 12px !important; cursor: pointer !important; }
  .insta-vid-download { background: rgba(255,255,255,0.3) !important; border: none !important; color: white !important; font-size: 12px !important; cursor: pointer !important; padding: 4px 8px !important; border-radius: 6px !important; min-width: 34px !important; }
`;
(document.head || document.documentElement).appendChild(style);

let isEnabled = true;
let isDownloadEnabled = false;

function updateDownloadButtonsVisibility() {
  document.querySelectorAll('.insta-vid-download').forEach((button) => {
    button.style.display = isDownloadEnabled ? '' : 'none';
  });
}

if (typeof chrome !== 'undefined' && chrome.storage) {
  chrome.storage.local.get(['enabled', 'downloadEnabled'], (result) => {
    isEnabled = result.enabled !== false;
    isDownloadEnabled = result.downloadEnabled === true;
    updateDownloadButtonsVisibility();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (changes.enabled) {
      isEnabled = changes.enabled.newValue !== false;
      if (!isEnabled) {
        removeControls();
      } else {
        injectControls();
      }
    }

    if (changes.downloadEnabled) {
      isDownloadEnabled = changes.downloadEnabled.newValue === true;
      updateDownloadButtonsVisibility();
    }
  });
}

function removeControls() {
  document.querySelectorAll('.insta-vid-controls').forEach(el => el.remove());
  document.querySelectorAll('video[data-custom-controls]').forEach(v => v.removeAttribute('data-custom-controls'));
}

function isStoryVideo(video) {
  return window.location.href.includes('/stories/');
}

function injectControls() {
  if (!isEnabled) return;
  
  const videos = document.querySelectorAll('video:not([data-custom-controls])');
  
  if (videos.length === 0) return;
  
  videos.forEach((video, index) => {
    video.setAttribute('data-custom-controls', 'true');
    
    const isStory = isStoryVideo(video);
    
    // Get video's dimensions and position
    const rect = video.getBoundingClientRect();
    
    // Ensure video parent is positioned
    const parent = video.parentElement;
    if (parent && getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }
    
    const controls = document.createElement('div');
    controls.className = 'insta-vid-controls' + (isStory ? ' insta-vid-story' : '');
    controls.style.cssText = `
      position: absolute !important;
      left: 10%;
      right: 10%;
      width: 80%;
      background: rgba(0, 0, 0, 0.6) !important;
      padding: 6px !important;
      display: flex !important;
      align-items: center !important;
      gap: 6px !important;
      opacity: 1!important;
      z-index: 999999 !important;
      box-sizing: border-box !important;
      pointer-events: auto !important;
    `;
    
    // Insert controls after video
    video.parentNode.insertBefore(controls, video.nextSibling);
    
    const playPauseBtn = document.createElement('button');
    playPauseBtn.className = 'insta-vid-playpause';
    playPauseBtn.innerHTML = video.paused ? '▶' : '❚❚';
    playPauseBtn.style.cssText = `
      background: rgba(255,255,255,0.3) !important;
      border: none !important;
      color: white !important;
      font-size: 12px !important;
      cursor: pointer !important;
      padding: 4px !important;
      border-radius: 6px !important;
      min-width: 26px !important;
      font-family: system-ui !important;
    `;
    
    const progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.className = 'insta-vid-progress';
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;
    progressBar.style.cssText = `
      flex: 1;
      height: 4px;
      cursor: pointer;
      accent-color: #e4405f;
    `;
    
    const timeDisplay = document.createElement('span');
    timeDisplay.className = 'insta-vid-time';
    timeDisplay.textContent = '0:00 / 0:00';
    timeDisplay.style.cssText = `
      color: white;
      font-size: 11px;
      min-width: 75px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    
    const speedSelect = document.createElement('select');
    speedSelect.className = 'insta-vid-speed';
    speedSelect.style.cssText = `
      background: rgba(0,0,0,0.6);
      color: white;
      border: none;
      padding: 4px 6px;
      border-radius: 4px;
      font-size: 11px;
      cursor: pointer;
    `;
    [0.5, 0.75, 1, 1.25, 1.5, 2].forEach(speed => {
      const option = document.createElement('option');
      option.value = speed;
      option.textContent = speed + 'x';
      if (speed === 1) option.selected = true;
      speedSelect.appendChild(option);
    });

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'insta-vid-download';
    downloadBtn.innerHTML = '⬇';
    downloadBtn.title = 'Download video';
    downloadBtn.style.cssText = `
      background: rgba(255,255,255,0.3) !important;
      border: none !important;
      color: white !important;
      font-size: 12px !important;
      cursor: pointer !important;
      padding: 4px !important;
      border-radius: 6px !important;
      min-width: 26px !important;
      font-family: system-ui !important;
    `;
    downloadBtn.style.display = isDownloadEnabled ? '' : 'none';
    
    downloadBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      const getCsrfToken = () => {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1] || '';
      };
      
      const isStory = window.location.pathname.includes('/stories/') && !window.location.pathname.includes('/reel');
      const path = window.location.pathname;
      
      let shortcode = null;
      let videoUrl = null;
      let downloadName = 'ig-video.mp4';
      
      if (isStory) {
        const userMatch = path.match(/\/stories\/([^\/]+)/);
        const storyIdMatch = path.match(/\/stories\/[^\/]+\/(\d+)/);
        
        if (userMatch && userMatch[1] !== 'highlights') {
          const username = userMatch[1];
          const storyId = storyIdMatch ? storyIdMatch[1] : null;
          
          try {
            const userRes = await fetch('/api/v1/users/web_profile_info/?username=' + username, {
              headers: { 'x-csrftoken': getCsrfToken(), 'x-ig-app-id': '936619743392459', 'x-requested-with': 'XMLHttpRequest' },
              credentials: 'include'
            });
            const userJson = await userRes.json();

            if (userJson.data && userJson.data.user) {
              const userId = userJson.data.user.id;

              const reelsRes = await fetch('/api/v1/feed/reels_media/?reel_ids=' + userId, {
                headers: { 'x-csrftoken': getCsrfToken(), 'x-ig-app-id': '936619743392459', 'x-requested-with': 'XMLHttpRequest' },
                credentials: 'include'
              });
              const reelsJson = await reelsRes.json();

              if (reelsJson.reels && reelsJson.reels[userId]) {
                const items = reelsJson.reels[userId].items;

                if (items && items.length > 0) {
                  let item = null;
                  if (storyId) {
                    item = items.find(i => i.pk === storyId);
                    if (!item) {
                      item = items.find(i => i.pk && i.pk.startsWith(storyId.substring(0, 10)));
                    }
                  }
                  if (!item) {
                    item = items.find(i => i.media_type === 2);
                  }
                  if (!item) {
                    item = items[0];
                  }

                  if (item && item.media_type === 2 && item.video_versions) {
                    const best = item.video_versions.reduce((a, b) => a.width > b.width ? a : b);
                    videoUrl = best.url;
                    downloadName = 'ig-story-' + (storyId || item.pk) + '.mp4';
                  } else if (item && item.image_versions2) {
                    videoUrl = item.image_versions2.candidates[0].url;
                    downloadName = 'ig-story-' + (storyId || item.pk) + '.jpg';
                  }
                }
              }
            }
          } catch (err) {}
        }
      } else {
        const shortcodeMatch = path.match(/\/(p|tv|reel|reels)\/([A-Za-z0-9_-]+)/);
        if (!shortcodeMatch) {
          const links = document.querySelectorAll('a[href*="/reel/"], a[href*="/p/"], a[href*="/tv/"]');
          for (const link of links) {
            const m = link.href.match(/\/(p|tv|reel|reels)\/([A-Za-z0-9_-]+)/);
            if (m) { shortcode = m[2]; break; }
          }
        } else {
          shortcode = shortcodeMatch[2];
        }
        
        if (shortcode) {
          const queryRes = await fetch('/graphql/query/?doc_id=8845758582119845', {
            method: 'POST',
            headers: { 'x-csrftoken': getCsrfToken(), 'x-ig-app-id': '936619743392459', 'x-fb-friendly-name': 'PolarisPostActionLoadPostQueryQuery', 'content-type': 'application/x-www-form-urlencoded', 'x-requested-with': 'XMLHttpRequest' },
            credentials: 'include',
            body: 'fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisPostActionLoadPostQueryQuery&variables=' + encodeURIComponent(JSON.stringify({ shortcode: shortcode }))
          });
          const queryJson = await queryRes.json();
          
          if (queryJson.data && queryJson.data.xdt_shortcode_media) {
            const postId = queryJson.data.xdt_shortcode_media.id;
            const mediaRes = await fetch('/api/v1/media/' + postId + '/info/', {
              headers: { 'x-csrftoken': getCsrfToken(), 'x-ig-app-id': '936619743392459', 'x-requested-with': 'XMLHttpRequest' },
              credentials: 'include'
            });
            const mediaJson = await mediaRes.json();
            
            if (mediaJson.items && mediaJson.items[0]) {
              const item = mediaJson.items[0];
              if (item.video_versions) {
                const best = item.video_versions.reduce((a, b) => a.width > b.width ? a : b);
                videoUrl = best.url;
                downloadName = 'ig-video-' + shortcode + '.mp4';
              } else if (item.image_versions2) {
                videoUrl = item.image_versions2.candidates[0].url;
                downloadName = 'ig-photo-' + shortcode + '.jpg';
              }
            }
          }
        }
      }
      
      if (!videoUrl) {
        downloadBtn.innerHTML = '✕';
        setTimeout(() => downloadBtn.innerHTML = '⬇', 2000);
        return;
      }
      
      try {
        const videoRes = await fetch(videoUrl);
        const blob = await videoRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        downloadBtn.innerHTML = '✓';
        setTimeout(() => downloadBtn.innerHTML = '⬇', 2000);
      } catch (err) {
        downloadBtn.innerHTML = '✕';
        setTimeout(() => downloadBtn.innerHTML = '⬇', 2000);
      }
    });
    
    controls.appendChild(playPauseBtn);
    controls.appendChild(progressBar);
    controls.appendChild(timeDisplay);
    controls.appendChild(speedSelect);
    controls.appendChild(downloadBtn);
    
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.play().catch(() => {});
        playPauseBtn.innerHTML = '❚❚';
      } else {
        video.pause();
        playPauseBtn.innerHTML = '▶';
      }
    });
    
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.value = percent || 0;
      
      const current = formatTime(video.currentTime);
      const duration = formatTime(video.duration || 0);
      timeDisplay.textContent = `${current} / ${duration}`;
    });
    
    progressBar.addEventListener('input', (e) => {
      if (!video.duration) return;
      const time = (progressBar.value / 100) * video.duration;
      video.currentTime = time;
    });
    
    speedSelect.addEventListener('change', (e) => {
      video.playbackRate = parseFloat(speedSelect.value);
    });
    
    video.addEventListener('ended', () => {
      playPauseBtn.innerHTML = '▶';
    });
    
    video.addEventListener('play', () => {
      playPauseBtn.innerHTML = '❚❚';
    });
    
    video.addEventListener('pause', () => {
      playPauseBtn.innerHTML = '▶';
    });
  });
}

function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const observer = new MutationObserver((mutations) => {
  let shouldInject = false;
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length > 0) {
      shouldInject = true;
    }
  });
  if (shouldInject) {
    injectControls();
  }
});

if (document.body) {
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  injectControls();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    injectControls();
  });
}

setInterval(injectControls, 500);

window.addEventListener('scroll', () => {
  injectControls();
}, { passive: true });
