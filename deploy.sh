#!/bin/bash

# HVAC Dashboard - Automated Deployment Script for Oracle Cloud
# Usage: bash deploy.sh
# Date: 2026-06-14

set -e  # Exit on error

echo "=========================================="
echo "🚀 HVAC Dashboard Deployment Script"
echo "=========================================="
echo ""

# Step 1: Update System
echo "📦 Step 1: Updating system packages..."
sudo apt update && sudo apt upgrade -y
echo "✅ System updated"
echo ""

# Step 2: Install Apache & Git
echo "🔧 Step 2: Installing Apache2 and Git..."
sudo apt install -y apache2 git
sudo systemctl start apache2
sudo systemctl enable apache2
echo "✅ Apache2 and Git installed"
echo ""

# Step 3: Clone Repository
echo "📥 Step 3: Cloning HVAC Dashboard repository..."
cd /var/www/html
sudo rm -rf hvac-dashboard 2>/dev/null || true
sudo git clone https://github.com/apubhopal15/hvac-dashboard.git
sudo chown -R www-data:www-data hvac-dashboard
sudo chmod -R 755 hvac-dashboard
echo "✅ Repository cloned"
echo ""

# Step 4: Configure Apache
echo "⚙️ Step 4: Configuring Apache virtual host..."
sudo tee /etc/apache2/sites-available/hvac.conf > /dev/null <<'APACHE_CONFIG'
<VirtualHost *:80>
    ServerName _default_
    DocumentRoot /var/www/html/hvac-dashboard
    
    <Directory /var/www/html/hvac-dashboard>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    <Files "*.xlsx">
        Allow from all
    </Files>
    
    ErrorLog ${APACHE_LOG_DIR}/hvac-error.log
    CustomLog ${APACHE_LOG_DIR}/hvac-access.log combined
</VirtualHost>
APACHE_CONFIG

echo "✅ Apache configuration created"
echo ""

# Step 5: Enable Rewrite Module
echo "🔌 Step 5: Enabling Apache modules..."
sudo a2enmod rewrite 2>/dev/null || true
sudo a2enmod headers 2>/dev/null || true
echo "✅ Modules enabled"
echo ""

# Step 6: Disable Default Site
echo "🗑️ Step 6: Disabling default Apache site..."
sudo a2dissite 000-default.conf 2>/dev/null || true
sudo a2ensite hvac.conf
echo "✅ Site configuration updated"
echo ""

# Step 7: Test Apache Configuration
echo "🧪 Step 7: Testing Apache configuration..."
if sudo apache2ctl configtest; then
    echo "✅ Apache configuration is valid"
else
    echo "❌ Apache configuration error! Please check manually."
    exit 1
fi
echo ""

# Step 8: Restart Apache
echo "🔄 Step 8: Restarting Apache..."
sudo systemctl restart apache2
echo "✅ Apache restarted"
echo ""

# Step 9: Verify Deployment
echo "✔️ Step 9: Verifying deployment..."
if curl -s http://localhost/hvac-dashboard/hvac-duct.html | grep -q "HVAC"; then
    echo "✅ Dashboard is accessible locally"
else
    echo "⚠️ Dashboard might not be accessible. Please check Apache logs."
fi
echo ""

# Step 10: Get Public IP
echo "📍 Step 10: Retrieving public IP address..."
PUBLIC_IP=$(curl -s ifconfig.me)
echo "✅ Public IP: $PUBLIC_IP"
echo ""

# Final Summary
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "🌐 ACCESS YOUR HVAC DASHBOARD:"
echo ""
echo "   📊 Dashboard: http://$PUBLIC_IP/hvac-dashboard/hvac-duct.html"
echo "   🏠 Home Page: http://$PUBLIC_IP/hvac-dashboard/index.html"
echo ""
echo "📋 Files Deployed:"
echo "   ✓ hvac-duct.html    - Main Dashboard"
echo "   ✓ index.html        - Home Page"
echo "   ✓ js/app.js         - Application Logic"
echo "   ✓ README.md         - Documentation"
echo "   ✓ QUICKSTART.md     - Quick Start Guide"
echo "   ✓ LICENSE           - MIT License"
echo ""
echo "🚀 READY TO USE:"
echo "   1. Open dashboard link in browser"
echo "   2. Click 'Load Sample Data' to test"
echo "   3. Upload your Excel file"
echo "   4. View calculations"
echo "   5. Export to CSV"
echo ""
echo "📊 Server Status:"
sudo systemctl status apache2 --no-pager | grep "Active:"
echo ""
echo "=========================================="
echo "🎉 Happy HVAC Calculating!"
echo "=========================================="
