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
        const customSvgDataUri = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23cc1122' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><g transform='rotate(${calculatedDegrees} 12 12)'><path d='M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z'/></g></svg>")`;
        
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