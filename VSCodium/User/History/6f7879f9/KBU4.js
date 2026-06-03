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

    // ---- 3. SECURE LIVE AUDIO RE-ENGINEERED SYNC MATRIX ----
    let audioCtx = null;
    let audioSource = null;
    let analyser = null;
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

        // Playback Execution Switch
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
                engageLiveSyncVisualizer();
                runTimelineSync(slider, curTimeText);
            }
            return;
        }

        // Wipe running tracks clean
        killActiveAudioEngine();

        // Instantiate naked Audio component
        currentAudio = new Audio(audioUrl);
        currentAudio.crossOrigin = "anonymous"; // Safe server pipeline access flag
        activeTrackId = trackId;
        currentAudio.volume = volSlider.value;

        currentAudio.addEventListener('loadedmetadata', () => {
            slider.max = currentAudio.duration;
            totTimeText.innerText = convertClockNotation(currentAudio.duration);
        });

        currentAudio.play();
        btn.innerText = "PAUSE";
        bgVisualLayer.style.opacity = "1";

        // Try initialization of the secure server Web Audio API nodes
        try {
            setupLiveAudioNodes();
            engageLiveSyncVisualizer();
        } catch (error) {
            console.log("CORS security blocked node generation local file mode fallback triggered.");
        }

        runTimelineSync(slider, curTimeText);

        // Track user scrubber updates
        slider.addEventListener('input', () => {
            currentAudio.currentTime = slider.value;
            curTimeText.innerText = convertClockNotation(slider.value);
        });

        // Continuous volume listener
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

    function setupLiveAudioNodes() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 32; // Small footprint matrix for high performance optimization
        }
        if (!audioSource) {
            audioSource = audioCtx.createMediaElementSource(currentAudio);
            audioSource.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
    }

    // Connect background canvas to live analyser parameters
    function engageLiveSyncVisualizer() {
        if (!analyser) return;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function renderFrame() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);
            
            // Calculate Bass energy averages
            let energySum = 0;
            for (let i = 0; i < 4; i++) {
                energySum += dataArray[i];
            }
            const normalizedIntensity = energySum / 4 / 255; // Transform to a 0.0 - 1.0 floating percentage ratio

            if (normalizedIntensity > 0.1) {
                bgVisualLayer.style.opacity = (0.2 + (normalizedIntensity * 0.7)).toString();
                const redShift = Math.floor(normalizedIntensity * 120);
                bgVisualLayer.style.backgroundColor = `rgba(${130 + redShift}, 4, 10, 0.28)`;
                
                // Real-time responsive frame vibration matching track frequencies
                const jitterX = (Math.random() * 5 - 2.5) * normalizedIntensity;
                const jitterY = (Math.random() * 5 - 2.5) * normalizedIntensity;
                bgVisualLayer.style.transform = `scale(${1 + (normalizedIntensity * 0.02)}) translate(${jitterX}px, ${jitterY}px)`;
            } else {
                bgVisualLayer.style.opacity = "0.05";
                bgVisualLayer.style.backgroundColor = "rgba(0,0,0,0)";
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