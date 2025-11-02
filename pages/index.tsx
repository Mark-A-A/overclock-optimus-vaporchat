import { useState, useEffect } from 'react'
import Head from 'next/head'
import ImageGrid from '@/components/ImageGrid'
import ActionButtons from '@/components/ActionButtons'
import { CaptureData } from '@/types'

export default function Popup() {
  const [captures, setCaptures] = useState<CaptureData[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCaptures()
  }, [])

  const loadCaptures = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['captures'], (result) => {
        setCaptures(result.captures || [])
        setLoading(false)
      })
    } else {
      // For development
      setLoading(false)
    }
  }

  const handleSelectImage = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all captured images?')) {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ captures: [] }, () => {
          setCaptures([])
          setSelectedIds(new Set())
        })
      }
    }
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(captures, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `capthat-export-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportCapBoard = async () => {
    if (captures.length === 0) {
      alert('No images to export')
      return
    }

    try {
      // Create a zip file with all images
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      captures.forEach((capture, index) => {
        const base64Data = capture.dataUrl.split(',')[1]
        zip.file(`capture-${index + 1}.png`, base64Data, { base64: true })
      })

      const content = await zip.generateAsync({ type: 'blob' })
      
      // Convert blob to data URL for Chrome download
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result as string
        
        if (typeof chrome !== 'undefined' && chrome.downloads) {
          chrome.downloads.download({
            url: dataUrl,
            filename: `capthat-board-${Date.now()}.zip`,
            saveAs: true
          })
        } else {
          // Fallback for development
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = `capthat-board-${Date.now()}.zip`
          link.click()
        }
      }
      reader.readAsDataURL(content)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export images')
    }
  }

  const handleExportSelected = async () => {
    if (selectedIds.size === 0) {
      alert('Please select images to export')
      return
    }

    try {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      const selectedCaptures = captures.filter((cap) =>
        selectedIds.has(cap.id.toString())
      )

      selectedCaptures.forEach((capture, index) => {
        const base64Data = capture.dataUrl.split(',')[1]
        zip.file(`capture-${index + 1}.png`, base64Data, { base64: true })
      })

      const content = await zip.generateAsync({ type: 'blob' })
      
      // Convert blob to data URL for Chrome download
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result as string
        
        if (typeof chrome !== 'undefined' && chrome.downloads) {
          chrome.downloads.download({
            url: dataUrl,
            filename: `capthat-selected-${Date.now()}.zip`,
            saveAs: true
          })
        } else {
          // Fallback for development
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = `capthat-selected-${Date.now()}.zip`
          link.click()
        }
      }
      reader.readAsDataURL(content)
    } catch (error) {
      console.error('Export selected failed:', error)
      alert('Failed to export selected images')
    }
  }

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) {
      alert('Please select images to delete')
      return
    }

    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.size} selected image(s)?`
      )
    ) {
      const newCaptures = captures.filter(
        (cap) => !selectedIds.has(cap.id.toString())
      )

      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ captures: newCaptures }, () => {
          setCaptures(newCaptures)
          setSelectedIds(new Set())
        })
      }
    }
  }

  return (
    <>
      <Head>
        <title>CapThat!</title>
      </Head>
      <div className="w-[500px] h-[700px] bg-capthat-primary flex flex-col">
        {/* Header */}
        <div className="bg-capthat-dark text-white py-4 px-6">
          <h1 className="text-2xl font-bold text-center">CapThat!</h1>
        </div>

        {/* Image Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : captures.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-lg mb-2">No captures yet!</p>
                <p className="text-sm">
                  Visit any webpage and click the "Cap!" button on images to
                  save them.
                </p>
              </div>
            </div>
          ) : (
            <ImageGrid
              captures={captures}
              selectedIds={selectedIds}
              onSelectImage={handleSelectImage}
              onDeleteImage={(id) => {
                const newCaptures = captures.filter(
                  (cap) => cap.id.toString() !== id
                )
                if (typeof chrome !== 'undefined' && chrome.storage) {
                  chrome.storage.local.set({ captures: newCaptures }, () => {
                    setCaptures(newCaptures)
                    const newSelected = new Set(selectedIds)
                    newSelected.delete(id)
                    setSelectedIds(newSelected)
                  })
                }
              }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-capthat-primary p-4">
          <ActionButtons
            onClearAll={handleClearAll}
            onExportJSON={handleExportJSON}
            onExportCapBoard={handleExportCapBoard}
            onExportSelected={handleExportSelected}
            hasCaptures={captures.length > 0}
            hasSelected={selectedIds.size > 0}
          />
        </div>
      </div>
    </>
  )
}

