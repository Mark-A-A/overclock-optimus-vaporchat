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
      
      let dataUrl;
      
      // Try to fetch the image as a blob to handle CORS
      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        
        // Convert blob to base64
        dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (fetchError) {
        // If fetch fails (CORS), try canvas method for same-origin images
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        
        const ctx = canvas.getContext('2d');
        
        // For same-origin images, this should work
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          tempImg.onload = resolve;
          tempImg.onerror = reject;
          tempImg.src = img.src;
        });
        
        ctx.drawImage(tempImg, 0, 0);
        dataUrl = canvas.toDataURL('image/png');
      }
      
      // Save to Chrome storage
      const captureData = {
        id: Date.now() + Math.random(),
        dataUrl: dataUrl,
        url: window.location.href,
        pageTitle: document.title,
        timestamp: new Date().toISOString(),
        imgSrc: img.src,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
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


  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

