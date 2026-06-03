document.addEventListener('DOMContentLoaded', () => {
    
    // ---- 1. DYNAMIC WEEKDAY & COPLAND OS STATUS LOADER ----
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

    // ---- 3. BYPASSED LOCAL AUDIO ENGINE WITH SYNTHETIC FLICKER ----
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

        // Playback Switchboard State
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
                engageSyntheticVisualizer();
                runTimelineSync(slider, curTimeText);
            }
            return;
        }

        // Flush tracking layers
        killActiveAudioEngine();

        // Standard HTML5 Audio Initialization (Completely safe from Local CORS blocks)
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
        engageSyntheticVisualizer();
        runTimelineSync(slider, curTimeText);

        // Continuous user scrubbing capture input
        slider.addEventListener('input', () => {
            currentAudio.currentTime = slider.value;
            curTimeText.innerText = convertClockNotation(slider.value);
        });

        // Continuous volume tracking loop
        volSlider.addEventListener('input', () => {
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

    // Mathematical frequency wave synthesizer based on local frame markers
    // Bypasses MediaElementSource security entirely while maintaining the Fauux visual look
    function engageSyntheticVisualizer() {
        let clockCounter = 0;
        
        function renderFrame() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(renderFrame);

            clockCounter += 0.2;
            // Generate structured mathematical pseudo-random audio waves
            const dynamicWave = Math.abs(Math.sin(clockCounter) * Math.cos(clockCounter * 0.7));
            
            // Randomly simulate a burst rhythm drop spiking the layout elements
            const spikeFactor = Math.random() > 0.88 ? 1.4 : 0.8;
            const liveIntensity = dynamicWave * spikeFactor;

            if (liveIntensity > 0.15) {
                bgVisualLayer.style.opacity = (0.3 + (liveIntensity * 0.5)).toString();
                const redShift = Math.floor(liveIntensity * 90);
                bgVisualLayer.style.backgroundColor = `rgba(${120 + redShift}, 6, 12, 0.25)`;
                
                // Subtle static frame vibration shake matching the rhythm
                const shakeX = (Math.random() * 4 - 2) * liveIntensity;
                const shakeY = (Math.random() * 4 - 2) * liveIntensity;
                bgVisualLayer.style.transform = `scale(${1 + (liveIntensity * 0.015)}) translate(${shakeX}px, ${shakeY}px)`;
            } else {
                bgVisualLayer.style.opacity = "0.1";
            }
        }
        renderFrame();
    }

    function runTimelineSync(slider, display) {
        clearInterval(timelineInterval);
        timelineInterval = setInterval(() => {
            if (currentAudio && !currentAudio.paused) {
                slider.value = currentAudio.currentTime;
                display.innerText = convertClockNotation(currentAudio.currentTime);
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