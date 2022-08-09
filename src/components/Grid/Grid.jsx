import './Grid.css'

export default function Grid({ grid, rows, cols, selectCell }) {

    return (
        <div
            className="grid"
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
            }}
        >
            {grid.map((e, y) =>
                e.map((e, x) =>
                    <div
                        className={`cell ${e ? 'alive' : 'dead'}`}
                        key={y + "-" + x}
                        onClick={() => selectCell(y, x)}
                    />
                )
            )}
        </div>
    )
}