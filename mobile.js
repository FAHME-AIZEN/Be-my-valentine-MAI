let highestZ = 1;
const SCALE = 0.5;

class Paper {
  holdingPaper = false;

  prevX = 0;
  prevY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.touchAction = 'none';

    paper.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();

        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;

        const touch = e.touches[0];
        this.prevX = touch.clientX;
        this.prevY = touch.clientY;
      },
      { passive: false }
    );

    paper.addEventListener(
      'touchmove',
      (e) => {
        if (!this.holdingPaper) return;
        e.preventDefault();

        // ☝️ DRAG
        if (e.touches.length === 1) {
          const touch = e.touches[0];

          const dx = (touch.clientX - this.prevX) / SCALE;
          const dy = (touch.clientY - this.prevY) / SCALE;

          this.currentPaperX += dx;
          this.currentPaperY += dy;

          this.prevX = touch.clientX;
          this.prevY = touch.clientY;
        }

        // ✌️ ROTATE
        if (e.touches.length === 2) {
          const t1 = e.touches[0];
          const t2 = e.touches[1];

          const dx = t2.clientX - t1.clientX;
          const dy = t2.clientY - t1.clientY;

          this.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        }

        paper.style.transform = `
          translate(${this.currentPaperX}px, ${this.currentPaperY}px)
          rotate(${this.rotation}deg)
        `;
      },
      { passive: false }
    );

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

document.querySelectorAll('.paper').forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
