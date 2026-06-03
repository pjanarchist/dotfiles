document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. TAB MANAGEMENT ENGINE ----
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.portfolio-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = e.currentTarget.getAttribute('data-tab');

            // Deactivate all layout states
            sections.forEach(sec => sec.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Engage requested module state
            document.getElementById(targetTab).classList.add('active');
            e.currentTarget.classList.add('active');
        });
    });

    // ---- 2. AUDIO ENGINE & DIAL MATRIX ----
    let currentAudio = null;
    let activeTrackId = null;
    let updateInterval = null;
    const totalCircumference = 188; // Calculated stroke boundary limit

    const playButtons = document.querySelectorAll('.play-pause-btn');

    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trackId = e.currentTarget.getAttribute('data-track-id');
            const audioUrl = e.currentTarget.getAttribute('data-audio-url');
            const progressBar = document.getElementById(`progress-${trackId}`);

            // Toggle play state if clicking already active deck
            if (currentAudio && activeTrackId === trackId) {
                if (!currentAudio.paused) {
                    currentAudio.pause();
                    e.currentTarget.innerText = "▶";
                    clearInterval(updateInterval);
                } else {
                    currentAudio.play();
                    e.currentTarget.innerText = "‖";
                    startProgressTracker(progressBar);
                }
                return;
            }

            // Flush out running streams on other audio channels
            if (currentAudio) {
                currentAudio.pause();
                clearInterval(updateInterval);
                playButtons.forEach(b => b.innerText = "▶");
                document.querySelectorAll('.dial-progress').forEach(p => p.style.strokeDashoffset = totalCircumference);
            }

            // Initialize new track stream
            currentAudio = new Audio(audioUrl);
            activeTrackId = trackId;
            currentAudio.play();
            e.currentTarget.innerText = "‖";

            startProgressTracker(progressBar);

            // Clean-up handler upon channel terminal state (track finish)
            currentAudio.onended = () => {
                e.currentTarget.innerText = "▶";
                progressBar.style.strokeDashoffset = totalCircumference;
                clearInterval(updateInterval);
                currentAudio = null;
                activeTrackId = null;
            };
        });
    });

    function startProgressTracker(progressBar) {
        updateInterval = setInterval(() => {
            if (currentAudio && !currentAudio.paused) {
                const percentage = currentAudio.currentTime / currentAudio.duration;
                const offset = totalCircumference - (percentage * totalCircumference);
                progressBar.style.strokeDashoffset = offset;
            }
        }, 100);
    }
});