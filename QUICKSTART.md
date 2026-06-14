# HVAC Dashboard - Quick Start Guide

## 🚀 Getting Started

### Option 1: Open Directly in Browser
1. Clone the repository:
   ```bash
   git clone https://github.com/apubhopal15/hvac-dashboard.git
   cd hvac-dashboard
   ```

2. Open `hvac-duct.html` in your web browser directly

### Option 2: Use Local Server (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/apubhopal15/hvac-dashboard.git
   cd hvac-dashboard
   ```

2. Start a local server:

   **Using Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Using Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```

   **Using Node.js (with npm):**
   ```bash
   npm install -g http-server
   http-server
   ```

3. Open your browser and navigate to:
   - `http://localhost:8000/hvac-duct.html`

## 📊 How to Use

### Load Data
1. **From Excel File:**
   - Click "📁 Upload Excel File"
   - Select your HVAC data Excel file (supports .xlsx and .xls)
   - The dashboard will automatically parse and calculate all values

2. **Load Sample Data:**
   - Click "📊 Load Sample Data" to see example HVAC calculations
   - This loads 8 sample units from ESIC Hospital Pithampur

### View Results
- **Summary Cards:** Shows total units, status counts, and average velocity
- **Data Table:** Displays all calculations with status indicators
  - 🟢 **OK:** Velocity is within CPWD limits
  - 🔴 **REVISE:** Velocity exceeds CPWD limits

### Export Data
- Click "💾 Export CSV" to download the calculations as a CSV file
- Perfect for reports and documentation

## 📐 Calculation Formulae

The dashboard automatically calculates:

- **Duct Area (m²)** = W(mm)/1000 × H(mm)/1000
- **Flow (m³/s)** = CFM × 0.000472
- **Flow (m³/h)** = Flow(m³/s) × 3600
- **Velocity (m/s)** = Flow(m³/s) / Area(m²)
- **Velocity (m/min)** = Vel(m/s) × 60
- **Velocity (fpm)** = Vel(m/min) × 3.281

## 📋 Excel File Format

Your Excel file should have the following columns:

| Column Name | Format | Example |
|---|---|---|
| SR NO | Integer | 1 |
| UNIT TAG / TYPE | Text | AHU-4.0 TR |
| ZONE / ROOM | Text | Emergency OT |
| CAPACITY (TR) | Decimal | 4.0 |
| SUPPLY CFM | Integer | 1600 |
| DUCT W (mm) | Integer | 550 |
| DUCT H (mm) | Integer | 300 |
| CPWD LIMIT | Integer | 400 |
| REMARK | Text | AHU Main Supply |

## 🎯 Features

✅ **Real-time Calculations** - Instant HVAC velocity calculations
✅ **Excel Integration** - Upload your HVAC data files
✅ **Status Validation** - Automatic CPWD limit checking
✅ **Summary Dashboard** - Key metrics at a glance
✅ **Export Functionality** - Save results as CSV
✅ **Responsive Design** - Works on desktop and mobile
✅ **Sample Data** - Test with built-in example data

## 🛠️ Technical Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Excel Reading:** SheetJS (XLSX library)
- **Styling:** Modern CSS with gradients and responsive layout
- **Browser Support:** Chrome, Firefox, Safari, Edge (modern versions)

## 📁 Project Structure

```
hvac-dashboard/
├── hvac-duct.html       # Main dashboard interface
├── js/
│   └── app.js          # Application logic & Excel handling
├── README.md           # Project documentation
├── QUICKSTART.md       # This file
└── .gitignore          # Git ignore rules
```

## 🔧 Troubleshooting

### Excel file not loading
- Ensure file is in .xlsx or .xls format
- Check that all required columns are present
- Try the sample data first to verify dashboard works

### Calculations showing 0 or NaN
- Check that numeric values are actual numbers, not text
- Verify DUCT W and DUCT H are not zero
- Ensure CFM values are positive numbers

### Display issues
- Try a different browser (Chrome recommended)
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check browser console for errors (F12)

## 📞 Support

For issues, questions, or feature requests:
1. Check the GitHub repository issues page
2. Submit a new issue with details about your problem
3. Include the Excel file format if it's a data loading issue

## 📄 License

This project is open source. See LICENSE file for details.

---

**Last Updated:** 2026-06-14
**Version:** 1.0
**Project:** ESIC Hospital - HVAC Dashboard System
