document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popupContainer');
    const popupTitle = document.getElementById('popupTitle');
    const popupTextarea = document.getElementById('popupTextarea');

    function openPopup(title, url) {
        popupTitle.textContent = title;
        // Fetch content from the provided URL
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Remove lines containing '#' or '!'
                const filteredData = data.split('\n').filter(line => !/[#!]/.test(line)).join('\n');
                popupTextarea.value = filteredData;
                popupContainer.style.display = 'block';
            })
            .catch(error => console.error('Error fetching content:', error));

    }

    function closePopup() {
        popupContainer.style.display = 'none';
        popupTitle.textContent = '';
        popupTextarea.value = '';
    }

    document.getElementById('newsiteadd1').addEventListener('click', function () {
        openPopup('Malicious website', 'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-dnscrypt-blocked-names.txt');
    });

    document.getElementById('newsiteadd2').addEventListener('click', function () {
        openPopup('Fishing website', 'https://malware-filter.gitlab.io/malware-filter/urlhaus-filter-dnscrypt-blocked-names.txt');
    });

    document.getElementById('newsiteadd3').addEventListener('click', function () {
        openPopup('Pup website', 'https://malware-filter.gitlab.io/pup-filter/pup-filter.txt');
    });

    document.getElementById('newsiteadd4').addEventListener('click', function () {
        openPopup('Tracking website', 'https://curbengh.github.io/tracking-filter/tracking-data.txt');
    });

    document.getElementById('newsiteadd5').addEventListener('click', function () {
        openPopup('VN Bad website', 'https://curbengh.github.io/vn-badsite-filter/vn-badsite-filter-dnscrypt-blocked-names.txt');
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === popupContainer) {
            closePopup();
        }
    });
    function initializeCheckbox(checkboxId, storageKey) {
        const checkbox = document.getElementById(checkboxId);
    
        checkbox.addEventListener('change', function () {
            const isChecked = this.checked;
            chrome.storage.local.set({ [storageKey]: isChecked });
        });
    
        chrome.storage.local.get(storageKey, function (result) {
            const savedState = result[storageKey];
            if (savedState !== undefined) {
                checkbox.checked = savedState;
            }
        });
    }
    
    // Initialize checkboxes
    initializeCheckbox('flexSwitchCheckChecked1', 'flexSwitchCheckChecked1');
    initializeCheckbox('flexSwitchCheckChecked2', 'flexSwitchCheckChecked2');
    initializeCheckbox('flexSwitchCheckChecked3', 'flexSwitchCheckChecked3');
    initializeCheckbox('flexSwitchCheckChecked4', 'flexSwitchCheckChecked4');
    initializeCheckbox('flexSwitchCheckChecked5', 'flexSwitchCheckChecked5');
});