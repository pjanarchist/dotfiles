document.addEventListener('DOMContentLoaded', () => {
    
    // ---- 1. COPLAND OS TAB CONTROLLER ----
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

    // ---- 2. AUDIO STORAGE MODULE WITH LIVE RED FLICKER ANALYSIS ----
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

        // Playback Execution Switch (If operating same active terminal)
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

        // Wipe out any running concurrent data stems
        killActiveAudioEngine();

        // Instantiate naked HTML5 Audio object
        currentAudio = new Audio(audioUrl);
        currentAudio.crossOrigin = "anonymous"; // Safe boundary fallback setup
        activeTrackId = trackId;
        currentAudio.volume = volSlider.value;

        currentAudio.addEventListener('loadedmetadata', () => {
            slider.max = currentAudio.duration;
            totTimeText.innerText = convertClockNotation(currentAudio.duration);
        });

        // Instantiate low-latency system data node connection
        setupAudioContextNode();

        currentAudio.play();
        btn.innerText = "PAUSE";
        bgVisualLayer.style.opacity = "1";
        engageVisualizerLoop();
        runTimelineSync(slider, curTimeText);

        // Continuous timeline scrubber binding
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

    function setupAudioContextNode() {
        // Safe check initialization to bypassed browser security blocks
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 32; // Small matrix footprint size = ultra light calculation profile
        }
        
        // Feed the stream source pipeline
        audioSource = audioCtx.createMediaElementSource(currentAudio);
        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
    }

    // Low-performance processing real-time background rendering loop
    function engageVisualizerLoop() {
        if (!analyser) return;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function renderFrame() {
            if (!currentAudio || currentAudio.paused) return;
            visualAnimationLoop = requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);
            
            // Isolate Bass dynamics average
            let bassSum = 0;
            for (let i = 0; i < 4; i++) {
                bassSum += dataArray[i];
            }
            const bassIntensity = bassSum / 4; // Normalized range baseline (0-255)

            // Map data straight to hardware-friendly CSS transforms and background parameters
            if (bassIntensity > 20) {
                const flickerLevel = (bassIntensity / 255) * 0.9;
                const redShift = Math.floor((bassIntensity / 255) * 120);
                
                bgVisualLayer.style.backgroundColor = `rgba(${50 + redShift}, 4, 8, ${0.1 + flickerLevel})`;
                // Subtle static frame shake vibration matching the bass tracking metrics
                bgVisualLayer.style.transform = `scale(${1 + (flickerLevel * 0.02)}) translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
            } else {
                bgVisualLayer.style.backgroundColor = 'rgba(0,0,0,0)';
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