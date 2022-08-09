import { useEffect, useRef, useState } from "react";

// Este array contiene las direcciones de los 8 posibles vecinos de cada celula.
// (arriba a la izquierda, arriba, arriba a la derecha, izquierda, derecha, abajo a la izquierda, abajo y abajo a la derecha)
const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]

// Funcion principal del hook
export const useGame = () => {

    // Columnas y filas de la grilla.
    const [rows, setRows] = useState(30);
    const [cols, setCols] = useState(50);
    // Contador de generaciones.
    const [generation, setGeneration] = useState(0);
    // Tiempo de ejecución de los intervalos
    const [speed, setSpeed] = useState(300);
    // Estado de ejecución la grilla.
    const running = useRef(false);
    // Grilla
    const [grid, setGrid] = useState(new Array(rows).fill(new Array(cols).fill(0)));


    // Función encargada de la ejecución de células para antes del incio de la ejecución.
    const selectCell = (row, col) => {
        const newGrid = grid.map(inner => inner.slice())
        newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
        setGrid(newGrid);
    }

    // Función encargada de reiniciar la grilla a 0.
    const resetGrid = () => {
        setRows(30);
        setCols(50);
        setGrid(new Array(30).fill(new Array(50).fill(0)));
        setGeneration(0);
        setSpeed(300);
        running.current = false
        localStorage.clear()
    }

    // Algoritmo principal de el Juego de la Vida.
    const oneStep = () => {
        // Suma 1 a la generación.
        setGeneration(prevGen => {
            // Guarda la generación actual en el localstorage
            localStorage.setItem("generation", JSON.stringify(prevGen + 1));
            return prevGen + 1
        });
        setGrid(grid => {
            // Crea una copia de la grilla para luego trabajar sobre ella
            const newGrid = grid.map(inner => inner.slice());
            // Itera sobre la grilla
            grid.map((e, y) =>
                e.forEach((e, x) => {
                    // Inicializa el numero de vecinos a 0
                    let neighboursCount = 0;
                    // Por cada vecino con valor 1 suma 1 al contador de vecinos
                    neighbours.forEach(([yOffset, xOffset]) => {
                        const newY = y + yOffset;
                        const newX = x + xOffset;
                        // Este if chequea que no nos salgamos de la grilla
                        if (newY >= 0 && newY < rows && newX >= 0 && newX < cols) {
                            neighboursCount += grid[newY][newX];
                        }
                    })
                    // Como indica el algoritmo de este juego, si el numero de vecinos es menor a 2 o mayor a 3 la célula debe dejar de vivir.
                    if (neighboursCount < 2 || neighboursCount > 3) {
                        newGrid[y][x] = 0;
                    }
                    // Si el numero de vecinos es 3 la célula debe de vivir.
                    else if (neighboursCount === 3) {
                        newGrid[y][x] = 1;
                    }
                })
            )
            // Guarda la nueva grilla en el localstorage
            localStorage.setItem("grid", JSON.stringify(newGrid));
            // Actualiza la grilla con la nueva generación.
            return newGrid;
        })
    }

    // Función encargada de dar comienzo al juego de forma automática, repitiendo el algoritmo a la velocidad seleccionada.
    const playGame = () => {
        running.current = true
        setTimeout(() => {
            if (!running.current) return;
            oneStep();
            playGame();
        }, speed);
    }

    // Función encargada de detener el juego.
    const stopGame = () => {
        running.current = false;
    }

    // Función encargada de cambiar la velocidad de los intervalos.
    const changeSpeed = newSpeed => {
        running.current = false;
        setSpeed(newSpeed);
        localStorage.setItem("speed", JSON.stringify(newSpeed));
    }

    // Función encargada de cambiar el tamaño de la grilla.
    const changeGrid = (newRows, newCols) => {
        running.current = false;
        resetGrid()
        if (newRows) {
            setRows(newRows)
            setGrid(new Array(newRows).fill(new Array(cols).fill(0)));
            localStorage.setItem("rows", JSON.stringify(newRows))
        }
        else if (newCols) {
            setCols(newCols)
            setGrid(new Array(rows).fill(new Array(newCols).fill(0)));
            localStorage.setItem("cols", JSON.stringify(newCols));
        }
    }

    // Función encargada de cargar la grilla y demás valores desde el localStorage.
    useEffect(() => {
        localStorage.getItem("grid") && setGrid(JSON.parse(localStorage.getItem("grid")));
        localStorage.getItem("generation") && setGeneration(JSON.parse(localStorage.getItem("generation")));
        localStorage.getItem("speed") && setSpeed(JSON.parse(localStorage.getItem("speed")));
        localStorage.getItem("rows") && setRows(JSON.parse(localStorage.getItem("rows")));
        localStorage.getItem("cols") && setCols(JSON.parse(localStorage.getItem("cols")));
    }, [])

    return {
        grid,
        rows,
        cols,
        generation,
        speed,
        selectCell,
        resetGrid,
        playGame,
        stopGame,
        changeSpeed,
        changeGrid,
        oneStep
    }

}