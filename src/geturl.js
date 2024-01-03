document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.getElementById('popupContainer');
    const popupTitle = document.getElementById('popupTitle');
    const popupTextarea = document.getElementById('popupTextarea');

    function openPopup(title, apiUrl) {
        popupTitle.textContent = title;
    
        // Fetch content from the provided URL
        fetch(apiUrl)
            .then(response => response.json()) // Assuming the response is in JSON format
            .then(data => {
                // Extract domains from the response and join them with '\n'
                const domains = data.map(entry => entry.domain).join('\n');
                popupTextarea.value = domains;
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
        openPopup('Malicious website', 'https://schedulesite.gachcloud.net/api/data/maliciousUrl');
    });

    document.getElementById('newsiteadd2').addEventListener('click', function () {
        openPopup('Phishing website', 'https://schedulesite.gachcloud.net/api/data/phishingUrl');
    });

    document.getElementById('newsiteadd3').addEventListener('click', function () {
        openPopup('Pup website', 'https://schedulesite.gachcloud.net/api/data/pupUrl');
    });

    document.getElementById('newsiteadd4').addEventListener('click', function () {
        openPopup('Tracking website', 'https://schedulesite.gachcloud.net/api/data/trackingUrl');
    });

    document.getElementById('newsiteadd5').addEventListener('click', function () {
        openPopup('VN Bad website', 'https://schedulesite.gachcloud.net/api/data/vnbadsiteUrl');
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
