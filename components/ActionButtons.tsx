interface ActionButtonsProps {
  onClearAll: () => void
  onExportJSON: () => void
  onExportCapBoard: () => void
  onExportSelected: () => void
  hasCaptures: boolean
  hasSelected: boolean
}

export default function ActionButtons({
  onClearAll,
  onExportJSON,
  onExportCapBoard,
  onExportSelected,
  hasCaptures,
  hasSelected,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Clear Cap Board */}
      <button
        onClick={onClearAll}
        disabled={!hasCaptures}
        className="bg-capthat-red hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-lg disabled:hover:shadow-none text-sm"
      >
        Clear Cap Board
      </button>

      {/* Export JSON */}
      <button
        onClick={onExportJSON}
        disabled={!hasCaptures}
        className="bg-capthat-teal hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-lg disabled:hover:shadow-none text-sm"
      >
        Export JSON
      </button>

      {/* Export CapBoard */}
      <button
        onClick={onExportCapBoard}
        disabled={!hasCaptures}
        className="bg-capthat-teal hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-lg disabled:hover:shadow-none text-sm"
      >
        Export CapBoard
      </button>

      {/* Export Individual Caps */}
      <button
        onClick={onExportSelected}
        disabled={!hasSelected}
        className="bg-capthat-teal hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all hover:shadow-lg disabled:hover:shadow-none text-sm"
      >
        Export Individual Caps
      </button>
    </div>
  )
}

