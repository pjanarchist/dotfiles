document.addEventListener('DOMContentLoaded', () => {
    
    // ---- 1. BASIC NAVIGATION ENGINE ----
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

    // ---- 2. ADVANCED AUDIO RUNTIME ENGINE ----
    let currentAudio = null;
    let activeTrackId = null;
    let progressUpdateInterval = null;

    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(btn => {
        btn.addEventListener('click', handlePlayToggle);
    });

    function handlePlayToggle(e) {
        const btn = e.currentTarget;
        const trackId = btn.getAttribute('data-track-id');
        const audioUrl = btn.getAttribute('data-audio-url');
        
        const row = btn.closest('.audio-track-row');
        const slider = row.querySelector('.timeline-slider');
        const currentTimeDisplay = row.querySelector('.current-time');
        const durationTimeDisplay = row.querySelector('.duration-time');
        const volumeSlider = row.querySelector('.volume-slider');

        // Toggle state logic if clicking same active track
        if (currentAudio && activeTrackId === trackId) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                btn.innerText = "▶ Play";
                clearInterval(progressUpdateInterval);
            } else {
                currentAudio.play();
                btn.innerText = "‖ Pause";
                trackTimeline(slider, currentTimeDisplay);
            }
            return;
        }

        // Clean slate: reset older streams if playing something else
        resetAllOtherTrackUIs();

        // Instantiate new audio channel instance
        currentAudio = new Audio(audioUrl);
        activeTrackId = trackId;
        
        // Initialize volume to current volume slider level
        currentAudio.volume = volumeSlider.value;

        // When the audio metadata loads, set slider max limit boundaries
        currentAudio.addEventListener('loadedmetadata', () => {
            slider.max = currentAudio.duration;
            durationTimeDisplay.innerText = formatTime(currentAudio.duration);
        });

        currentAudio.play();
        btn.innerText = "‖ Pause";
        trackTimeline(slider, currentTimeDisplay);

        // Continuous timeline scrub checking logic
        slider.addEventListener('input', () => {
            currentAudio.currentTime = slider.value;
            currentTimeDisplay.innerText = formatTime(slider.value);
        });

        // Continuous runtime volume adjust tracking logic
        volumeSlider.addEventListener('input', () => {
            if (activeTrackId === trackId && currentAudio) {
                currentAudio.volume = volumeSlider.value;
            }
        });

        // Track complete end criteria reset
        currentAudio.onended = () => {
            btn.innerText = "▶ Play";
            slider.value = 0;
            currentTimeDisplay.innerText = "0:00";
            clearInterval(progressUpdateInterval);
            currentAudio = null;
            activeTrackId = null;
        };
    }

    function trackTimeline(slider, currentDisplay) {
        clearInterval(progressUpdateInterval);
        progressUpdateInterval = setInterval(() => {
            if (currentAudio && !currentAudio.paused) {
                slider.value = currentAudio.currentTime;
                currentDisplay.innerText = formatTime(currentAudio.currentTime);
            }
        }, 100);
    }

    function resetAllOtherTrackUIs() {
        if (currentAudio) {
            currentAudio.pause();
            clearInterval(progressUpdateInterval);
        }
        playButtons.forEach(b => b.innerText = "▶ Play");
        document.querySelectorAll('.timeline-slider').forEach(s => s.value = 0);
        document.querySelectorAll('.current-time').forEach(t => t.innerText = "0:00");
    }

    // Mathematical utility conversion tracker to clock notation
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});