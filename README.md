# AURA - Gold Purity Analyzer Mobile App

A modern, clean mobile-first interface for a gold purity analyzer device with digital certificate generation and blockchain verification capabilities.

## Features

### 🏠 Dashboard
- Clean, modern interface with device connection status
- Quick access to start testing
- Real-time statistics display
- Easy navigation menu

### 🔬 Testing Interface
- Animated resonance wave visualization during scanning
- Real-time progress tracking
- Live frequency and amplitude readings
- Smooth progress animations

### 📊 Results Display
- Large, bold purity results (e.g., "22K Gold")
- Percentage purity with visual indicators
- Confidence score with circular progress display
- Detailed test information

### 📜 Digital Certificate
- Professional certificate layout with golden border
- Complete test details and authentication information
- QR code for verification
- Download, share, and blockchain verification options

### 📚 Test Records
- Complete history of all tests
- Sortable by date and purity
- Detailed information for each test
- Export functionality

### ℹ️ About & Help
- Information about the non-destructive testing method
- Technical specifications
- Support contact information

## Technical Features

- **Responsive Design**: Optimized for mobile devices
- **Modern UI**: Clean, minimalist design with gold accents
- **Real-time Updates**: Live scanning progress and results
- **Data Persistence**: Local storage for test records
- **Export Functionality**: CSV export of test data
- **Touch Support**: Swipe navigation and touch interactions
- **Professional Styling**: High-contrast, easy-to-read interface

## Color Scheme

- **Primary**: White backgrounds with subtle gray shadows
- **Accent**: Gold/amber (#d4af37) for highlights and important metrics
- **Text**: Dark gray (#333) for primary text, lighter gray (#666) for secondary
- **Background**: Clean white with light gray (#fafafa) base

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # All functionality and interactions
├── aura_dataset.csv    # Synthetic test data for development
└── README.md           # This documentation
```

## Usage

1. Open `index.html` in a web browser or mobile device
2. The app works entirely offline after loading
3. Start testing by clicking the "Start Test" button
4. View results and generate certificates
5. Access records and export data as needed

## Sample Data

The included `aura_dataset.csv` contains 80 synthetic test records with realistic values for different gold purities and materials:

- **24K Gold**: Highest frequency (975k-995k Hz), amplitude (0.95-1.03V), Q-factor (84-89)
- **22K Gold**: Medium-high values (883k-898k Hz, 0.86-0.92V, 74-78 Q-factor)
- **18K Gold**: Medium values (761k-769k Hz, 0.70-0.75V, 60-64 Q-factor)
- **14K Gold**: Lower values (651k-658k Hz, 0.56-0.60V, 47-49 Q-factor)
- **Other Materials**: Progressively lower values for accurate identification

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App ready

## Development Notes

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies required
- Fully responsive and touch-optimized
- Professional certificate styling with golden borders
- Animated wave visualization during testing
- Local storage for data persistence

## Certificate Features

- Professional layout with authentication details
- Unique certificate IDs for blockchain verification
- QR codes for easy sharing and verification
- Multiple export options (PDF, share, blockchain)
- Electromagnetic resonance method documentation

---

*Built with modern web technologies for a professional gold testing experience.*
