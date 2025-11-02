import { CaptureData } from '@/types'
import { useState } from 'react'

interface ImageGridProps {
  captures: CaptureData[]
  selectedIds: Set<string>
  onSelectImage: (id: string) => void
  onDeleteImage: (id: string) => void
}

export default function ImageGrid({
  captures,
  selectedIds,
  onSelectImage,
  onDeleteImage,
}: ImageGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-5 gap-3">
      {captures.map((capture) => {
        const captureId = capture.id.toString()
        const isSelected = selectedIds.has(captureId)
        const isHovered = hoveredId === captureId

        return (
          <div
            key={captureId}
            className="relative aspect-square cursor-pointer group"
            onMouseEnter={() => setHoveredId(captureId)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelectImage(captureId)}
          >
            {/* Image */}
            <div
              className={`w-full h-full border-2 rounded overflow-hidden transition-all ${
                isSelected
                  ? 'border-capthat-blue ring-2 ring-capthat-blue'
                  : 'border-gray-300 hover:border-capthat-primary'
              }`}
            >
              <img
                src={capture.dataUrl}
                alt={`Capture from ${capture.pageTitle}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Selection checkbox */}
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded border-2 bg-white flex items-center justify-center transition-all ${
                isSelected
                  ? 'border-capthat-blue'
                  : 'border-gray-400 opacity-0 group-hover:opacity-100'
              }`}
            >
              {isSelected && (
                <svg
                  className="w-4 h-4 text-capthat-blue"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (
                  confirm(
                    'Are you sure you want to delete this image?'
                  )
                ) {
                  onDeleteImage(captureId)
                }
              }}
              className={`absolute top-1 right-1 w-6 h-6 rounded-full bg-capthat-red text-white flex items-center justify-center transition-all hover:scale-110 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Hover info overlay */}
            {isHovered && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 truncate">
                {capture.pageTitle}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

