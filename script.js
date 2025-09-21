// AURA Gold Purity Analyzer - Mobile App JavaScript

// Global variables
let currentScreen = 'dashboard';
let testResults = [];
let scanInterval;
let progressValue = 0;
let currentTestMode = 'jewelry';
let currentStep = 1;
let batteryLevel = 87;

// Test mode configurations
const testModes = {
    jewelry: {
        name: 'Jewelry',
        icon: 'fas fa-gem',
        frequencyRange: { min: 850000, max: 1000000 },
        amplitudeRange: { min: 0.75, max: 1.05 },
        qFactorRange: { min: 75, max: 92 }
    },
    artefact: {
        name: 'Artefact',
        icon: 'fas fa-chess-rook',
        frequencyRange: { min: 650000, max: 850000 },
        amplitudeRange: { min: 0.45, max: 0.75 },
        qFactorRange: { min: 60, max: 75 }
    }
};

// Test steps configuration
const testSteps = [
    {
        id: 1,
        title: 'Initializing Device',
        description: 'Preparing electromagnetic resonance scanner...',
        duration: 2000
    },
    {
        id: 2,
        title: 'Calibrating Sensors',
        description: 'Calibrating frequency and amplitude sensors...',
        duration: 3000
    },
    {
        id: 3,
        title: 'Analyzing Sample',
        description: 'Processing resonance data and calculating purity...',
        duration: 4000
    },
    {
        id: 4,
        title: 'Finalizing Results',
        description: 'Completing analysis and generating certificate...',
        duration: 2000
    }
];

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
}

// Generate unique test ID
function generateTestId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `AURA-${timestamp}-${random}`.toUpperCase();
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
    showScreen('scanning');
    startEnhancedScanningAnimation();
}

function startScanningAnimation() {
    progressValue = 0;
    const progressFill = document.getElementById('scanProgress');
    const frequencyValue = document.getElementById('frequencyValue');
    const amplitudeValue = document.getElementById('amplitudeValue');

    // Simulate scanning progress
    scanInterval = setInterval(() => {
        progressValue += Math.random() * 15;

        if (progressValue >= 100) {
            progressValue = 100;
            clearInterval(scanInterval);
            completeTest();
        }

        // Update progress bar
        progressFill.style.width = progressValue + '%';

        // Update scan values
        const frequency = 650000 + Math.floor(Math.random() * 350000);
        const amplitude = 0.45 + Math.random() * 0.6;

        frequencyValue.textContent = frequency.toLocaleString() + ' Hz';
        amplitudeValue.textContent = amplitude.toFixed(2) + ' V';

    }, 200);
}

