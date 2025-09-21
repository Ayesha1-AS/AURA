// AURA Gold Purity Analyzer - Enhanced Mobile App JavaScript

// Global variables
let currentScreen = 'dashboard';
let testResults = [];
let scanInterval;
let progressValue = 0;
let currentStep = 1;
let testMode = 'jewelry';
let batteryLevel = 87;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadTestRecords();
    updateStats();
    startBatteryMonitoring();
});

// Initialize the application
function initializeApp() {
    // Set current date
    document.getElementById('testDate').textContent = new Date().toLocaleDateString();
    document.getElementById('certDate').textContent = new Date().toLocaleString();

    // Generate unique test ID
    document.getElementById('testId').textContent = generateTestId();
    document.getElementById('certId').textContent = generateTestId();

    // Update battery level display
    updateBatteryDisplay();
}

// Battery monitoring
function startBatteryMonitoring() {
    // Simulate battery monitoring
    setInterval(() => {
        batteryLevel = Math.max(10, batteryLevel - Math.random() * 0.5);
        updateBatteryDisplay();

        // Warn when battery is low
        if (batteryLevel < 20) {
            showNotification('Low battery! Please charge your device.', 'warning');
        }
    }, 30000); // Update every 30 seconds
}

function updateBatteryDisplay() {
    const batteryElements = document.querySelectorAll('#batteryLevel, #batteryLevelScan, #batteryLevelResult, #batteryLevelCert, #batteryLevelRecords, #batteryLevelAbout');
    batteryElements.forEach(el => {
        if (el) el.textContent = Math.round(batteryLevel) + '%';
        });

    // Update battery icon based on level
    const batteryIcons = document.querySelectorAll('.battery-icon i');
    batteryIcons.forEach(icon => {
        if (batteryLevel > 75) {
            icon.className = 'fas fa-battery-full';
            icon.style.color = '#22c55e';
        } else if (batteryLevel > 50) {
            icon.className = 'fas fa-battery-three-quarters';
            icon.style.color = '#22c55e';
        } else if (batteryLevel > 25) {
            icon.className = 'fas fa-battery-half';
            icon.style.color = '#f59e0b';
        } else {
            icon.className = 'fas fa-battery-quarter';
            icon.style.color = '#ef4444';
        }
    });
}

// Mode selection
function setTestMode(mode) {
    testMode = mode;
    const modeBtns = document.querySelectorAll('.mode-btn');

    modeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Update sample type in results
    const sampleTypeElements = document.querySelectorAll('#sampleType, #certSampleType');
    sampleTypeElements.forEach(el => {
        if (el) el.textContent = mode === 'jewelry' ? 'Jewelry' : 'Artefact';
    });

    showNotification(`Test mode set to ${mode}`, 'info');
}

// Navigation functions
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }

    // Close menu if open
    closeMenu();
}

function goBack() {
    if (currentScreen === 'scanning' || currentScreen === 'results' || currentScreen === 'certificate') {
        showScreen('dashboard');
    } else if (currentScreen === 'records' || currentScreen === 'about') {
        showScreen('dashboard');
    }
}

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (sideMenu.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    sideMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Testing functions
function startTest() {
    if (batteryLevel < 15) {
        showNotification('Battery too low to start test. Please charge your device.', 'error');
        return;
    }

    showScreen('scanning');
    startScanningAnimation();
}

function startScanningAnimation() {
    progressValue = 0;
    currentStep = 1;
    const progressFill = document.getElementById('scanProgress');
    const frequencyValue = document.getElementById('frequencyValue');
    const amplitudeValue = document.getElementById('amplitudeValue');
    const qFactorValue = document.getElementById('qFactorValue');
    const currentStepTitle = document.getElementById('currentStepTitle');
    const currentStepText = document.getElementById('currentStepText');

    const steps = [
        {
            title: 'Initializing Device',
            text: 'Preparing electromagnetic resonance scanner...',
            duration: 2000
        },
        {
            title: 'Calibrating Sensors',
            text: 'Calibrating frequency and amplitude sensors...',
            duration: 3000
        },
        {
            title: 'Analyzing Sample',
            text: `Scanning ${testMode} sample with electromagnetic resonance...`,
            duration: 4000
        },
        {
            title: 'Processing Results',
            text: 'Calculating purity and generating certificate...',
            duration: 2000
        }
    ];

    let stepIndex = 0;

    function processStep() {
        if (stepIndex >= steps.length) {
            completeTest();
            return;
        }

        const step = steps[stepIndex];
        currentStepTitle.textContent = step.title;
        currentStepText.textContent = step.text;

        // Update step indicator
        updateStepIndicator(stepIndex + 1);

        // Simulate progress for this step
        const stepProgress = setInterval(() => {
            progressValue += Math.random() * 5;

            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(stepProgress);
                stepIndex++;
                setTimeout(processStep, 500);
            }

            // Update progress bar
            progressFill.style.width = progressValue + '%';

            // Update scan values (only during analysis step)
            if (stepIndex === 2) {
                const frequency = 650000 + Math.floor(Math.random() * 350000);
                const amplitude = 0.45 + Math.random() * 0.6;
                const qFactor = 8 + Math.random() * 84;

                frequencyValue.textContent = frequency.toLocaleString() + ' Hz';
                amplitudeValue.textContent = amplitude.toFixed(2) + ' V';
                qFactorValue.textContent = Math.round(qFactor);
            }

        }, 100);
    }

    processStep();
}

