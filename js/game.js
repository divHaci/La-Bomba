document.addEventListener("DOMContentLoaded", function () {
    const bombContainer = document.getElementById("bombContainer");
  
    // Number of rows and columns
    const numRows = 2;
    const numCols = 3;
  
    let isRotating = false;
  
    function generateSquares() {
      for (let i = 0; i < numRows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
  
        for (let j = 0; j < numCols; j++) {
          const square = document.createElement("div");
          square.classList.add("square");
          row.appendChild(square);
        }
  
        bombContainer.appendChild(row);
      }
    }
  
    function removeSquares() {
      const rows = document.querySelectorAll(".row");
      rows.forEach((row) => bombContainer.removeChild(row));
    }
  
    // Initial generation of squares
    generateSquares();
  
    let isRotated = false;
  
    const rotateButton = document.createElement("button");
    rotateButton.id = "rotateButton";
    rotateButton.textContent = "Gira";
    document.body.appendChild(rotateButton);
  
    rotateButton.addEventListener("click", function () {
      // Evita di avviare una nuova rotazione se quella corrente è ancora in corso
      if (isRotating) {
        return;
      }
  
      isRotating = true;
  
      // Aggiunge un ascoltatore per l'evento di transizione
      const transitionEndHandler = function () {
        // Rimuove l'ascoltatore per evitare chiamate ripetute
        bombContainer.removeEventListener("transitionend", transitionEndHandler);
  
        // Rimuove i vecchi quadrati
        removeSquares();
  
        // Genera i nuovi quadrati
        generateSquares();
  
        isRotating = false; // Imposta il flag di rotazione su false quando l'animazione è completata
      };
  
      bombContainer.addEventListener("transitionend", transitionEndHandler);
  
      isRotated = !isRotated;
      bombContainer.style.transform = isRotated ? "scaleX(1)" : "scaleX(-1)";
    });
});