function completeTest() {
    // Generate random test results
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
    const sampleTypes = ['Jewelry', 'Coin', 'Bar', 'Artefact'];
    const sampleType = sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
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

    // Store result
    const testResult = {
        id: testId,
        purity: result.grade,
        percentage: result.percentage,
        confidence: result.confidence,
        sampleType: sampleType,
        date: now.toISOString(),
        frequency: parseInt(document.getElementById('frequencyValue').textContent),
        amplitude: parseFloat(document.getElementById('amplitudeValue').textContent)
    };

    testResults.push(testResult);
    localStorage.setItem('auraTestResults', JSON.stringify(testResults));

    // Show results
    setTimeout(() => {
        showScreen('results');
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
                <span class="record-label">ID:</span>
                <span class="record-value">${result.id}</span>
            </div>
        </div>
    `;

    return recordDiv;
}

function updateStats() {
    const totalTests = testResults.length;

    document.getElementById('totalTests').textContent = totalTests;
}

// Utility functions
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
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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

// Mode selection functions
function selectMode(mode) {
    currentTestMode = mode;

    // Update button states
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });

    // Update scanning parameters based on mode
    updateScanningParameters(mode);

    showNotification(`Switched to ${mode} mode`, 'info');
}

function updateScanningParameters(mode) {
    // Adjust scanning parameters based on test mode
    const frequencyRange = {
        jewelry: { min: 650000, max: 850000 },
        coin: { min: 550000, max: 750000 },
        bar: { min: 450000, max: 650000 },
        artefact: { min: 500000, max: 700000 }
    };

    const amplitudeRange = {
        jewelry: { min: 0.3, max: 0.8 },
        coin: { min: 0.4, max: 0.9 },
        bar: { min: 0.5, max: 1.0 },
        artefact: { min: 0.35, max: 0.85 }
    };

    // Store current ranges for use in scanning animation
    window.currentFrequencyRange = frequencyRange[mode];
    window.currentAmplitudeRange = amplitudeRange[mode];
}

// Test steps functions
function updateTestSteps(step) {
    currentStep = step;

    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        stepElement.classList.remove('active', 'completed');

        if (index + 1 < step) {
            stepElement.classList.add('completed');
        } else if (index + 1 === step) {
            stepElement.classList.add('active');
        }
    });

    // Update progress text
    const progressTexts = [
        'Initializing sensors...',
        'Calibrating frequency...',
        'Analyzing sample...',
        'Processing results...'
    ];

    const progressElement = document.getElementById('progressText');
    if (progressElement) {
        progressElement.textContent = progressTexts[step - 1] || 'Processing...';
    }
}

// Q-Factor display functions
function updateQFactor() {
    // Simulate Q-Factor calculation
    const baseQFactor = 85 + Math.random() * 25; // 85-110 range
    const qFactor = Math.round(baseQFactor * 10) / 10;

    const qFactorElement = document.getElementById('qFactorValue');
    if (qFactorElement) {
        qFactorElement.textContent = qFactor;
    }

    return qFactor;
}

function updateSignalQuality() {
    // Simulate signal quality based on Q-Factor
    const qFactor = parseFloat(document.getElementById('qFactorValue')?.textContent || '90');
    const signalQuality = Math.min(100, Math.max(0, (qFactor - 50) * 2));

    const signalQualityElement = document.getElementById('signalQualityValue');
    if (signalQualityElement) {
        signalQualityElement.textContent = Math.round(signalQuality) + '%';
    }

    return signalQuality;
}

// Enhanced scanning animation with steps
function startEnhancedScanningAnimation() {
    progressValue = 0;
    currentStep = 1;

    const progressFill = document.getElementById('scanProgress');
    const frequencyValue = document.getElementById('frequencyValue');
    const amplitudeValue = document.getElementById('amplitudeValue');

    // Initialize test steps
    updateTestSteps(1);

    // Simulate multi-step scanning process
    scanInterval = setInterval(() => {
        progressValue += Math.random() * 8;

        if (progressValue >= 25 && currentStep === 1) {
            currentStep = 2;
            updateTestSteps(2);
        } else if (progressValue >= 50 && currentStep === 2) {
            currentStep = 3;
            updateTestSteps(3);
        } else if (progressValue >= 75 && currentStep === 3) {
            currentStep = 4;
            updateTestSteps(4);
        }

        if (progressValue >= 100) {
            progressValue = 100;
            currentStep = 4;
            updateTestSteps(4);
            clearInterval(scanInterval);

            // Final updates
            updateQFactor();
            updateSignalQuality();

            setTimeout(() => {
                completeTest();
            }, 500);
        }

        // Update progress bar
        progressFill.style.width = progressValue + '%';

        // Update scan values with mode-specific ranges
        const freqRange = window.currentFrequencyRange || { min: 650000, max: 850000 };
        const ampRange = window.currentAmplitudeRange || { min: 0.3, max: 0.8 };

        const frequency = freqRange.min + Math.floor(Math.random() * (freqRange.max - freqRange.min));
        const amplitude = ampRange.min + Math.random() * (ampRange.max - ampRange.min);

        frequencyValue.textContent = frequency.toLocaleString() + ' Hz';
        amplitudeValue.textContent = amplitude.toFixed(2) + ' V';

    }, 300);
}

// Export test results
function exportResults() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "Test ID,Date,Purity Grade,Purity %,Confidence %,Sample Type,Frequency Hz,Amplitude V\n"
        + testResults.map(result => {
            const date = new Date(result.date);
            return `${result.id},${date.toLocaleString()},${result.purity},${result.percentage},${result.confidence},${result.sampleType},${result.frequency},${result.amplitude}`;
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

// Make functions globally available
window.startTest = startTest;
window.goBack = goBack;
window.toggleMenu = toggleMenu;
window.showScreen = showScreen;
window.saveResult = saveResult;
window.generateCertificate = generateCertificate;
window.downloadCertificate = downloadCertificate;
window.shareCertificate = shareCertificate;
window.verifyBlockchain = verifyBlockchain;
window.exportResults = exportResults;
window.selectMode = selectMode;
window.updateTestSteps = updateTestSteps;
window.updateQFactor = updateQFactor;
window.updateSignalQuality = updateSignalQuality;
