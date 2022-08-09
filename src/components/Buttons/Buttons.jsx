import './Buttons.css'

export default function Buttons({ resetGrid, generation, playGame, stopGame, rows, cols, changeGrid, speed, changeSpeed, oneStep }) {

    return (
        <div className="buttons">
            <button className="button start" onClick={() => playGame()} >Iniciar</button>
            <button className="button stop" onClick={() => stopGame()} >Detener</button>
            <button className="button reset" onClick={() => resetGrid()}>Reiniciar</button>
            <button className='button step' onClick={() => oneStep()}>Un paso</button>
            <div className='gridControls'>
                <div>
                    <button className='plusminus' onClick={() => changeGrid(rows - 1)}>-</button>
                    <label>Filas: {rows}</label>
                    <button className='plusminus' onClick={() => changeGrid(rows + 1)}>+</button>
                </div>
                <div>
                    <button className='plusminus' onClick={() => changeGrid(false, cols - 1)}>-</button>
                    <label>Columnas: {cols}</label>
                    <button className='plusminus' onClick={() => changeGrid(false, cols + 1)}>+</button>
                </div>
            </div>
            <div>
                <button className='plusminus' onClick={() => changeSpeed(speed - 100)}>-</button>
                <label>Velocidad: {speed}ms</label>
                <button className='plusminus' onClick={() => changeSpeed(speed + 100)}>+</button>
            </div>
            <p>Generación: <b>{generation}</b></p>
        </div>
    )
}