document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. DYNAMIC SYSTEM WEEKDAY LOADER ----
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDayName = days[new Date().getDay()];
    const liveDayField = document.getElementById('live-day-field');
    if (liveDayField) {
        liveDayField.innerText = `DAY: ${currentDayName}`;
    }

    // ---- 2. COPLAND OS TAB CONTROLLER ----
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.portfolio-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');
            const targetSec = document.getElementById(targetTab);
            
            if (targetSec) {
                sections.forEach(sec => sec.classList.remove('active'));
                navButtons.forEach(btn => btn.classList.remove('active'));
                targetSec.classList.add('active');
                e.currentTarget.classList.add('active');
            }
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

    // Safe initialization hook
    document.querySelectorAll('.timeline-slider, .volume-slider').forEach(slider => {
        if (slider) rotateShurikenKnob(slider);
    });

    playButtons.forEach(btn => {
        btn.addEventListener('click', toggleAudioTrack);
    });

    function toggleAudioTrack(e) {
        const btn = e.currentTarget;
        const trackId = btn.getAttribute('data-track-id');
        const audioUrl = btn.getAttribute('data-audio-url');
        
        const row = btn.closest('.track-row');
        if (!row) return; // Exit safely if layout structure is missing

        const slider = row.querySelector('.timeline-slider');
        const curTimeText = row.querySelector('.current-time');
        const totTimeText = row.querySelector('.total-time');
        const volSlider = row.querySelector('.volume-slider');

        if (currentAudio && activeTrackId === trackId) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                btn.innerText = "PLAY";
                if (bgVisualLayer) bgVisualLayer.style.opacity = "0";
                cancelAnimationFrame(visualAnimationLoop);
            } else {
                currentAudio.play();
                btn.innerText = "PAUSE";
                if (bgVisualLayer) bgVisualLayer.style.opacity = "1";
                engageDynamicsVisualizer();
                if (slider && curTimeText) runTimelineSync(slider, curTimeText);
            }
            return;
        }

        killActiveAudioEngine();

        currentAudio = new Audio(audioUrl);
        activeTrackId = trackId;
        
        if (volSlider) {
            liveVolumeTarget = parseFloat(volSlider.value);
            currentAudio.volume = liveVolumeTarget;
        }

        currentAudio.addEventListener('loadedmetadata', () => {
            if (slider) slider.max = currentAudio.duration;
            if (totTimeText) totTimeText.innerText = convertClockNotation(currentAudio.duration);
        });

        currentAudio.play();
        btn.innerText = "PAUSE";
        if (bgVisualLayer) bgVisualLayer.style.opacity = "1";
        
        engageDynamicsVisualizer();
        if (slider && curTimeText) runTimelineSync(slider, curTimeText);

        if (slider) {
            slider.addEventListener('input', () => {
                currentAudio.currentTime = slider.value;
                if (curTimeText) curTimeText.innerText = convertClockNotation(slider.value);
                rotateShurikenKnob(slider);
            });
        }

        if (volSlider) {
            volSlider.addEventListener('input', () => {
                liveVolumeTarget = parseFloat(volSlider.value);
                rotateShurikenKnob(volSlider);
                if (activeTrackId === trackId && currentAudio) {
                    currentAudio.volume = liveVolumeTarget;
                }
            });
        }

        currentAudio.onended = () => {
            btn.innerText = "PLAY";
            if (slider) slider.value = 0;
            if (curTimeText) curTimeText.innerText = "0:00";
            if (bgVisualLayer) bgVisualLayer.style.opacity = "0";
            killActiveAudioEngine();
        };
    }

    // Direct Inline Vector Redraw Engine with safety checks
    function rotateShurikenKnob(inputElement) {
        if (!inputElement) return;

        const currentVal = parseFloat(inputElement.value) || 0;
        const minVal = parseFloat(inputElement.min) || 0;
        const maxVal = parseFloat(inputElement.max) || 100;
        
        const totalPercentage = (currentVal - minVal) / (maxVal - minVal);
        const calculatedDegrees = Math.floor(totalPercentage * 720);
        
        const customSvgDataUri = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23cc1122'><g transform='rotate(${calculatedDegrees} 256 256)'><path d='M256 0c-4.4 38.6-20.7 75.3-46.7 105.1S148.6 156.4 110 162.1c51.2 13.9 94.6 47.7 121.2 94.5s31.7 101.4 14.1 152.4c17.5-51 46.5-96 83-129.5s81.9-57.5 131.7-68c-51-14-94.2-47.9-120.6-94.7S307.7 14.6 325.2-36.5C307.7 14.5 278.7 59.5 242.2 93S160.3 150.5 110.5 161c51 14 94.2 47.9 120.6 94.7s31.7 101.4 14.2 152.5C251 364 274.6 323.5 312 294.6s83.3-45.7 131.5-47.6c-49.8-5-95.6-26.6-129.5-61S260.6 104.2 256 0zm0 181.3c41.2 0 74.7 33.4 74.7 74.7s-33.4 74.7-74.7 74.7-74.7-33.4-74.7-74.7 33.4-74.7 74.7-74.7zm0 32c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7-42.7-19.1-42.7-42.7 19.1-42.7 42.7-42.7z'/></g></svg>")`;
        
        inputElement.style.setProperty('--shuriken-svg', customSvgDataUri);
    }

    // ---- 5. VOLUME INTENSITY & DYNAMICS OSCILLATOR LOOP ----
    function engageDynamicsVisualizer() {
        if (!bgVisualLayer) return;
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
        if (bgVisualLayer) bgVisualLayer.style.opacity = "0";
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