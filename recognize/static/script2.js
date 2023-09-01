const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const modelPromise = tf.loadGraphModel('model/model.json'); // Load your pre-trained model


let face_mode="environment"
async function startCamera(face_mode) {
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode:face_mode} });
    videoElement.srcObject = stream;
}

async function detectFocus() {
    const model = await modelPromise;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    const canvasContext = canvasElement.getContext('2d');
    canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const tensor = tf.browser.fromPixels(imageData).toFloat();

    // Perform focus detection using your model
    const prediction = model.predict(tensor);
    alert(prediction)

    // Use the prediction to determine focus quality
    console.log('Focus prediction:', prediction);

    requestAnimationFrame(detectFocus);
}

startCamera(face_mode).then(() => {
    alert(face_mode)
    videoElement.play();
    detectFocus();
});