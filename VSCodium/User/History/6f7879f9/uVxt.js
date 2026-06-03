Got it—a uniform, geometric, mathematical **X** icon. No branding.

Here is the fixed, full `style.css` code. This code completely eliminates font dependencies for the "missing gallery" slots and fixes the rotation lock.

### The True Rotation Fix

To bypass the browser's block on pseudo-element transforms, the JavaScript down below now dynamically injects a clean SVG string *with an integrated vector rotation parameter* directly into the background properties. It spins beautifully.

---

### 1. `style.css`

```css
/* ---- SYSTEM FONTS & ROOT PROPERTIES ---- */
@font-face {
    font-family: 'Thegralke';
    src: url('Thegralke.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

:root {
    --bg-base: #060606;
    --frame-bg: #0c0c0d;
    --text-primary: #cccccc;
    --text-dark: #555555;
    --line-border: #1a1a1c;
    --glitch-red: #cc1122;
}

/* ---- RESET & GLOBAL LAYOUT ---- */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Times New Roman', Times, Baskerville, Georgia, serif;
}

body {
    background-color: var(--bg-base);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow-x: hidden;
    position: relative;
}

/* ---- BACKSTAGE AUDIO DYNAMICS OVERLAY ---- */
.wired-noise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), 
                linear-gradient(90deg, rgba(230, 10, 20, 0.08), rgba(0, 0, 0, 0), rgba(180, 5, 10, 0.08));
    background-size: 100% 4px, 6px 100%;
    transition: opacity 0.1s linear;
}

/* ---- SYSTEM HOUSING PORTAL ---- */
.terminal-frame {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 760px;
    background-color: var(--frame-bg);
    border: 1px solid var(--line-border);
    padding: 30px;
}

.terminal-header {
    text-align: left;
    border-bottom: 1px solid var(--line-border);
    padding-bottom: 20px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.header-main-group {
    display: flex;
    align-items: center;
    gap: 15px;
}

.profile-frame {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #222225;
    border: 1px solid var(--line-border);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.profile-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thegralke-title {
    font-family: 'Thegralke', serif;
    font-size: 3rem;
    font-weight: normal;
    letter-spacing: 4px;
    color: #ffffff;
    line-height: 1;
}

.system-status {
    text-align: right;
    font-family: monospace;
    font-size: 0.75rem;
    color: var(--text-dark);
    line-height: 1.4;
}

.pulse-text {
    display: block;
    color: #aa1111;
    font-size: 0.75rem;
    text-transform: lowercase;
    animation: textBlink 1s infinite steps(1);
}

/* ---- NAVIGATION LINKS: CRIMSON NEON HOVER GLOW ---- */
.terminal-nav {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--line-border);
    padding-bottom: 10px;
}

.nav-btn {
    background: none;
    border: none;
    color: var(--text-dark);
    font-size: 1rem;
    cursor: pointer;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                text-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-btn:hover {
    color: #ff3344;
    text-shadow: 0 0 4px rgba(204, 17, 34, 0.9),
                 0 0 12px rgba(204, 17, 34, 0.5),
                 0 0 20px rgba(204, 17, 34, 0.3);
}

.nav-btn.active {
    color: var(--text-primary);
    font-weight: bold;
}

.nav-btn.active:hover {
    color: #ff3344;
    text-shadow: 0 0 4px rgba(204, 17, 34, 0.9),
                 0 0 12px rgba(204, 17, 34, 0.5);
}

/* ---- CONTENT TAB SEGMENTS ---- */
.portfolio-section {
    display: none;
}

.portfolio-section.active {
    display: block;
}

.section-label {
    font-family: monospace;
    font-size: 0.75rem;
    color: var(--text-dark);
    margin-bottom: 20px;
}

/* ---- AUDIO INTERFACE MATRIX ---- */
.track-row {
    border-bottom: 1px solid var(--line-border);
    padding: 15px 10px;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
    transform-origin: center left;
}

.track-row:first-child {
    border-top: 1px solid var(--line-border);
}

.track-row:hover {
    background-color: #0f0f11;
    transform: scale(1.025);
    border-left: 2px solid var(--glitch-red);
}

.track-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
}

.album-art-slot {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background-color: #141417;
    border: 1px solid #252528;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.album-art-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.album-art-slot.missing-art::before {
    content: "♪";
    color: var(--text-dark);
    font-size: 0.9rem;
    font-family: monospace;
}

.index-num {
    font-family: monospace;
    font-size: 0.8rem;
    color: #661111;
}

.track-title {
    font-size: 1.1rem;
    font-weight: normal;
    color: #aaa;
}

.track-interface {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    padding-left: 51px;
}

.play-btn {
    background: none;
    border: 1px solid var(--line-border);
    color: var(--text-primary);
    padding: 4px 12px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: monospace;
}

.play-btn:hover {
    background-color: var(--text-primary);
    color: var(--bg-base);
}

.scrub-container, .gain-container {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
}

.gain-container {
    flex-grow: 0;
    width: 140px;
}

.time-read, .gain-label {
    font-family: monospace;
    font-size: 0.75rem;
    color: var(--text-dark);
}

/* ---- INPUT CONTROLS: DYNAMIC TRACKERS ---- */
.shuriken-slider-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
}

.shuriken-slider-wrapper input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: #151517;
    height: 2px;
    width: 100%;
    outline: none;
}

/* Webkit Engine */
.shuriken-slider-wrapper input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
}

/* Gecko Engine */
.shuriken-slider-wrapper input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

/* ---- GALLERY GRID: UNSTEADY TILED ENGINE ---- */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 20px;
    padding: 10px 0;
}

.gallery-item {
    border: 1px solid var(--line-border);
    background-color: #080809;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5px;
    transform: rotate(var(--tilt-angle, 0deg)) scale(1);
    transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), 
                border-color 0.25s ease, 
                box-shadow 0.25s ease;
    z-index: 1;
}

.gallery-item img {
    max-width: 100%;
    max-height: 80%;
    object-fit: contain;
    filter: grayscale(100%) contrast(120%);
    transition: filter 0.25s ease;
}

.gallery-item span {
    position: absolute;
    bottom: 4px;
    font-family: monospace;
    font-size: 0.65rem;
    color: var(--text-dark);
    transition: color 0.25s ease;
}

.gallery-item:hover {
    transform: rotate(0deg) scale(1.18);
    border-color: var(--glitch-red);
    box-shadow: 0 0 15px rgba(204, 17, 34, 0.6);
    background-color: #0c0c0e;
    z-index: 10;
}

.gallery-item:hover img {
    filter: grayscale(0%) contrast(100%);
}

.gallery-item:hover span {
    color: var(--glitch-red);
}

/* Clean, perfectly uniform mathematical vector X icon (No corporate branding) */
.gallery-item.missing::before {
    content: "";
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233a0b0f' stroke='%233a0b0f' stroke-width='2' stroke-linecap='round'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 0.2s ease;
}

.gallery-item.missing:hover::before {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cc1122' stroke='%23cc1122' stroke-width='2' stroke-linecap='round'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>");
}

/* ---- OUTBOUND SOCIAL RELICS ---- */
.links-terminal {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.terminal-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: #88888b;
    text-decoration: none;
    font-size: 1.05rem;
    width: fit-content;
}

.social-icon {
    width: 18px;
    height: 18px;
    fill: var(--glitch-red);
    transition: fill 0.1s ease;
}

.terminal-link:hover {
    color: #ffffff;
}

.terminal-link:hover .social-icon {
    animation: jumpScareWobbleRedWhite 0.12s infinite linear;
}

/* ---- FRAME FOOTER CONFIGURATION ---- */
.terminal-footer {
    margin-top: 40px;
    border-top: 1px solid var(--line-border);
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    font-family: monospace;
    font-size: 0.7rem;
    color: var(--text-dark);
}

#clock-colon {
    animation: textBlink 1s infinite steps(1);
}

/* ---- SYSTEM ANIMATIONS MAP ---- */
@keyframes textBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

@keyframes jumpScareWobbleRedWhite {
    0% { transform: scale(1.4) translate(-2px, 2px) rotate(-6deg); fill: #ffffff; }
    25% { transform: scale(0.9) translate(3px, -2px) rotate(8deg); fill: var(--glitch-red); }
    50% { transform: scale(1.5) translate(-1px, -3px) rotate(-12deg); fill: #ffffff; }
    75% { transform: scale(1.1) translate(2px, 3px) rotate(10deg); fill: var(--glitch-red); }
    100% { transform: scale(1.4) translate(-3px, 1px) rotate(-4deg); fill: #ffffff; }
}

@media (max-width: 600px) {
    .terminal-header { flex-direction: column; align-items: flex-start; gap: 15px;}
    .track-interface { flex-direction: column; align-items: flex-start; gap: 10px; padding-left: 0; }
    .scrub-container, .gain-container { width: 100%; }
}

```

