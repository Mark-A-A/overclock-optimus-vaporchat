// Content script to add "Cap" buttons to images on web pages

(function() {
  'use strict';

  const BUTTON_CLASS = 'capthat-button';
  const CONTAINER_CLASS = 'capthat-container';
  const LOADING_CLASS = 'capthat-loading';

  // Initialize the extension
  function init() {
    addCapButtonsToImages();
    
    // Observe DOM changes to handle dynamically loaded images
    const observer = new MutationObserver((mutations) => {
      addCapButtonsToImages();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Add Cap buttons to all images
  function addCapButtonsToImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Skip if already processed or too small
      if (img.classList.contains('capthat-processed') || 
          img.width < 100 || img.height < 100) {
        return;
      }
      
      img.classList.add('capthat-processed');
      
      // Create container if parent isn't already a container
      if (!img.parentElement.classList.contains(CONTAINER_CLASS)) {
        const container = document.createElement('div');
        container.className = CONTAINER_CLASS;
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        
        // Add button
        const button = createCapButton(img);
        container.appendChild(button);
      }
    });
  }

  // Create a Cap button
  function createCapButton(img) {
    const button = document.createElement('button');
    button.className = BUTTON_CLASS;
    button.textContent = 'Cap!';
    
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await captureImage(img, button);
    });
    
    return button;
  }

  // Capture and save the image
  async function captureImage(img, button) {
    try {
      // Show loading state
      button.classList.add(LOADING_CLASS);
      button.textContent = 'Saving...';
      
      // Create canvas to capture the image
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      const ctx = canvas.getContext('2d');
      
      // Handle CORS issues by trying to load the image
      const imgData = await getImageData(img, canvas, ctx);
      
      // Convert to base64
      const dataUrl = canvas.toDataURL('image/png');
      
      // Save to Chrome storage
      const captureData = {
        id: Date.now() + Math.random(),
        dataUrl: dataUrl,
        url: window.location.href,
        pageTitle: document.title,
        timestamp: new Date().toISOString(),
        imgSrc: img.src,
        width: canvas.width,
        height: canvas.height
      };
      
      // Store in Chrome storage
      chrome.storage.local.get(['captures'], (result) => {
        const captures = result.captures || [];
        captures.push(captureData);
        
        chrome.storage.local.set({ captures }, () => {
          // Show success state
          button.textContent = 'Saved!';
          button.style.backgroundColor = '#68C5DB';
          
          setTimeout(() => {
            button.classList.remove(LOADING_CLASS);
            button.textContent = 'Cap!';
            button.style.backgroundColor = '';
          }, 1500);
        });
      });
      
    } catch (error) {
      console.error('CapThat: Error capturing image:', error);
      button.textContent = 'Error!';
      button.style.backgroundColor = '#D7263D';
      
      setTimeout(() => {
        button.classList.remove(LOADING_CLASS);
        button.textContent = 'Cap!';
        button.style.backgroundColor = '';
      }, 2000);
    }
  }

  // Get image data handling CORS
  function getImageData(img, canvas, ctx) {
    return new Promise((resolve, reject) => {
      // Try to draw directly first
      try {
        ctx.drawImage(img, 0, 0);
        resolve();
      } catch (e) {
        // If CORS error, try to load via fetch
        fetch(img.src)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const newImg = new Image();
            newImg.onload = () => {
              ctx.drawImage(newImg, 0, 0);
              URL.revokeObjectURL(url);
              resolve();
            };
            newImg.onerror = reject;
            newImg.src = url;
          })
          .catch(reject);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

