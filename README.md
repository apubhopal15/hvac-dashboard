# 🏥 HVAC DUCT VELOCITY CALCULATOR

**ESIC Hospital – Pithampur (M.P.) | Ground Floor HVAC Equipment Analysis System**

![Status](https://img.shields.io/badge/status-ready%20for%20deployment-brightgreen)
![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Overview

The HVAC Dashboard is a web-based application designed to calculate and analyze duct velocity for HVAC systems. It automatically:

- ✅ Uploads Excel files with HVAC equipment data
- ✅ Calculates duct areas, flow rates, and velocities
- ✅ Validates against CPWD (Central Public Works Department) standards
- ✅ Generates comprehensive reports
- ✅ Exports results to CSV format

---

## 🚀 Quick Start - Deploy in 3 Steps

### **Step 1: SSH to Your Oracle Cloud Server**
```bash
ssh -i "C:\Users\madan\Desktop\vm key_14 04 2026 22 18 PM -DESKTOP\ssh-key-2026-04-14.key" ubuntu@80.225.193.121
```

### **Step 2: Run Automated Deployment**
```bash
cd /tmp && wget https://raw.githubusercontent.com/apubhopal15/hvac-dashboard/main/deploy.sh && sudo bash deploy.sh
```

### **Step 3: Access Dashboard**
```
http://80.225.193.121/hvac-dashboard/hvac-duct.html
```

**That's it! 🎉 Dashboard is live in 2-3 minutes**

---

## 📊 Features

### Core Features
- 📁 **Excel Integration** - Upload .xlsx and .xls files
- 🔢 **Auto Calculations** - All HVAC formulas calculated instantly
- ✅ **CPWD Validation** - Status indicators (OK/REVISE)
- 📱 **Responsive Design** - Works on all devices
- 💾 **CSV Export** - Download results for reports
- 🎨 **Modern UI** - Beautiful gradient interface

### Technical Features
- ⚡ **Real-time Processing** - No server-side processing needed
- 🔒 **Secure** - All calculations done locally
- 🌐 **Browser-Based** - Works on any modern browser
- 📊 **SheetJS Integration** - Native Excel file parsing
- 📈 **Summary Dashboard** - Key metrics at a glance

---

## 📐 Calculations Performed

The dashboard automatically calculates:

```
1. Duct Area (m²)      = W(mm)/1000 × H(mm)/1000
2. Flow (m³/s)         = CFM × 0.000472
3. Flow (m³/h)         = Flow(m³/s) × 3600
4. Velocity (m/s)      = Flow(m³/s) / Area(m²)
5. Velocity (m/min)    = Vel(m/s) × 60
6. Velocity (fpm)      = Vel(m/min) × 3.281
7. CPWD Status         = Compare with limits
```

---

## 📁 Project Structure

```
hvac-dashboard/
├── index.html                  # Home page
├── hvac-duct.html             # Main dashboard
├── js/
│   └── app.js                # Application logic
├── README.md                 # This file
├── QUICKSTART.md             # User guide
├── DEPLOYMENT_GUIDE.md       # Installation steps
├── DEPLOYMENT_SUMMARY.md     # Quick summary
├── deploy.sh                 # Auto deployment script
├── .gitignore                # Git configuration
└── LICENSE                   # MIT License
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Markup & Structure |
| CSS3 | Styling & Responsive Design |
| JavaScript ES6+ | Application Logic |
| SheetJS (XLSX) | Excel File Parsing |
| Apache2 | Web Server |
| Ubuntu 22.04 | Operating System |

---

## 📋 Excel File Format

Your Excel file should include these columns:

| Column | Type | Example |
|--------|------|---------|
| SR NO | Integer | 1 |
| UNIT TAG / TYPE | Text | AHU-4.0 TR |
| ZONE / ROOM | Text | Emergency OT |
| CAPACITY (TR) | Decimal | 4.0 |
| SUPPLY CFM | Integer | 1600 |
| DUCT W (mm) | Integer | 550 |
| DUCT H (mm) | Integer | 300 |
| CPWD LIMIT | Integer | 400 |
| REMARK | Text | AHU Main Supply |

---

## 🖥️ System Requirements

### Server Requirements
- OS: Ubuntu 22.04 LTS
- Web Server: Apache2
- Git: Latest version
- RAM: 512MB minimum
- Disk: 100MB minimum

### Browser Requirements
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

---

## 📖 Documentation

### For Users
- **[QUICKSTART.md](QUICKSTART.md)** - How to use the dashboard
- **[Sample Data](hvac-duct.html)** - Try with built-in examples

### For Deployment
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete setup instructions
- **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** - Quick reference
- **[deploy.sh](deploy.sh)** - Automated deployment script

---

## 🚀 Deployment Options

### Option 1: Automated (Recommended)
```bash
cd /tmp
wget https://raw.githubusercontent.com/apubhopal15/hvac-dashboard/main/deploy.sh
sudo bash deploy.sh
```

### Option 2: Manual
See **DEPLOYMENT_GUIDE.md** for step-by-step instructions

---

## 🧪 Testing

### Load Sample Data
1. Open dashboard
2. Click "📊 Load Sample Data"
3. Should see 8 HVAC units with calculations

### Upload Custom Excel
1. Click "📁 Upload Excel File"
2. Select your HVAC data file
3. Data auto-loads with calculations

### Export Results
1. Click "💾 Export CSV"
2. File downloads with all calculations

---

## 🔧 Configuration

### Apache Virtual Host
Location: `/etc/apache2/sites-available/hvac.conf`

Modify server name:
```apache
ServerName your-domain.com
```

---

## 🔐 Security

- ✅ All calculations performed locally (no data sent to servers)
- ✅ Excel files processed in browser only
- ✅ No server-side file storage
- ✅ CORS disabled for local-only access
- ✅ Optional HTTPS support available

---

## 📊 Sample Data Included

The dashboard includes 8 sample HVAC units for testing:

```
1. AHU-4.0 TR      - Emergency OT / Post Proc.
2. TFA-4.1 TR      - OPD Waiting / Corridor
3. TFA-5.75 TR     - Main Lobby / Reception
4. FCU-2.6 TR      - Consult Rm-1
5. FCU-3.5 TR      - Consult Rm-2
6. FCU-2.3 TR      - Consult Rm-3
7. FCU-2.5 TR      - Consult Rm-4 (Cassette)
8. FCU-2.8 TR      - Consult Rm-5 (Cassette)
```

---

## 🐛 Troubleshooting

### Dashboard Not Loading
```bash
# Check Apache status
sudo systemctl status apache2

# Restart Apache
sudo systemctl restart apache2

# Check logs
sudo tail -f /var/log/apache2/hvac-error.log
```

### Excel File Won't Upload
- Verify file is .xlsx or .xls format
- Check all required columns are present
- Ensure numeric columns contain numbers (not text)
- Try sample data first

See **DEPLOYMENT_GUIDE.md** for detailed troubleshooting

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details

---

## 👤 Author

**apubhopal15**
- GitHub: https://github.com/apubhopal15
- Repository: https://github.com/apubhopal15/hvac-dashboard

---

## 📞 Support

### Documentation
- README.md (this file)
- QUICKSTART.md - User guide
- DEPLOYMENT_GUIDE.md - Installation
- DEPLOYMENT_SUMMARY.md - Quick reference

### Issues
Report issues on GitHub: https://github.com/apubhopal15/hvac-dashboard/issues

---

## 📊 Project Info

| Property | Value |
|----------|-------|
| **Project Name** | HVAC Duct Velocity Calculator |
| **Version** | 1.0 |
| **Status** | ✅ Ready for Production |
| **Created** | 2026-06-14 |
| **License** | MIT |
| **Repository** | https://github.com/apubhopal15/hvac-dashboard |
| **Deployment** | Oracle Cloud (80.225.193.121) |

---

## 🎉 Getting Started

**Quick Deployment:**
```bash
# 1. Connect via SSH
ssh -i your-key.key ubuntu@80.225.193.121

# 2. Deploy
cd /tmp && wget https://raw.githubusercontent.com/apubhopal15/hvac-dashboard/main/deploy.sh && sudo bash deploy.sh

# 3. Access
http://80.225.193.121/hvac-dashboard/hvac-duct.html
```

**That's all! Your HVAC Dashboard is ready to use! 🚀**

---

**Last Updated:** 2026-06-14 | **Version:** 1.0 | **Status:** ✅ READY FOR DEPLOYMENT
