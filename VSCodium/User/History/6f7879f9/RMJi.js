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
        // Generate a random tilt multiplier between -8deg and +8deg
        let randomTilt = (Math.random() * 16) - 8;
        
        // Prevent flat/uniform generations by pushing safe minimal offsets if close to 0
        if (Math.abs(randomTilt) < 2) {
            randomTilt = randomTilt < 0 ? -3 : 3;
        }
        
        // Inject custom design property right into the local container framework
        item.style.setProperty('--tilt-angle', `${randomTilt.toFixed(2)}deg`);
    });

    // ---- 4. AUDIO PLAYER MATRIX (COMPLETELY LOCAL COMPATIBLE) ----
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
                engageVisualizerLoop();
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
        engageVisualizerLoop();
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

    function engageVisualizerLoop() {
        let cycleTracker = 0;
        
        function render() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(render);

            cycleTracker += 0.25;
            const oscillator = Math.abs(Math.sin(cycleTracker) * Math.cos(cycleTracker * 0.6));
            const surgeChance = Math.random() > 0.85 ? 1.5 : 0.7;
            const currentIntensity = oscillator * surgeChance;

            if (currentIntensity > 0.12) {
                bgVisualLayer.style.opacity = (0.2 + (currentIntensity * 0.6)).toString();
                const colorFlux = Math.floor(currentIntensity * 85);
                bgVisualLayer.style.backgroundColor = `rgba(${140 + colorFlux}, 8, 12, 0.24)`;
                
                const vibrateX = (Math.random() * 6 - 3) * currentIntensity;
                const vibrateY = (Math.random() * 6 - 3) * currentIntensity;
                bgVisualLayer.style.transform = `scale(${1 + (currentIntensity * 0.012)}) translate(${vibrateX}px, ${vibrateY}px)`;
            } else {
                bgVisualLayer.style.opacity = "0.08";
            }
        }
        render();
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