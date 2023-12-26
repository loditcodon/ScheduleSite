// Thêm sự kiện click cho nút có id="newsiteadd1"
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('newsiteadd1').addEventListener('click', openPopup);

});

document.addEventListener

// Định nghĩa hàm mở popup
function openPopup() {
    // Lấy thẻ container của popup
    var popupContainer = document.getElementById('popupContainer');

    // Hiển thị popup bằng cách thay đổi thuộc tính display thành 'flex'
    if (popupContainer) {
        popupContainer.style.display = 'flex';
    }
}

// Đóng popup khi nhấn nút "Close" trong popup
function closePopup() {
    var popupContainer = document.getElementById('popupContainer');
    if (popupContainer) {
        popupContainer.style.display = 'none';
    }
}

// Đóng popup khi nhấn vào ngoài popup
window.addEventListener('click', function (event) {
    var popupContainer = document.getElementById('popupContainer');
    if (event.target === popupContainer) {
        closePopup();
    }
});


