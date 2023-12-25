const uploadBox = document.querySelector(".upload-box"),
// previewImage =uploadBox.querySelector("i");
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".ratio input"),
downloadBtn = document.querySelector(".download-btn")
;

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return; // return if the user hasn't selected a image
    
    if (uploadBox.querySelector("i")) {
        const img = document.createElement("img");
        uploadBox.querySelector("i").replaceWith(img);
    }
    const previewImage = uploadBox.querySelector("img");   

    previewImage.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImage.addEventListener("load", () => {
        widthInput.value = previewImage.naturalWidth;
        heightInput.value = previewImage.naturalHeight;
        ogImageRatio = previewImage.naturalWidth / previewImage.naturalWidth;
        document.querySelector(".wrapper").classList.add("active");
    });
}


function widthRatio() {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.round(height); 
}
widthInput.addEventListener("keyup", widthRatio);
widthInput.addEventListener("blur", widthRatio);

function heightRatio() {
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.round(width); 
}
heightInput.addEventListener("keyup", heightRatio)
heightInput.addEventListener("blur", heightRatio);

const resizeAndDownload= () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkbox is checked, pass .07 to imgQuality
    // else pass 1
    // 1.0 = 100% quality, 0.7 is 70% of total
    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    // setting canvas height and width according to input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image onto the canvas
    const previewImage = uploadBox.querySelector("img");  // duplicated because the previous one is internal only
    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);
    // document.body.appendChild(canvas);

    // pass canvas data url as href value of a to initiate download
    a.href = canvas.toDataURL("image/jpg", imgQuality);
    a.download = new Date().getTime(); // this is the new filename (Unix timestamp)
    a.click();
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());