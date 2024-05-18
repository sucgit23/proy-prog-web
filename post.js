

const $fileInput = document.getElementById('image');
const $dropZone = document.getElementById('result-image');
const $img = document.getElementById('img-result');

$dropZone.addEventListener('click', () => $fileInput.click());

$dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    $dropZone.classList.add('form-file_result--active');
});

$dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    $dropZone.classList.remove('form-file_result--active');
});

$dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    $dropZone.classList.remove('form-file_result--active');
    handleFiles(e.dataTransfer.files);
});

$fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

const handleFiles = (files) => {
    const file = files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            $img.src = e.target.result;
            $dropZone.classList.add('form-file_result--hidden');
        };
        reader.readAsDataURL(file);
    }
};


