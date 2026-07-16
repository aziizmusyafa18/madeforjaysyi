// Script - Undangan & Album Foto Ulang Tahun Aurelia Putri

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const bgMusic = document.getElementById("bg-music");
    const musicControl = document.getElementById("music-control");
    const musicToggleBtn = document.getElementById("music-toggle-btn");
    const musicIcon = musicToggleBtn.querySelector("i");

    const envelopeOverlay = document.getElementById("envelope-overlay");
    const envelope = document.getElementById("envelope");
    const waxSeal = document.getElementById("wax-seal");
    const mainContent = document.getElementById("main-content");
    const particlesContainer = document.getElementById("particles-container");

    const mainHeader = document.getElementById("main-header");
    const cakeSection = document.getElementById("cake-section");
    const albumSection = document.getElementById("album-section");
    const heartSection = document.getElementById("heart-section");
    const heartScreen = document.getElementById("heart-screen");
    const heartCenterText = document.getElementById("heart-center-text");
    const restartBtn = document.getElementById("restart-btn");

    // --- 1. Envelope Open Logic ---
    function openEnvelope() {
        if (envelope.classList.contains("opened")) return;
        
        envelope.classList.add("opened");
        playMusic();

        setTimeout(() => {
            envelopeOverlay.style.opacity = "0";
            envelopeOverlay.style.transform = "scale(0.9)";
            
            setTimeout(() => {
                envelopeOverlay.classList.add("hidden");
                mainContent.classList.remove("hidden");
                musicControl.classList.remove("hidden");
                startFloatingParticles();
            }, 800);
            
        }, 1800);
    }

    waxSeal.addEventListener("click", openEnvelope);
    envelope.addEventListener("click", openEnvelope);

    // --- 2. Music Player Logic ---
    let isPlaying = false;

    function playMusic() {
        bgMusic.play()
            .then(() => {
                isPlaying = true;
                musicIcon.className = "fa-solid fa-compact-disc rotate";
                musicToggleBtn.classList.add("playing");
            })
            .catch(error => {
                console.log("Autoplay blocked by browser. User interaction required.", error);
            });
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicIcon.className = "fa-solid fa-compact-disc";
        musicToggleBtn.classList.remove("playing");
    }

    musicToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // --- 3. Floating Particles (Hearts & Flowers) ---
    const particleTypes = [
        '<span style="color: #8B5E3C;">★</span>', 
        '<span style="color: #C9956A;">✦</span>', 
        '<span style="color: #D4A76A;">⬡</span>', 
        '<span style="color: #A0734E;">✧</span>',
        '<span style="color: #EDD9BE;">✨</span>'
    ];

    function createParticle() {
        if (!particlesContainer) return;

        const particle = document.createElement("div");
        particle.className = "particle";
        
        const randomType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particle.innerHTML = randomType;
        
        particle.style.left = Math.random() * 100 + "%";
        
        const size = Math.random() * (24 - 12) + 12;
        particle.style.fontSize = size + "px";
        
        const duration = Math.random() * (9 - 5) + 5;
        particle.style.animationDuration = duration + "s";

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    let particleInterval;
    function startFloatingParticles() {
        if (!particleInterval) {
            particleInterval = setInterval(createParticle, 400);
        }
    }

    function stopFloatingParticles() {
        clearInterval(particleInterval);
        particleInterval = null;
    }

    // --- 4. Confetti Celebration Trigger ---
    function triggerConfetti(customContainer = null) {
        // Fallback to cake container if no custom container is specified
        const container = customContainer || document.querySelector(".cake-container");
        if (!container) return;

        const colors = ['#FF8C94', '#FFB7B2', '#FFD3B6', '#FFAAA6', '#BFFCC6', '#DBFFD6', '#FFF5F5'];
        const isBody = container === document.body;
        
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement("div");
            confetti.style.position = "absolute";
            confetti.style.width = Math.random() * (12 - 6) + 6 + "px";
            confetti.style.height = Math.random() * (12 - 6) + 6 + "px";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            if (isBody) {
                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.top = Math.random() * 50 + "%";
            } else {
                confetti.style.left = "50%";
                confetti.style.bottom = "50px"; 
            }
            
            confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
            confetti.style.zIndex = "99";
            confetti.style.pointerEvents = "none";
            
            const angle = Math.random() * Math.PI - Math.PI; // Upward direction
            const velocity = Math.random() * (12 - 4) + 4;
            let xVel = Math.cos(angle) * velocity;
            let yVel = Math.sin(angle) * velocity - 5;
            
            let curX = 0;
            let curY = 0;
            let opacity = 1;
            
            container.appendChild(confetti);
            
            const interval = setInterval(() => {
                curX += xVel;
                curY += yVel;
                yVel += 0.3; // Gravity
                xVel *= 0.98; // Air resistance
                opacity -= 0.015; // Fade
                
                confetti.style.transform = `translate(${curX}px, ${curY}px) rotate(${curX * 3}deg)`;
                confetti.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(interval);
                    confetti.remove();
                }
            }, 20);
        }
    }

    // --- 5. Interactive Cake Candle Blowing Logic (Clicking the cake blows all candles at once) ---
    const cake = document.getElementById("cake");
    const flames = document.querySelectorAll(".flame");
    const wishReveal = document.getElementById("wish-reveal");
    let cakeBlown = false;

    cake.addEventListener("click", (e) => {
        e.stopPropagation();
        if (cakeBlown) return;
        cakeBlown = true;

        // Blow all flames at once
        flames.forEach(flame => flame.classList.add("blown"));

        setTimeout(() => {
            wishReveal.classList.remove("hidden");
            triggerConfetti();

            // After 4 seconds, smoothly transition to the Photo Album
            setTimeout(() => {
                mainHeader.style.opacity = "0";
                mainHeader.style.transform = "translateY(-15px)";
                cakeSection.style.opacity = "0";
                cakeSection.style.transform = "translateY(-15px)";

                setTimeout(() => {
                    mainHeader.classList.add("hidden");
                    cakeSection.classList.add("hidden");
                    
                    // Reveal Photo Album
                    albumSection.classList.remove("hidden");
                    albumSection.style.opacity = "0";
                    albumSection.style.transform = "translateY(15px)";
                    
                    setTimeout(() => {
                        albumSection.style.opacity = "1";
                        albumSection.style.transform = "translateY(0)";
                        albumSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                    }, 50);
                }, 600);
            }, 4000);

        }, 400);
    });

    // --- 6. Interactive Photo Album Page Flipping ---
    const pages = document.querySelectorAll(".album-page");
    const albumPrevBtn = document.getElementById("album-prev-btn");
    const albumNextBtn = document.getElementById("album-next-btn");
    
    let activePageIndex = 0;
    const totalPages = pages.length;

    function updateNavigation() {
        // Prev button state
        if (activePageIndex === 0) {
            albumPrevBtn.disabled = true;
            albumPrevBtn.classList.add("disabled");
        } else {
            albumPrevBtn.disabled = false;
            albumPrevBtn.classList.remove("disabled");
        }

        // Next button state
        if (activePageIndex === totalPages - 1) {
            albumNextBtn.disabled = true;
            albumNextBtn.classList.add("disabled");
        } else {
            albumNextBtn.disabled = false;
            albumNextBtn.classList.remove("disabled");
        }
    }

    function flipNext() {
        if (activePageIndex < totalPages - 1) {
            const currentPage = pages[activePageIndex];
            currentPage.classList.add("flipped");
            currentPage.classList.remove("active");
            
            activePageIndex++;
            
            const nextPage = pages[activePageIndex];
            nextPage.classList.add("active");
            
            updateNavigation();
        }
    }

    function flipPrev() {
        if (activePageIndex > 0) {
            const currentPage = pages[activePageIndex];
            currentPage.classList.remove("active");
            
            activePageIndex--;
            
            const prevPage = pages[activePageIndex];
            prevPage.classList.remove("flipped");
            prevPage.classList.add("active");
            
            updateNavigation();
        }
    }

    // Next page click trigger on navigation button
    albumNextBtn.addEventListener("click", flipNext);

    // Previous page click trigger on navigation button
    albumPrevBtn.addEventListener("click", flipPrev);

    // Clicking the pages directly flips them forward!
    pages.forEach((page, idx) => {
        page.addEventListener("click", () => {
            if (idx === activePageIndex) {
                if (activePageIndex < totalPages - 1) {
                    flipNext();
                } else {
                    // Last page ("Terima Kasih") clicked -> Transition to Heart Screen!
                    transitionToHeartScreen();
                }
            }
        });
    });

    // --- 7. Love Photo Grid Animation Screen ---
    const albumImages = ["img/foto1.jpeg", "img/foto2.jpeg", "img/foto3.jpeg", "img/foto4.jpeg"];

    function transitionToHeartScreen() {
        // Fade out album section
        albumSection.style.opacity = "0";
        albumSection.style.transform = "scale(0.95)";
        albumSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        
        setTimeout(() => {
            albumSection.classList.add("hidden");
            
            // Show heart section
            heartSection.classList.remove("hidden");
            heartSection.style.opacity = "0";
            heartSection.style.transform = "scale(0.95)";
            
            setTimeout(() => {
                heartSection.style.opacity = "1";
                heartSection.style.transform = "scale(1)";
                heartSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                
                // Trigger photo flying heart animation
                showHeartAnimation();
            }, 50);
        }, 600);
    }

    function showHeartAnimation() {
        const totalPhotos = 16;
        const scaleX = 9.5;
        const scaleY = 9.5;
        const heartPhotos = [];

        // 1. Generate 16 photo elements positioned at center (scale 0)
        for (let i = 0; i < totalPhotos; i++) {
            const div = document.createElement("div");
            div.className = "heart-photo";
            
            const img = document.createElement("img");
            // Cycle through our 4 local files
            img.src = albumImages[i % albumImages.length];
            div.appendChild(img);
            
            // Initial style collapsed at center
            div.style.left = "50%";
            div.style.top = "50%";
            div.style.transform = "translate(-50%, -50%) scale(0) rotate(0deg)";
            div.style.opacity = "0";
            
            // Append to screen container
            heartScreen.appendChild(div);
            heartPhotos.push(div);
        }

        // Force a DOM layout reflow
        window.getComputedStyle(heartScreen).opacity;

        // 2. Trigger the flight animation to form a heart shape using parametric math
        setTimeout(() => {
            for (let i = 0; i < totalPhotos; i++) {
                const div = heartPhotos[i];
                
                // t varies from 0 to 2*PI
                const t = (i / totalPhotos) * 2 * Math.PI;
                
                // Parametric equation of a heart
                let x = 16 * Math.pow(Math.sin(t), 3);
                let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
                
                // Invert Y axis for screen space
                y = -y;
                
                // Add a random slight rotation for scattered collage look
                const randomRotate = (Math.random() - 0.5) * 25; // between -12.5 and +12.5 degrees
                
                // Apply absolute position and transform coordinates
                div.style.left = `calc(50% + ${x * scaleX}px)`;
                div.style.top = `calc(50% + ${y * scaleY + 15}px)`; // offset Y slightly to balance center text
                div.style.transform = `translate(-50%, -50%) scale(1) rotate(${randomRotate}deg)`;
                div.style.opacity = "1";
            }

            // 3. Fade in birthday greeting text in the center after 1.2s (when photos land)
            setTimeout(() => {
                heartCenterText.classList.remove("hidden");
                triggerConfetti(document.body); // Let confetti fall all over the screen!
            }, 1200);

        }, 100);
    }

    // --- 8. Reset and Restart Logic ---
    restartBtn.addEventListener("click", () => {
        // 1. Clean up heart photo divs
        const generatedPhotos = heartScreen.querySelectorAll(".heart-photo");
        generatedPhotos.forEach(p => p.remove());
        
        // Hide elements
        heartCenterText.classList.add("hidden");
        heartSection.classList.add("hidden");
        
        // 2. Reset Photo Album Pages
        activePageIndex = 0;
        pages.forEach((page, idx) => {
            page.classList.remove("flipped");
            if (idx === 0) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });
        updateNavigation();

        // 3. Reset Cake Candles
        cakeBlown = false;
        flames.forEach(flame => {
            flame.classList.remove("blown");
        });
        wishReveal.classList.add("hidden");

        // 4. Reset display blocks
        mainHeader.classList.remove("hidden");
        mainHeader.style.opacity = "1";
        mainHeader.style.transform = "translateY(0)";
        
        cakeSection.classList.remove("hidden");
        cakeSection.style.opacity = "1";
        cakeSection.style.transform = "translateY(0)";

        // 5. Hide main layout, stop BGM, and reset overlay
        pauseMusic();
        mainContent.classList.add("hidden");
        musicControl.classList.add("hidden");
        stopFloatingParticles();

        envelope.classList.remove("opened");
        envelopeOverlay.classList.remove("hidden");
        envelopeOverlay.style.opacity = "1";
        envelopeOverlay.style.transform = "scale(1)";
    });
});
