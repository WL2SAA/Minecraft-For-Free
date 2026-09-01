/**
 * MINECRAFT LATEST APKs - N9NE STUDIOS
 * Core interaction and download management engine
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c [N9NE STUDIOS] Minecraft Latest APKs Portal Initialized ', 'background: #22c55e; color: #000000; font-weight: bold; font-size: 14px; padding: 4px 8px;');

    const downloadButtons = document.querySelectorAll('a[href$="minecraft.apk"]');
    const fileNotice = document.getElementById('fileNotice');

    // Check placeholder / real APK existence via HEAD request
    fetch('minecraft.apk', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const contentLength = response.headers.get('content-length');
                if (contentLength && parseInt(contentLength, 10) > 1024 * 1024) {
                    const mbSize = (parseInt(contentLength, 10) / (1024 * 1024)).toFixed(1);
                    if (fileNotice) {
                        fileNotice.className = 'file-notice notice-info';
                        fileNotice.innerHTML = `
                            <span class="notice-icon">✅</span>
                            <span class="notice-text">
                                <strong>Active APK Detected:</strong> <code>minecraft.apk</code> (${mbSize} MB) is loaded and ready for download.
                            </span>
                        `;
                    }
                }
            }
        })
        .catch(() => {
            console.warn('[N9NE STUDIOS] Local file access mode or offline.');
        });

    // UX Feedback when user initiates download
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerHTML;
            btn.innerHTML = `<span>⏳ Initiating Download...</span>`;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2500);
        });
    });
});