function updateStepIndicator(activeStep) {
    const steps = document.querySelectorAll('.step');
    const lines = document.querySelectorAll('.step-line');

    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < activeStep) {
            step.classList.add('completed');
        } else if (index + 1 === activeStep) {
            step.classList.add('active');
        }
    });

    lines.forEach((line, index) => {
        if (index < activeStep - 1) {
            line.style.background = '#22c55e';
        } else {
            line.style.background = '#e5e5e5';
        }
    });
}

function completeTest() {
    // Generate random test results based on mode
    const purityResults = [
        { grade: '24K Gold', percentage: 99.9, confidence: 98 },
        { grade: '22K Gold', percentage: 91.7, confidence: 95 },
        { grade: '18K Gold', percentage: 75.0, confidence: 92 },
        { grade: '14K Gold', percentage: 58.3, confidence: 89 }
    ];

    const result = purityResults[Math.floor(Math.random() * purityResults.length)];

    // Update results screen
    document.getElementById('purityResult').textContent = result.grade;
    document.getElementById('purityPercentage').textContent = result.percentage + '%';
    document.getElementById('confidenceScore').textContent = result.confidence;

    // Update certificate
    document.getElementById('certPurity').textContent = result.grade;
    document.getElementById('certPercentage').textContent = result.percentage + '%';
    document.getElementById('certConfidence').textContent = result.confidence + '%';

    // Update sample type
    const sampleType = testMode === 'jewelry' ? 'Jewelry' : 'Artefact';
    document.getElementById('sampleType').textContent = sampleType;
    document.getElementById('certSampleType').textContent = sampleType;

    // Update dates
    const now = new Date();
    document.getElementById('testDate').textContent = now.toLocaleDateString();
    document.getElementById('certDate').textContent = now.toLocaleString();

    // Update test ID
    const testId = generateTestId();
    document.getElementById('testId').textContent = testId;
    document.getElementById('certId').textContent = testId;

    // Get scan values
    const frequency = document.getElementById('frequencyValue').textContent;
    const amplitude = document.getElementById('amplitudeValue').textContent;
    const qFactor = document.getElementById('qFactorValue').textContent;

    // Update result details
    document.getElementById('resultFrequency').textContent = frequency;
    document.getElementById('resultAmplitude').textContent = amplitude;
    document.getElementById('resultQFactor').textContent = qFactor;

    // Update certificate details
    document.getElementById('certFrequency').textContent = frequency;
    document.getElementById('certAmplitude').textContent = amplitude;
    document.getElementById('certQFactor').textContent = qFactor;

    // Store result
    const testResult = {
        id: testId,
        purity: result.grade,
        percentage: result.percentage,
        confidence: result.confidence,
        sampleType: sampleType,
        mode: testMode,
        date: now.toISOString(),
        frequency: parseInt(frequency.replace(/[^0-9]/g, '')) || 0,
        amplitude: parseFloat(amplitude) || 0,
        qFactor: parseInt(qFactor) || 0
    };

    testResults.push(testResult);
    localStorage.setItem('auraTestResults', JSON.stringify(testResults));

    // Show results
    setTimeout(() => {
        showScreen('results');
        showNotification('Test completed successfully!', 'success');
    }, 500);
}

// Results functions
function saveResult() {
    // In a real app, this would save to a database
    showNotification('Result saved successfully!', 'success');
}

