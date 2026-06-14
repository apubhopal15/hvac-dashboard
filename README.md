# HVAC Dashboard

A comprehensive HVAC Duct Velocity Calculator Dashboard with Excel file integration.

## Features
- 📊 Interactive HVAC duct calculation dashboard
- 📁 Excel file integration for duct velocity calculations
- 📈 Real-time calculations and data visualization
- 💾 Support for ESIC HVAC data files

## Project Structure
```
hvac-dashboard/
├── index.html           # Main dashboard interface
├── hvac-duct.html       # HVAC duct calculator page
├── js/
│   ├── app.js          # Main application logic
│   └── excel-handler.js # Excel file reading and processing
├── css/
│   └── style.css       # Dashboard styling
├── data/
│   └── ESIC_HVAC_Duct_Velocity_Calculations_2.xlsx
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local development server)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/apubhopal15/hvac-dashboard.git
cd hvac-dashboard
```

2. Open `hvac-duct.html` in your browser or start a local server:
```bash
python -m http.server 8000
# or
npx http-server
```

3. Upload your Excel file or use the provided ESIC data

## Excel File Integration
The dashboard supports reading HVAC duct velocity calculations from Excel files (.xlsx format).

### Supported Excel Format
- Duct Size columns
- Velocity data
- Calculation results
- Supporting technical parameters

## Usage
1. Open the HVAC Dashboard in your browser
2. Upload or select an Excel file with duct calculations
3. View real-time calculations and visualizations
4. Export results as needed

## Contributing
Contributions are welcome! Feel free to submit pull requests.

## License
MIT License - See LICENSE file for details

## Support
For issues or questions, please create a GitHub issue or contact the maintainer.

---

**Created:** 2026-06-14
**Maintained by:** apubhopal15
