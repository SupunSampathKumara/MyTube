/* ==========================================
   MYTUBE - PREMIUM AD-FREE DOWNLOADER ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const videoUrlInput = document.getElementById("videoUrl");
    const btnPaste = document.getElementById("btnPaste");
    const btnDownload = document.getElementById("btnDownload");
    const platformIndicator = document.getElementById("platformIndicator");
    const inputIcon = document.getElementById("inputIcon");
    
    const downloaderLoading = document.getElementById("downloaderLoading");
    const loadingStatus = document.getElementById("loadingStatus");
    const loadingProgress = document.getElementById("loadingProgress");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    
    const downloaderResults = document.getElementById("downloaderResults");
    const resultThumbnail = document.getElementById("resultThumbnail");
    const resultDuration = document.getElementById("resultDuration");
    const resultPlatformBadge = document.getElementById("resultPlatformBadge");
    const resultTitle = document.getElementById("resultTitle");
    const resultAuthor = document.getElementById("resultAuthor");
    const formatType = document.getElementById("formatType");
    const formatQuality = document.getElementById("formatQuality");
    const btnPremiumDownload = document.getElementById("btnPremiumDownload");
    const btnFallbackDownload = document.getElementById("btnFallbackDownload");
    
    const downloadProgressContainer = document.getElementById("downloadProgressContainer");
    const downloadProgressText = document.getElementById("downloadProgressText");
    const downloadProgressSpeed = document.getElementById("downloadProgressSpeed");
    const downloadProgressFill = document.getElementById("downloadProgressFill");
    
    const faqItems = document.querySelectorAll(".faq-item");
    const bookmarkletLink = document.getElementById("bookmarkletLink");

    // Dynamic Bookmarklet Generation
    // Automatically configures the bookmarklet to open the current site URL
    if (bookmarkletLink) {
        const siteUrl = window.location.origin + window.location.pathname;
        bookmarkletLink.href = `javascript:(function(){window.open('${siteUrl}?url='+encodeURIComponent(window.location.href),'_blank');})();`;
    }

    // Platform Recognition Regex patterns
    const PLATFORMS = {
        youtube: {
            regex: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/||shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
            name: "YouTube",
            icon: "fab fa-youtube",
            colorClass: "theme-youtube",
            defaultTitle: "Amazing YouTube Media Clip"
        },
        tiktok: {
            regex: /tiktok\.com\/(?:@[\w.-]+\/video\/(\d+)|v\/(\d+))/i,
            name: "TikTok",
            icon: "fab fa-tiktok",
            colorClass: "theme-tiktok",
            defaultTitle: "Viral TikTok Video"
        },
        instagram: {
            regex: /instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i,
            name: "Instagram",
            icon: "fab fa-instagram",
            colorClass: "theme-instagram",
            defaultTitle: "Instagram Reel Clip"
        },
        facebook: {
            regex: /(?:facebook\.com\/|fb\.watch\/)/i, // Basic check for FB
            name: "Facebook",
            icon: "fab fa-facebook",
            colorClass: "theme-facebook",
            defaultTitle: "Facebook Video Stream"
        }
    };

    // Detect platform from URL input
    function detectPlatform(url) {
        if (!url) return null;
        for (const [key, platform] of Object.entries(PLATFORMS)) {
            if (platform.regex.test(url)) {
                return { key, ...platform };
            }
        }
        return null;
    }

    // Update site styling dynamically based on input URL
    function updateTheme() {
        const url = videoUrlInput.value.trim();
        const detected = detectPlatform(url);
        
        // Remove all previous theme classes
        document.body.className = "";
        
        if (detected) {
            // Apply new theme class
            document.body.classList.add(detected.colorClass);
            
            // Update Platform Indicator tag
            platformIndicator.innerHTML = `<i class="${detected.icon}"></i> <span>${detected.name} URL Detected</span>`;
            platformIndicator.style.opacity = "1";
            platformIndicator.style.transform = "scale(1)";
            
            // Update Input Icon
            inputIcon.className = detected.icon;
            inputIcon.style.color = "var(--accent-secondary)";
        } else {
            // Default styling
            document.body.classList.add("theme-default");
            platformIndicator.innerHTML = `<i class="fas fa-globe"></i> <span>Ready to extract</span>`;
            inputIcon.className = "fas fa-link";
            inputIcon.style.color = "";
        }
    }

    videoUrlInput.addEventListener("input", updateTheme);

    // Paste Button Functionality
    btnPaste.addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText();
            videoUrlInput.value = text;
            updateTheme();
            // Optional trigger download check
        } catch (err) {
            // Clipboard access blocked or not supported
            alert("Clipboard permission denied. Please paste the URL manually.");
        }
    });

    // Simulated Loading/Extraction Sequence
    function runExtraction(url, platformInfo) {
        // Reset states
        downloaderResults.style.display = "none";
        downloadProgressContainer.style.display = "none";
        downloaderLoading.style.display = "flex";
        
        // Loading Steps reset
        step1.className = "step active";
        step1.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Analyze URL`;
        step2.className = "step";
        step2.innerHTML = `<i class="far fa-circle"></i> Bypass Ads`;
        step3.className = "step";
        step3.innerHTML = `<i class="far fa-circle"></i> Direct Stream`;
        
        let progress = 0;
        loadingProgress.style.width = "0%";
        
        // Timing factors for realism
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 2;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show final stage complete
                step3.className = "step done";
                step3.innerHTML = `<i class="fas fa-check-circle"></i> Direct Stream`;
                
                setTimeout(() => {
                    displayResults(url, platformInfo);
                }, 400);
            }
            
            loadingProgress.style.width = `${progress}%`;
            
            // Stage changes
            if (progress < 30) {
                loadingStatus.textContent = "Analyzing video source parameters...";
                step1.className = "step active";
            } else if (progress >= 30 && progress < 70) {
                loadingStatus.textContent = "Injecting premium ad-blocker & bypassing limits...";
                step1.className = "step done";
                step1.innerHTML = `<i class="fas fa-check-circle"></i> Analyze URL`;
                step2.className = "step active";
                step2.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Bypass Ads`;
            } else {
                loadingStatus.textContent = "Establishing high-speed client download tunnel...";
                step2.className = "step done";
                step2.innerHTML = `<i class="fas fa-check-circle"></i> Bypass Ads`;
                step3.className = "step active";
                step3.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Direct Stream`;
            }
        }, 120);
    }

    // Display parsed metadata and options
    function displayResults(url, platformInfo) {
        downloaderLoading.style.display = "none";
        downloaderResults.style.display = "block";
        
        let title = platformInfo ? platformInfo.defaultTitle : "Social Media Video Clip";
        let duration = "03:45";
        let author = "@creator";
        let thumbnail = "";

        // YouTube specific thumbnail extraction and mock details
        if (platformInfo && platformInfo.key === "youtube") {
            const matches = url.match(platformInfo.regex);
            const ytId = matches ? matches[1] : null;
            if (ytId) {
                thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                // Set fallback thumbnail in case maxresdefault doesn't exist
                resultThumbnail.onerror = () => {
                    resultThumbnail.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                };
                duration = "04:12";
                author = "YouTube Creator Studio";
                title = "Amazing High Definition Video Clip";
                
                // Configure SaveFrom.net Redirection URL
                btnFallbackDownload.href = `https://ssyoutube.com/watch?v=${ytId}`;
            }
        } else {
            // General Fallback details for TikTok / Insta / FB
            author = "Premium Social Creator";
            duration = "00:45";
            btnFallbackDownload.href = `https://savefrom.net/?url=${encodeURIComponent(url)}`;
            
            if (platformInfo && platformInfo.key === "tiktok") {
                thumbnail = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80"; // TikTok style
                title = "Trending TikTok Video (Premium Ad-Free)";
            } else if (platformInfo && platformInfo.key === "instagram") {
                thumbnail = "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=400&q=80"; // Insta style
                title = "Instagram Reel Feed Post";
            } else {
                thumbnail = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80"; // Facebook/General
                title = "Social Media Share Video";
            }
        }

        // Apply fields to UI
        resultTitle.textContent = title;
        resultAuthor.innerHTML = `<i class="far fa-user"></i> ${author}`;
        resultDuration.textContent = duration;
        resultThumbnail.src = thumbnail;
        
        // Update badge icon
        const iconClass = platformInfo ? platformInfo.icon : "fas fa-globe";
        resultPlatformBadge.innerHTML = `<i class="${iconClass}"></i>`;
    }

    // Extraction Trigger
    btnDownload.addEventListener("click", () => {
        const url = videoUrlInput.value.trim();
        if (!url) {
            alert("Please enter a valid video link.");
            return;
        }

        const platformInfo = detectPlatform(url);
        // Start extraction flow
        runExtraction(url, platformInfo);
    });

    // Allow enter key press to extract
    videoUrlInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnDownload.click();
        }
    });

    // Handle format quality dropdowns changes based on Audio/Video Selection
    formatType.addEventListener("change", () => {
        const type = formatType.value;
        formatQuality.innerHTML = "";
        
        if (type === "mp4") {
            formatQuality.innerHTML = `
                <option value="1080">1080p Full HD (Premium)</option>
                <option value="720" selected>720p HD</option>
                <option value="360">360p (SD)</option>
            `;
        } else {
            formatQuality.innerHTML = `
                <option value="320" selected>320kbps MP3 (Studio)</option>
                <option value="192">192kbps MP3 (HQ)</option>
                <option value="128">128kbps MP3 (Basic)</option>
            `;
        }
    });

    // Premium Ad-Free High Speed Download Simulation
    btnPremiumDownload.addEventListener("click", () => {
        btnPremiumDownload.disabled = true;
        downloadProgressContainer.style.display = "block";
        downloadProgressFill.style.width = "0%";
        
        let percentage = 0;
        const format = formatType.value;
        const quality = formatQuality.value;
        const title = resultTitle.textContent;
        
        // Pick random fast downloading speeds
        const speedInterval = setInterval(() => {
            const randomSpeed = (Math.random() * (12.4 - 4.8) + 4.8).toFixed(1);
            downloadProgressSpeed.textContent = `${randomSpeed} MB/s`;
        }, 800);

        const progressInterval = setInterval(() => {
            percentage += Math.floor(Math.random() * 4) + 1;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressInterval);
                clearInterval(speedInterval);
                
                downloadProgressText.textContent = "Processing complete! File saving...";
                downloadProgressFill.style.width = "100%";
                
                setTimeout(() => {
                    // Trigger actual mock file browser download
                    triggerMockDownload(title, format, quality);
                    
                    // Reset Button
                    btnPremiumDownload.disabled = false;
                    downloadProgressContainer.style.display = "none";
                }, 1000);
            } else {
                downloadProgressText.textContent = `Downloading: ${percentage}%`;
                downloadProgressFill.style.width = `${percentage}%`;
            }
        }, 80);
    });

    // Generates a mock downloaded file and saves it in the user's browser
    function triggerMockDownload(videoTitle, format, quality) {
        let extension = format;
        let fileContent = `MyTube Premium Downloader\n\nFile Name: ${videoTitle}\nFormat: ${format.toUpperCase()}\nQuality: ${quality}${format === 'mp4' ? 'p' : 'kbps'}\nStatus: Safe, Ad-free, high-speed verified.\n\nThank you for using MyTube! Open-source premium downloader.`;
        
        // Set Mime Type
        let mimeType = "text/plain";
        
        const blob = new Blob([fileContent], { type: mimeType });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        
        // Clean filename
        const safeName = videoTitle.toLowerCase().replace(/[^a-z0-9]+/g, "_");
        a.href = downloadUrl;
        a.download = `mytube_${safeName}_${quality}k.${extension}`;
        
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    }

    // FAQ Accordion Functionality
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all items
            faqItems.forEach(i => i.classList.remove("active"));
            
            // Open clicked if it wasn't open
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // Check URL parameters for Bookmarklet launch (e.g. ?url=...)
    const urlParams = new URLSearchParams(window.location.search);
    const incomingUrl = urlParams.get("url");
    
    if (incomingUrl) {
        videoUrlInput.value = incomingUrl;
        updateTheme();
        
        // Smooth scroll to downloader
        document.getElementById("downloader").scrollIntoView({ behavior: "smooth" });
        
        // Trigger download
        setTimeout(() => {
            btnDownload.click();
        }, 600);
    }
});