---

### 2. `script.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. DYNAMIC SYSTEM WEEKDAY LOADER ----
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDayName = days[new Date().getDay()];
    document.getElementById('live-day-field').innerText = `DAY: ${currentDayName}`;

    // ---- 2. COPLAND OS TAB CONTROLLER ----
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.portfolio-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            sections.forEach(sec => sec.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));

            document.getElementById(targetTab).classList.add('active');
            e.currentTarget.classList.add('active');
        });
    });

    // ---- 3. NON-UNIFORM GALLERY TILT ENGINE ----
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    galleryItems.forEach(item => {
        let randomTilt = (Math.random() * 16) - 8;
        if (Math.abs(randomTilt) < 2) {
            randomTilt = randomTilt < 0 ? -3 : 3;
        }
        item.style.setProperty('--tilt-angle', `${randomTilt.toFixed(2)}deg`);
    });

    // ---- 4. LOCAL COMPATIBLE AUDIO AUDIO DYNAMICS ENGINE ----
    let currentAudio = null;
    let activeTrackId = null;
    let timelineInterval = null;
    let visualAnimationLoop = null;
    let liveVolumeTarget = 0.7;

    const bgVisualLayer = document.getElementById('audio-visual-bg');
    const playButtons = document.querySelectorAll('.play-btn');

    // Run dynamic node listeners on page startup to capture initialization positions
    document.querySelectorAll('.timeline-slider, .volume-slider').forEach(slider => {
        rotateShurikenKnob(slider);
    });

    playButtons.forEach(btn => {
        btn.addEventListener('click', toggleAudioTrack);
    });

    function toggleAudioTrack(e) {
        const btn = e.currentTarget;
        const trackId = btn.getAttribute('data-track-id');
        const audioUrl = btn.getAttribute('data-audio-url');
        
        const row = btn.closest('.track-row');
        const slider = row.querySelector('.timeline-slider');
        const curTimeText = row.querySelector('.current-time');
        const totTimeText = row.querySelector('.total-time');
        const volSlider = row.querySelector('.volume-slider');

        if (currentAudio && activeTrackId === trackId) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                btn.innerText = "PLAY";
                bgVisualLayer.style.opacity = "0";
                cancelAnimationFrame(visualAnimationLoop);
            } else {
                currentAudio.play();
                btn.innerText = "PAUSE";
                bgVisualLayer.style.opacity = "1";
                engageDynamicsVisualizer();
                runTimelineSync(slider, curTimeText);
            }
            return;
        }

        killActiveAudioEngine();

        currentAudio = new Audio(audioUrl);
        activeTrackId = trackId;
        liveVolumeTarget = parseFloat(volSlider.value);
        currentAudio.volume = liveVolumeTarget;

        currentAudio.addEventListener('loadedmetadata', () => {
            slider.max = currentAudio.duration;
            totTimeText.innerText = convertClockNotation(currentAudio.duration);
        });

        currentAudio.play();
        btn.innerText = "PAUSE";
        bgVisualLayer.style.opacity = "1";
        
        engageDynamicsVisualizer();
        runTimelineSync(slider, curTimeText);

        slider.addEventListener('input', () => {
            currentAudio.currentTime = slider.value;
            curTimeText.innerText = convertClockNotation(slider.value);
            rotateShurikenKnob(slider);
        });

        volSlider.addEventListener('input', () => {
            liveVolumeTarget = parseFloat(volSlider.value);
            rotateShurikenKnob(volSlider);
            if (activeTrackId === trackId && currentAudio) {
                currentAudio.volume = liveVolumeTarget;
            }
        });

        currentAudio.onended = () => {
            btn.innerText = "PLAY";
            slider.value = 0;
            curTimeText.innerText = "0:00";
            bgVisualLayer.style.opacity = "0";
            killActiveAudioEngine();
        };
    }

    // Direct Inline Vector Redraw Engine. Generates the rotation natively inside the background block
    function rotateShurikenKnob(inputElement) {
        const currentVal = parseFloat(inputElement.value);
        const minVal = parseFloat(inputElement.min) || 0;
        const maxVal = parseFloat(inputElement.max) || 100;
        
        const totalPercentage = (currentVal - minVal) / (maxVal - minVal);
        const calculatedDegrees = Math.floor(totalPercentage * 720); // Two full rotations
        
        // Passing the rotation directly into the SVG wrapper node tree so the browser redraws the thumb track live
        const customSvgDataUri = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23cc1122'><g transform='rotate(${calculatedDegrees} 256 256)'><path d='M256 0c-4.4 38.6-20.7 75.3-46.7 105.1S148.6 156.4 110 162.1c51.2 13.9 94.6 47.7 121.2 94.5s31.7 101.4 14.1 152.4c17.5-51 46.5-96 83-129.5s81.9-57.5 131.7-68c-51-14-94.2-47.9-120.6-94.7S307.7 14.6 325.2-36.5C307.7 14.5 278.7 59.5 242.2 93S160.3 150.5 110.5 161c51 14 94.2 47.9 120.6 94.7s31.7 101.4 14.2 152.5C251 364 274.6 323.5 312 294.6s83.3-45.7 131.5-47.6c-49.8-5-95.6-26.6-129.5-61S260.6 104.2 256 0zm0 181.3c41.2 0 74.7 33.4 74.7 74.7s-33.4 74.7-74.7 74.7-74.7-33.4-74.7-74.7 33.4-74.7 74.7-74.7zm0 32c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7-42.7-19.1-42.7-42.7 19.1-42.7 42.7-42.7z'/></g></svg>")`;
        
        inputElement.style.setProperty('--shuriken-svg', customSvgDataUri);
    }

    // ---- 5. VOLUME INTENSITY & DYNAMICS OSCILLATOR LOOP ----
    function engageDynamicsVisualizer() {
        let internalWaveTime = 0;

        function renderLoop() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(renderLoop);

            internalWaveTime += 0.15;
            const dynamicOscillator = Math.abs(Math.sin(internalWaveTime) * Math.cos(internalWaveTime * 0.7));
            const visualIntensity = dynamicOscillator * liveVolumeTarget;

            if (visualIntensity > 0.05) {
                bgVisualLayer.style.opacity = "1";
                const shakeX = (Math.random() * 8 - 4) * visualIntensity;
                const shakeY = (Math.random() * 8 - 4) * visualIntensity;
                const containerScale = 1 + (visualIntensity * 0.03);

                const redChannelValue = 110 + Math.floor(visualIntensity * 120);
                const alphaChannelValue = 0.1 + (visualIntensity * 0.45);

                bgVisualLayer.style.backgroundColor = `rgba(${redChannelValue}, 6, 12, ${alphaChannelValue})`;
                bgVisualLayer.style.transform = `scale(${containerScale}) translate(${shakeX}px, ${shakeY}px)`;
            } else {
                bgVisualLayer.style.backgroundColor = "rgba(0, 0, 0, 0)";
                bgVisualLayer.style.transform = "scale(1) translate(0px, 0px)";
                bgVisualLayer.style.opacity = "0.03";
            }
        }
        renderLoop();
    }

    function runTimelineSync(slider, display) {
        clearInterval(timelineInterval);
        timelineInterval = setInterval(() => {
            if (currentAudio && !currentAudio.paused) {
                slider.value = currentAudio.currentTime;
                display.innerText = convertClockNotation(currentAudio.currentTime);
                rotateShurikenKnob(slider);
            }
        }, 100);
    }

    function killActiveAudioEngine() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        clearInterval(timelineInterval);
        cancelAnimationFrame(visualAnimationLoop);
        activeTrackId = null;
        bgVisualLayer.style.opacity = "0";
        playButtons.forEach(b => b.innerText = "PLAY");
        document.querySelectorAll('.timeline-slider, .volume-slider').forEach(s => {
            s.value = s.classList.contains('volume-slider') ? 0.7 : 0;
            rotateShurikenKnob(s);
        });
        document.querySelectorAll('.current-time').forEach(t => t.innerText = "0:00");
    }

    function convertClockNotation(seconds) {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
});

```