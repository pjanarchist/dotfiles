document.addEventListener('DOMContentLoaded', () => {
    
    // ---- 1. TRACK BPM DICTIONARY MATRIX ----
    // Adjust these numbers to match the actual tempo of each track!
    const TRACK_BPMS = {
        "1": 120, // Track 1 tempo
        "2": 140, // Track 2 tempo
        "3": 95,  // Track 3 tempo
        "4": 120,
        "5": 120,
        "6": 120
    };

    // ---- 2. DYNAMIC SYSTEM WEEKDAY LOADER ----
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDayName = days[new Date().getDay()];
    document.getElementById('live-day-field').innerText = `DAY: ${currentDayName}`;

    // ---- 3. COPLAND OS TAB CONTROLLER ----
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

    // ---- 4. NON-UNIFORM GALLERY TILT ENGINE ----
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    galleryItems.forEach(item => {
        let randomTilt = (Math.random() * 16) - 8;
        if (Math.abs(randomTilt) < 2) {
            randomTilt = randomTilt < 0 ? -3 : 3;
        }
        item.style.setProperty('--tilt-angle', `${randomTilt.toFixed(2)}deg`);
    });

    // ---- 5. AUDIO COPLAND SYSTEM RACK ENGINE ----
    let currentAudio = null;
    let activeTrackId = null;
    let timelineInterval = null;
    let visualAnimationLoop = null;

    const bgVisualLayer = document.getElementById('audio-visual-bg');
    const playButtons = document.querySelectorAll('.play-btn');

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
                engageBPMSyncVisualizer(TRACK_BPMS[trackId] || 120);
                runTimelineSync(slider, curTimeText);
            }
            return;
        }

        killActiveAudioEngine();

        currentAudio = new Audio(audioUrl);
        activeTrackId = trackId;
        currentAudio.volume = volSlider.value;

        currentAudio.addEventListener('loadedmetadata', () => {
            slider.max = currentAudio.duration;
            totTimeText.innerText = convertClockNotation(currentAudio.duration);
        });

        currentAudio.play();
        btn.innerText = "PAUSE";
        bgVisualLayer.style.opacity = "1";
        
        // Load the explicit track BPM into the background strobe engine
        engageBPMSyncVisualizer(TRACK_BPMS[trackId] || 120);
        runTimelineSync(slider, curTimeText);

        slider.addEventListener('input', () => {
            currentAudio.currentTime = slider.value;
            curTimeText.innerText = convertClockNotation(slider.value);
            rotateShurikenKnob(slider);
        });

        volSlider.addEventListener('input', () => {
            rotateShurikenKnob(volSlider);
            if (activeTrackId === trackId && currentAudio) {
                currentAudio.volume = volSlider.value;
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

    function rotateShurikenKnob(inputElement) {
        const currentVal = parseFloat(inputElement.value);
        const maxVal = parseFloat(inputElement.max) || 100;
        const totalPercentage = currentVal / maxVal;
        const calculatedDegrees = totalPercentage * 720;
        inputElement.style.setProperty('--shuriken-rotation', `${calculatedDegrees}deg`);
    }

    // ---- 6. HIGH-PERFORMANCE RHYTHMIC BPM STROBE HARNESS ----
    function engageBPMSyncVisualizer(bpm) {
        // Translate BPM directly to explicit wave cycle millisecond frequencies
        const beatIntervalInSeconds = 60 / bpm;
        const halfBeatInterval = beatIntervalInSeconds / 2;

        function renderLoop() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(renderLoop);

            // Fetch live operational track timestamps
            const currentTime = currentAudio.currentTime;
            
            // Calculate position inside the current individual beat cycle loop
            const positionInBeat = currentTime % beatIntervalInSeconds;
            
            let alphaIntensity = 0;
            let scalePulse = 1;

            // Generate clean linear exponential ramp drops tracking the downbeat
            if (positionInBeat < halfBeatInterval) {
                // Decay ramp ratio from 1.0 straight to 0.0 down the scale line
                const decayRatio = 1 - (positionInBeat / halfBeatInterval);
                alphaIntensity = decayRatio * 0.5; // Max brightness roof safety barrier
                scalePulse = 1 + (decayRatio * 0.025);
            }

            // Apply calculated geometric variables straight to hardware acceleration layers
            if (alphaIntensity > 0.02) {
                bgVisualLayer.style.opacity = "1";
                // Generate crisp cyber glitch random shake offsets during the peak pulse hits
                const jitterX = (Math.random() * 4 - 2) * alphaIntensity;
                const jitterY = (Math.random() * 4 - 2) * alphaIntensity;
                
                bgVisualLayer.style.backgroundColor = `rgba(${130 + Math.floor(alphaIntensity * 90)}, 6, 12, ${alphaIntensity})`;
                bgVisualLayer.style.transform = `scale(${scalePulse}) translate(${jitterX}px, ${jitterY}px)`;
            } else {
                bgVisualLayer.style.backgroundColor = "rgba(0, 0, 0, 0)";
                bgVisualLayer.style.transform = "scale(1) translate(0px, 0px)";
                bgVisualLayer.style.opacity = "0.05";
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
        document.querySelectorAll('.timeline-slider').forEach(s => s.value = 0);
        document.querySelectorAll('.current-time').forEach(t => t.innerText = "0:00");
    }

    function convertClockNotation(seconds) {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }
});