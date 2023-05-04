//eslint-disable-next-line
class Scoreboard {
    constructor() {
      this.lines = 0;
      this.topScore = 0;
      this.gameOver = true;
    }
  
    reset() {
      this.gameOver = false;
    }
  
    setGameOver() {
      this.gameOver = true;
    }
  
    isGameOver() {
      return this.gameOver;
    }
  
    getTopScore() {
      return this.topScore;
    }
  
    getSpeed() {
      return 300;
    }
  
    addLines(line) {
      this.lines += line;
      if (this.lines > 10) {
        this.addLevel();
      }
    }
  
    getLines() {
      return this.lines;
    }
  }
  