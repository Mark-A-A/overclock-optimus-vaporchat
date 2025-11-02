// Background service worker for CapThat extension
// Handles image fetching to bypass CORS restrictions

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchImage') {
    // Fetch the image from the extension context (bypasses CORS)
    fetch(request.url)
      .then(response => response.blob())
      .then(blob => {
        // Convert blob to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          sendResponse({ dataUrl: reader.result });
        };
        reader.onerror = () => {
          sendResponse({ error: 'Failed to read image' });
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('CapThat Background: Failed to fetch image', error);
        sendResponse({ error: error.message });
      });
    
    // Return true to indicate we'll respond asynchronously
    return true;
  }
});

console.log('CapThat background service worker loaded');

