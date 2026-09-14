document.addEventListener('DOMContentLoaded', () => {
  const videoContainers = document.querySelectorAll('.video-wrapper, .video-frame-wrapper, .story-video-wrapper');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.video-play-btn');
    
    if (video && playBtn) {
      playBtn.addEventListener('click', () => {
        video.play();
        video.controls = true;
        playBtn.style.display = 'none';
      });

      video.addEventListener('pause', () => {
        if (!video.seeking) {
          playBtn.style.display = 'flex';
        }
      });

      video.addEventListener('play', () => {
        playBtn.style.display = 'none';
        video.controls = true;
      });

      video.addEventListener('ended', () => {
        playBtn.style.display = 'flex';
        video.controls = false;
        video.load();
      });
    }
  });
});


