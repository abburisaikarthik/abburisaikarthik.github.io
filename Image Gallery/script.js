function duplicateSelectedImage() {
    const imageId = document.getElementById('imageSelect').value;
    const originalImage = document.getElementById(imageId);
    const newImage = document.createElement('img');
    newImage.src = originalImage.src;
    newImage.alt = originalImage.alt;
    originalImage.parentNode.insertBefore(newImage, originalImage.nextSibling);
  }

  
  function adjustBrightness() {
    const imageId = document.getElementById('imageSelectB').value;
    const image = document.getElementById(imageId);
    const brightnessValue = document.getElementById('brightnessSlider').value;
    image.style.filter = `brightness(${100 + brightnessValue}%)`;
  }
  
  document.getElementById('imageSelectB').addEventListener('change', adjustBrightness);
  document.getElementById('brightnessSlider').addEventListener('input', adjustBrightness);




  function changeResolution() {
    const imageId = document.getElementById('imageSelectR').value;
    const image = document.getElementById(imageId);
    const resolutionValue = document.getElementById('resolutionSelect').value;
    
    if (resolutionValue === 'original') {
      image.style.width = '';
      image.style.height = '';
    } else {
      const scaleFactor = resolutionValue / 100;
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;
      image.style.width = `${naturalWidth * scaleFactor}px`;
      image.style.height = `${naturalHeight * scaleFactor}px`;
    }
  }
  
  document.getElementById('imageSelectR').addEventListener('change', changeResolution);
  document.getElementById('resolutionSelect').addEventListener('change', changeResolution);
  
  //Avatar

  const imageSelect = document.getElementById('image-select');
  const shapeSelect = document.getElementById('shape-select');
  const sizeSelect = document.getElementById('size-select');
  const generateAvatarButton = document.getElementById('generate-avatar-button');
  const avatarContainer = document.getElementById('avatar-container');

  generateAvatarButton.addEventListener('click', generateAvatar);
  function generateAvatar() {
    const selectedImage = imageSelect.value;
    const shape = shapeSelect.value;
    const size = sizeSelect.value;
  
    const image = new Image();
    image.onload = function() {
      const avatarDataURL = generateAvatar(image, shape, size);
      const avatarImage = new Image();
      avatarImage.src = avatarDataURL;
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(avatarImage);
    }
    image.src = selectedImage;
  
    function generateAvatar(image, shape, size) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      const aspectRatio = image.width / image.height;
      const width = size === 'small' ? 50 : size === 'medium' ? 100 : 200;
      const height = width / aspectRatio;
      canvas.width = width;
      canvas.height = height;
  
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      if (shape === 'square') {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      } else if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
  
      return canvas.toDataURL();
    }
  }
  

  
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const imageSelectgs = document.getElementById('image-selectgs');
  const generateButton = document.getElementById('generate-button');

  generateButton.addEventListener('click', generateGrayscaleImage);

  function generateGrayscaleImage() {
    const image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    image.src = imageSelectgs.value;
  }



const imageSelectqr = document.getElementById('image-selectqr');
const generateButtonqr = document.getElementById('generate-buttonqr');
const qrcodeDiv = document.getElementById('qrcode');
let qr = null;

generateButtonqr.addEventListener('click', generateQRCode);

function generateQRCode() {
  if (qr) {
    qr.clear();
  }
  const qrText = imageSelectqr.value;
  qr = new QRCode(qrcodeDiv, {
    text: qrText,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}



const imageSelecttn = document.getElementById('image-selecttn');
const thumbnailCanvas = document.getElementById('thumbnail-canvas');
const thumbnailWidth = 200;
const thumbnailHeight = 200;
const thumbnailContext = thumbnailCanvas.getContext('2d');
const generateThumbnailButton = document.getElementById('generate-thumbnail-button');

generateThumbnailButton.addEventListener('click', generateThumbnail);

function generateThumbnail() {
  const selectedImage = new Image();
  selectedImage.onload = function() {
    thumbnailCanvas.width = thumbnailWidth;
    thumbnailCanvas.height = thumbnailHeight;
    thumbnailContext.drawImage(selectedImage, 0, 0, thumbnailWidth, thumbnailHeight);
  }
  selectedImage.src = imageSelecttn.value;
}


const imageSelectrbg = document.getElementById('image-selectrbg');
const imageCanvas = document.getElementById('image-canvas');
const imageContext = imageCanvas.getContext('2d');
const colorSelect = document.getElementById('color-select');
const colorizeButton = document.getElementById('colorize-button');

colorizeButton.addEventListener('click', colorizeImage);

function colorizeImage() {
  const selectedImage = new Image();
  selectedImage.onload = function() {
    imageCanvas.width = selectedImage.width;
    imageCanvas.height = selectedImage.height;
    imageContext.drawImage(selectedImage, 0, 0);
    const imageData = imageContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const data = imageData.data;
    const color = colorSelect.value;
    for (let i = 0; i < data.length; i += 4) {
      if (color === 'red') {
        if (data[i] <= data[i+1] + data[i+2]) {
          data[i] = 255;
        }
      } else if (color === 'blue') {
        if (data[i+2] <= data[i] + data[i+1]) {
          data[i+2] = 255;
        }
      } else if (color === 'green') {
        if (data[i+1] <= data[i] + data[i+2]) {
          data[i+1] = 255;
        }
      }
    }
    imageContext.putImageData(imageData, 0, 0);
  }
  selectedImage.src = imageSelectrbg.value;
}