# 🚀 HVAC Dashboard - Complete Deployment Guide for Oracle Cloud

## **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Step-by-Step Deployment](#step-by-step-deployment)
3. [Verification & Testing](#verification--testing)
4. [Troubleshooting](#troubleshooting)
5. [Access Your Dashboard](#access-your-dashboard)

---

## **Prerequisites**

✅ Oracle Cloud Account with running Ubuntu 22.04 instance
✅ SSH Key File: `ssh-key-2026-04-14.key`
✅ Public IP: `80.225.193.121`
✅ Terminal/Command Prompt access
✅ Git installed on server

---

## **Step-by-Step Deployment**

### **Phase 1: SSH Connection Setup**

#### **Step 1.1: Open Terminal**

**Windows Users:**
- Open PowerShell (Right-click > Run as Administrator)
- Or use Command Prompt

**Mac/Linux Users:**
- Open Terminal

#### **Step 1.2: Navigate to SSH Key Location**

```bash
cd "C:\Users\madan\Desktop\vm key_14 04 2026 22 18 PM -DESKTOP"
```

#### **Step 1.3: Connect to Oracle Cloud Server**

```bash
ssh -i ssh-key-2026-04-14.key ubuntu@80.225.193.121
```

**Expected Output:**
```
Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-1234-oracle x86_64)
ubuntu@instance-name:~$
```

✅ **If successful:** You're now connected to your Oracle Cloud server

❌ **If fails:** Check:
- SSH key file path is correct
- IP address is correct (80.225.193.121)
- Firewall allows SSH (port 22)

---

### **Phase 2: Automated Deployment**

#### **Step 2.1: Quick Deploy (Recommended)**

Once connected via SSH, run:

```bash
cd /tmp
wget https://raw.githubusercontent.com/apubhopal15/hvac-dashboard/main/deploy.sh
chmod +x deploy.sh
sudo bash deploy.sh
```

**This will:**
- ✅ Update system packages
- ✅ Install Apache2 & Git
- ✅ Clone your GitHub repository
- ✅ Configure Apache
- ✅ Enable required modules
- ✅ Restart Apache
- ✅ Display your public IP and dashboard URL

**Expected Output (after 2-3 minutes):**
```
==========================================
✅ DEPLOYMENT COMPLETE!
==========================================

🌐 ACCESS YOUR HVAC DASHBOARD:

   📊 Dashboard: http://80.225.193.121/hvac-dashboard/hvac-duct.html
   🏠 Home Page: http://80.225.193.121/hvac-dashboard/index.html

✅ Ready to use!
```

---

#### **Step 2.2: Manual Deployment (If Automated Fails)**

```bash
# Step 1: Update system
sudo apt update
sudo apt upgrade -y

# Step 2: Install Apache2 and Git
sudo apt install -y apache2 git

# Step 3: Start Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Step 4: Clone repository
cd /var/www/html
sudo git clone https://github.com/apubhopal15/hvac-dashboard.git

# Step 5: Set permissions
sudo chown -R www-data:www-data hvac-dashboard
sudo chmod -R 755 hvac-dashboard

# Step 6: Configure Apache (skip if already done)
sudo tee /etc/apache2/sites-available/hvac.conf > /dev/null <<'EOF'
<VirtualHost *:80>
    ServerName _default_
    DocumentRoot /var/www/html/hvac-dashboard
    
    <Directory /var/www/html/hvac-dashboard>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/hvac-error.log
    CustomLog ${APACHE_LOG_DIR}/hvac-access.log combined
</VirtualHost>
EOF

# Step 7: Enable site
sudo a2dissite 000-default.conf
sudo a2ensite hvac.conf

# Step 8: Enable rewrite module
sudo a2enmod rewrite

# Step 9: Test configuration
sudo apache2ctl configtest

# Step 10: Restart Apache
sudo systemctl restart apache2
```

---

### **Phase 3: Verification & Testing**

#### **Step 3.1: Verify Apache Status**

```bash
sudo systemctl status apache2
```

**Expected Output:**
```
● apache2.service - The Apache HTTP Server
   Loaded: loaded (/lib/systemd/units/apache2.service; enabled; preset: enabled)
   Active: active (running) since Sun 2026-06-14 20:15:00 UTC
```

✅ **Active (running)** = Apache is working

#### **Step 3.2: Check Files Are in Place**

```bash
ls -la /var/www/html/hvac-dashboard/
```

**Expected Output:**
```
-rw-r--r-- hvac-duct.html
-rw-r--r-- index.html
drwxr-xr-x js/
-rw-r--r-- README.md
-rw-r--r-- QUICKSTART.md
-rw-r--r-- LICENSE
```

#### **Step 3.3: Test Locally**

```bash
curl http://localhost/hvac-dashboard/hvac-duct.html | head -20
```

**Should show HTML content with "HVAC" keywords**

#### **Step 3.4: Get Your Public IP**

```bash
curl ifconfig.me
```

**Output will be:** `80.225.193.121`

---

## **Access Your Dashboard**

### **Opening in Browser**

#### **Option 1: Dashboard (Main)**
```
http://80.225.193.121/hvac-dashboard/hvac-duct.html
```

#### **Option 2: Home Page**
```
http://80.225.193.121/hvac-dashboard/index.html
```

#### **Option 3: From Your Local Machine**
Open your web browser and paste:
```
http://80.225.193.121/hvac-dashboard/hvac-duct.html
```

---

## **Testing the Dashboard**

### **Test 1: Load Sample Data**
1. Open dashboard in browser
2. Click **"📊 Load Sample Data"** button
3. You should see 8 sample HVAC units populated in the table
4. Summary cards should show: Total Units: 8, Status OK: 7, Status Revise: 1

### **Test 2: Upload Excel File**
1. Prepare an Excel file with HVAC data (matching the format in QUICKSTART.md)
2. Click **"📁 Upload Excel File"**
3. Select your file
4. Data should load automatically
5. Calculations should appear in the table

### **Test 3: Export CSV**
1. Click **"💾 Export CSV"**
2. CSV file should download
3. Open in Excel to verify data

---

## **File Locations on Server**

```
/var/www/html/hvac-dashboard/
├── index.html                 # Home page
├── hvac-duct.html            # Main dashboard
├── js/
│   └── app.js               # JavaScript logic
├── README.md                # Project docs
├── QUICKSTART.md            # Quick start guide
├── DEPLOYMENT_GUIDE.md      # This file
├── deploy.sh                # Deployment script
├── LICENSE                  # MIT License
└── .gitignore               # Git config
```

---

## **Apache Configuration**

Your Apache site configuration is located at:
```
/etc/apache2/sites-available/hvac.conf
```

To edit:
```bash
sudo nano /etc/apache2/sites-available/hvac.conf
```

After editing, restart Apache:
```bash
sudo systemctl restart apache2
```

---

## **Logs & Debugging**

### **Apache Error Log**
```bash
sudo tail -f /var/log/apache2/hvac-error.log
```

### **Apache Access Log**
```bash
sudo tail -f /var/log/apache2/hvac-access.log
```

### **Apache Status**
```bash
sudo systemctl status apache2
```

---

## **Troubleshooting**

### **Problem 1: Can't Connect via SSH**

**Solution:**
```bash
# Check SSH key permissions
ls -la "path/to/ssh-key-2026-04-14.key"
# Should show: -rw------- (600)

# If not, fix permissions:
chmod 600 "path/to/ssh-key-2026-04-14.key"

# Then try SSH again
ssh -i "path/to/ssh-key-2026-04-14.key" ubuntu@80.225.193.121
```

### **Problem 2: Apache Service Not Running**

**Solution:**
```bash
# Start Apache
sudo systemctl start apache2

# Enable on startup
sudo systemctl enable apache2

# Check status
sudo systemctl status apache2
```

### **Problem 3: Permission Denied Errors**

**Solution:**
```bash
# Fix directory permissions
sudo chown -R www-data:www-data /var/www/html/hvac-dashboard
sudo chmod -R 755 /var/www/html/hvac-dashboard
```

### **Problem 4: Dashboard Shows Blank/404 Error**

**Solution:**
```bash
# Verify files exist
ls -la /var/www/html/hvac-dashboard/hvac-duct.html

# Check Apache configuration
sudo apache2ctl configtest

# Reload Apache
sudo systemctl reload apache2
```

### **Problem 5: Excel Upload Not Working**

**Solution:**
- Check browser console (F12 > Console tab)
- Ensure Excel file is in .xlsx format
- Verify all required columns exist in Excel
- Try sample data first

### **Problem 6: Slow Performance**

**Solution:**
```bash
# Check server resources
free -h          # Check RAM
df -h            # Check disk space
top              # Check CPU usage (press 'q' to exit)
```

---

## **Update Dashboard**

To get the latest version:

```bash
cd /var/www/html/hvac-dashboard
sudo git pull origin main
sudo systemctl reload apache2
```

---

## **Security Tips**

### **Enable HTTPS (Optional)**

```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot certonly --apache -d yourdomain.com
```

### **Set Up Firewall**

```bash
# Enable UFW firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (if using SSL)
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## **Maintenance**

### **Regular Updates**

```bash
# Every month
sudo apt update
sudo apt upgrade -y

# Check Apache is still running
sudo systemctl restart apache2
```

### **Monitor Logs**

```bash
# Check for errors daily
sudo tail -100 /var/log/apache2/hvac-error.log
```

### **Backup Files**

```bash
# Create backup
sudo tar -czf /backup/hvac-dashboard-backup.tar.gz /var/www/html/hvac-dashboard/

# List backups
ls -la /backup/
```

---

## **Support & Help**

**If you encounter issues:**

1. Check the troubleshooting section above
2. Review Apache logs
3. Open a GitHub issue: https://github.com/apubhopal15/hvac-dashboard/issues
4. Include:
   - Error message
   - Steps to reproduce
   - Server OS version
   - Browser used

---

## **Quick Reference Commands**

```bash
# SSH Connection
ssh -i "path/to/key.key" ubuntu@80.225.193.121

# Quick Deploy
sudo bash deploy.sh

# Check Apache Status
sudo systemctl status apache2

# View Dashboard
http://80.225.193.121/hvac-dashboard/hvac-duct.html

# View Logs
sudo tail -f /var/log/apache2/hvac-error.log

# Restart Apache
sudo systemctl restart apache2

# Update Code
cd /var/www/html/hvac-dashboard && sudo git pull
```

---

## **Deployment Checklist**

- [ ] SSH key file located
- [ ] Terminal opened
- [ ] Connected to server via SSH
- [ ] Ran deployment script (or manual commands)
- [ ] Apache status shows "active (running)"
- [ ] Files verified in `/var/www/html/hvac-dashboard/`
- [ ] Opened dashboard in browser
- [ ] Tested with sample data
- [ ] Tested with Excel upload
- [ ] Dashboard working correctly ✅

---

## **Success! 🎉**

Your HVAC Dashboard is now live and ready to use!

**Access it at:** `http://80.225.193.121/hvac-dashboard/hvac-duct.html`

---

**Deployment Date:** 2026-06-14
**Version:** 1.0
**Last Updated:** 2026-06-14
