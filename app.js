document.addEventListener('DOMContentLoaded', () => {
    // Data definition for forms
    const formsData = [
        { name: "T1 General", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/tax-packages-years/general-income-tax-benefit-package.html" },
        { name: "T4 Slip", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t4.html" },
        { name: "T4A Slip", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t4a.html" },
        { name: "T2125", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t2125.html" },
        { name: "Schedule 8", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/5000-s8.html" },
        { name: "T1135", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t1135.html" },
        { name: "T1-ADJ", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t1-adj.html" },
        { name: "RC66", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/rc66.html" },
        { name: "T1139", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/t1139.html" },
        { name: "GST/HST Return (GST34)", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/gst34.html" }
    ];

    const formSelector = document.getElementById('form-selector');
    const downloadBtn = document.getElementById('download-btn');
    const iframeSection = document.getElementById('iframe-section');
    const formIframe = document.getElementById('form-iframe');

    // Populate Dropdown
    formsData.forEach((form, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = form.name;
        formSelector.appendChild(option);
    });

    formSelector.addEventListener('change', (e) => {
        if (e.target.value !== "") {
            downloadBtn.disabled = false;
            const url = formsData[e.target.value].url;
            formIframe.src = url;
            iframeSection.style.display = 'block';
        } else {
            downloadBtn.disabled = true;
            iframeSection.style.display = 'none';
            formIframe.src = '';
        }
    });

    // Handle Download Button Click
    downloadBtn.addEventListener('click', () => {
        const selectedIndex = formSelector.value;
        if (selectedIndex !== "") {
            const url = formsData[selectedIndex].url;
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // We need to wrap the contents of accordion-content into accordion-content-inner for smooth animation if not already done.
    // Let's do it dynamically or just apply the styles correctly. We'll use JS to handle the height.
    document.querySelectorAll('.accordion-content').forEach(content => {
        const innerHtml = content.innerHTML;
        content.innerHTML = `<div class="accordion-content-inner">${innerHtml}</div>`;
    });

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle active class on header
            this.classList.toggle('active');

            // Get the content element
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                // If it's open, close it
                content.style.maxHeight = null;
            } else {
                // If it's closed, open it
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check local storage or OS preference
    const savedTheme = localStorage.getItem('theme');
    const osPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && osPrefersLight)) {
        document.documentElement.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyLight = document.documentElement.classList.contains('light-theme') ||
            (!document.documentElement.classList.contains('dark-theme') && window.matchMedia('(prefers-color-scheme: light)').matches);

        if (isCurrentlyLight) {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});
