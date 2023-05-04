(() => {
    const canvas = document.querySelector("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const g = canvas.getContext("2d");
    const right = { x: 1, y: 0 };
    const down = { x: 0, y: 1 };
    const left = { x: -1, y: 0 };
    const EMPTY = -1;
    const BORDER = -2;
    let fallingShape;
    let nextShape;
    const nRows = 18;
    const nCols = 12;
    const blockSize = 30;
    const topMargin = 50;
    const leftMargin = 20;
    const previewCenterX = 467;
    const previewCenterY = 97;
    const gridRect = { x: 46, y: 47, w: 308, h: 517 };
    const squareBorder = "#00CECB";
    const gridColor = "#D8D8D8";
    const smallStroke = 2;
    let fallingShapeRow;
    let fallingShapeCol;
  
    let keyDown = false;
    let fastDown = false;
  
    const grid = [];
    //eslint-disable-next-line
  const scoreboard = new Scoreboard();
  
    addEventListener("keydown", function (event) {
      if (!keyDown) {
        keyDown = true;
  
        if (scoreboard.isGameOver()) {
          return;
        }
  
        switch (event.key) {
          case "ArrowUp":
            if (canRotate(fallingShape)) rotate(fallingShape);
            break;
  
          case "ArrowLeft":
            if (canMove(fallingShape, left)) move(left);
            break;
  
          case "ArrowRight":
            if (canMove(fallingShape, right)) move(right);
            break;
  
          case "ArrowDown":
            if (!fastDown) {
              fastDown = true;
              while (canMove(fallingShape, down)) {
                move(down);
                draw();
              }
              shapeHasLanded();
            }
        }
        draw();
      }
    });
  
    addEventListener("keyup", function () {
      keyDown = false;
      fastDown = false;
    });
  
    function canRotate(s) {
      if (s === Shapes.Square) return false;
  
      const pos = new Array(4);
      for (let i = 0; i < pos.length; i++) {
        pos[i] = s.pos[i].slice();
      }
  
      pos.forEach(function (row) {
        const tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
      });
  
      return pos.every(function (p) {
        const newCol = fallingShapeCol + p[0];
        const newRow = fallingShapeRow + p[1];
        return grid[newRow][newCol] === EMPTY;
      });
    }
  
    function rotate(s) {
      if (s === Shapes.Square) return;
  
      s.pos.forEach(function (row) {
        const tmp = row[0];
        row[0] = row[1];
        row[1] = -tmp;
      });
    }
  
    function move(dir) {
      fallingShapeRow += dir.y;
      fallingShapeCol += dir.x;
    }
  
    function canMove(s, dir) {
      return s.pos.every(function (p) {
        const newCol = fallingShapeCol + dir.x + p[0];
        const newRow = fallingShapeRow + dir.y + p[1];
        return grid[newRow][newCol] === EMPTY;
      });
    }
  
    function shapeHasLanded() {
      addShape(fallingShape);
      if (fallingShapeRow < 2) {
        scoreboard.setGameOver();
        //scoreboard.setTopScore();
      } else {
        scoreboard.addLines(removeLines());
      }
      selectShape();
    }
  
    function removeLines() {
      let count = 0;
      for (let r = 0; r < nRows - 1; r++) {
        for (let c = 1; c < nCols - 1; c++) {
          if (grid[r][c] === EMPTY) break;
          if (c === nCols - 2) {
            count++;
            removeLine(r);
          }
        }
      }
      return count;
    }
  
    function removeLine(line) {
      for (let c = 0; c < nCols; c++) grid[line][c] = EMPTY;
  
      for (let c = 0; c < nCols; c++) {
        for (let r = line; r > 0; r--) grid[r][c] = grid[r - 1][c];
      }
    }
  
    function addShape(s) {
      s.pos.forEach(function (p) {
        grid[fallingShapeRow + p[1]][fallingShapeCol + p[0]] = s.ordinal;
      });
    }
  
    const Shapes = {
      ZShape: [
        [0, -1],
        [0, 0],
        [-1, 0],
        [-1, 1],
      ],
      SShape: [
        [0, -1],
        [0, 0],
        [1, 0],
        [1, 1],
      ],
      IShape: [
        [0, -1],
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      TShape: [
        [-1, 0],
        [0, 0],
        [1, 0],
        [0, 1],
      ],
      Square: [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ],
      LShape: [
        [-1, -1],
        [0, -1],
        [0, 0],
        [0, 1],
      ],
      JShape: [
        [1, -1],
        [0, -1],
        [0, 0],
        [0, 1],
      ],
    };
  
    function getRandomShape() {
      const keys = Object.keys(Shapes);
      const ord = Math.floor(Math.random() * keys.length);
      const shape = Shapes[keys[ord]];
      //eslint-disable-next-line
    return new Shape(shape, ord);
    }
  
    function selectShape() {
      fallingShapeRow = 1;
      fallingShapeCol = 5;
      fallingShape = nextShape;
      nextShape = getRandomShape();
      if (fallingShape != null) {
        fallingShape.reset();
      }
    }
  
    function draw() {
      g.clearRect(0, 0, canvas.width, canvas.height);
  
      drawUI();
  
      if (scoreboard.isGameOver()) {
        //();
      } else {
        drawFallingShape();
      }
    }
  
    function fillRect(r, color) {
      g.fillStyle = color;
      g.fillRect(r.x, r.y, r.w, r.h);
    }
  
    function drawSquare(colorIndex, r, c) {
      const bs = blockSize;
      g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
  
      g.lineWidth = smallStroke;
      g.strokeStyle = squareBorder;
      g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
    }
  
    function drawUI() {
      fillRect(gridRect, gridColor);
  
      for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nCols; c++) {
          const idx = grid[r][c];
          if (idx > EMPTY) drawSquare(idx, r, c);
        }
      }
  
      // preview
      let minX = 5,
        minY = 5,
        maxX = 0,
        maxY = 0;
      nextShape.pos.forEach(function (p) {
        minX = Math.min(minX, p[0]);
        minY = Math.min(minY, p[1]);
        maxX = Math.max(maxX, p[0]);
        maxY = Math.max(maxY, p[1]);
      });
      const cx = previewCenterX - ((minX + maxX + 1) / 2.0) * blockSize;
      const cy = previewCenterY - ((minY + maxY + 1) / 2.0) * blockSize;
  
      g.translate(cx, cy);
      g.translate(-cx, -cy);
    }
  
    function drawFallingShape() {
      const idx = fallingShape.ordinal;
      fallingShape.pos.forEach(function (p) {
        drawSquare(idx, fallingShapeRow + p[1], fallingShapeCol + p[0]);
      });
    }
  
    function animate(lastFrameTime) {
      const requestId = requestAnimationFrame(function () {
        animate(lastFrameTime);
      });
  
      const time = new Date().getTime();
      const delay = scoreboard.getSpeed();
  
      if (lastFrameTime + delay < time) {
        if (!scoreboard.isGameOver()) {
          if (canMove(fallingShape, down)) {
            move(down);
          } else {
            shapeHasLanded();
          }
          draw();
          lastFrameTime = time;
        } else {
          cancelAnimationFrame(requestId);
        }
      }
    }
  
    function startNewGame() {
      initGrid();
      selectShape();
      scoreboard.reset();
      animate(-1);
    }
  
    function initGrid() {
      function fill(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = value;
        }
      }
      for (let r = 0; r < nRows; r++) {
        grid[r] = new Array(nCols);
        fill(grid[r], EMPTY);
        for (let c = 0; c < nCols; c++) {
          if (c === 0 || c === nCols - 1 || r === nRows - 1) grid[r][c] = BORDER;
        }
      }
    }
  
    function init() {
      initGrid();
      selectShape();
      draw();
      document.getElementById("playBtn").onclick = startNewGame;
    }
  
    init();
  })();
  