function generateCertificate() {
    showScreen('certificate');
}

// Certificate functions
function downloadCertificate() {
    // In a real app, this would generate and download a PDF
    showNotification('Certificate downloaded successfully!', 'success');
}

function shareCertificate() {
    if (navigator.share) {
        navigator.share({
            title: 'AURA Gold Purity Certificate',
            text: 'Gold purity test certificate',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        showNotification('Certificate link copied to clipboard!', 'success');
    }
}

function verifyBlockchain() {
    // In a real app, this would open blockchain verification
    showNotification('Opening blockchain verification...', 'info');
}

// Records functions
function loadTestRecords() {
    const recordsList = document.getElementById('recordsList');
    const noRecords = document.getElementById('noRecords');

    // Load from localStorage
    const savedResults = localStorage.getItem('auraTestResults');
    if (savedResults) {
        testResults = JSON.parse(savedResults);
    }

    if (testResults.length === 0) {
        recordsList.style.display = 'none';
        noRecords.style.display = 'block';
        return;
    }

    recordsList.style.display = 'flex';
    noRecords.style.display = 'none';
    recordsList.innerHTML = '';

    // Sort by date (newest first)
    testResults.sort((a, b) => new Date(b.date) - new Date(a.date));

    testResults.forEach(result => {
        const recordElement = createRecordElement(result);
        recordsList.appendChild(recordElement);
    });

    updateStats();
}

function createRecordElement(result) {
    const recordDiv = document.createElement('div');
    recordDiv.className = 'record-item';

    const date = new Date(result.date);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    recordDiv.innerHTML = `
        <div class="record-header">
            <div class="record-purity">${result.purity}</div>
            <div class="record-date">${formattedDate} ${formattedTime}</div>
        </div>
        <div class="record-details">
            <div class="record-detail">
                <span class="record-label">Purity:</span>
                <span class="record-value">${result.percentage}%</span>
            </div>
            <div class="record-detail">
                <span class="record-label">Confidence:</span>
                <span class="record-value">${result.confidence}%</span>
            </div>
            <div class="record-detail">
                <span class="record-label">Type:</span>
                <span class="record-value">${result.sampleType}</span>
            </div>
            <div class="record-detail">
                <span class="record-label">Mode:</span>
                <span class="record-value">${result.mode}</span>
            </div>
        </div>
    `;

    return recordDiv;
}

function filterRecords(filter) {
    const recordsList = document.getElementById('recordsList');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update filter buttons
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    // Filter records
    const recordItems = recordsList.querySelectorAll('.record-item');
    recordItems.forEach(item => {
        const mode = item.querySelector('.record-value:last-child').textContent.toLowerCase();
        if (filter === 'all' || mode === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function updateStats() {
    const totalTests = testResults.length;
    const avgPurity = totalTests > 0
        ? Math.round((testResults.reduce((sum, result) => sum + result.percentage, 0) / totalTests) * 10) / 10
        : 0;

    document.getElementById('totalTests').textContent = totalTests;
    document.getElementById('avgPurity').textContent = avgPurity + '%';
}

// Export test results
function exportResults() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "Test ID,Date,Purity Grade,Purity %,Confidence %,Sample Type,Mode,Frequency Hz,Amplitude V,Q-Factor\n"
        + testResults.map(result => {
            const date = new Date(result.date);
            return `${result.id},${date.toLocaleString()},${result.purity},${result.percentage},${result.confidence},"${result.sampleType}",${result.mode},${result.frequency},${result.amplitude},${result.qFactor}`;
        }).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "aura_test_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Results exported successfully!', 'success');
}

// Utility functions
function generateTestId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `AURA-${timestamp}-${random}`.toUpperCase();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (currentScreen !== 'dashboard') {
            goBack();
        } else if (document.getElementById('sideMenu').classList.contains('open')) {
            closeMenu();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentScreen !== 'dashboard') {
            // Swipe right - go back
            goBack();
        }
    }
}

// Make functions globally available
window.startTest = startTest;
window.goBack = goBack;
window.toggleMenu = toggleMenu;
window.showScreen = showScreen;
window.setTestMode = setTestMode;
window.saveResult = saveResult;
window.generateCertificate = generateCertificate;
window.downloadCertificate = downloadCertificate;
window.shareCertificate = shareCertificate;
window.verifyBlockchain = verifyBlockchain;
window.exportResults = exportResults;
window.filterRecords = filterRecords;
