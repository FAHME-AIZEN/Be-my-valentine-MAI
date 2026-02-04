let highestZ = 1;
const SCALE = 0.5;

class Paper {
  holdingPaper = false;

  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.touchAction = 'none'; // VERY important for mobile

    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();

      paper.style.zIndex = highestZ++;
      this.holdingPaper = true;

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.prevX = touch.clientX;
        this.prevY = touch.clientY;
      }
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      e.preventDefault();

      // 🖐 One finger → drag
      if (e.touches.length === 1) {
        const touch = e.touches[0];

        const dx = (touch.clientX - this.prevX) / SCALE;
        const dy = (touch.clientY - this.prevY) / SCALE;

        this.currentPaperX += dx;
        this.currentPaperY += dy;

        this.prevX = touch.clientX;
        this.prevY = touch.clientY;
      }

      // ✌️ Two fingers → rotate
      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];

        const dx = t2.clientX - t1.clientX;
        const dy = t2.clientY - t1.clientY;

        const angle = Math.atan2(dy, dx);
        this.rotation = (angle * 180) / Math.PI;
      }

      paper.style.transform = `
        translateX(${this.currentPaperX}px)
        translateY(${this.currentPaperY}px)
        rotateZ(${this.rotation}deg)
      `;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
