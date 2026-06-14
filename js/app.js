// HVAC Duct Velocity Calculator - Main Application Logic

let hvacData = [];

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.getElementById('alert');
    alertDiv.textContent = message;
    alertDiv.className = `alert show alert-${type}`;
    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 5000);
}

// Load sample data
function loadSampleData() {
    hvacData = [
        { srNo: 1, unitTag: 'AHU-4.0 TR', zone: 'Emergency OT / Post Proc.', capacity: 4, cfm: 1600, ductW: 550, ductH: 300, limit: 400, remark: 'AHU Main Supply' },
        { srNo: 2, unitTag: 'TFA-4.1 TR', zone: 'OPD Waiting / Corridor', capacity: 4.1, cfm: 1650, ductW: 500, ductH: 350, limit: 400, remark: 'TFA Main Supply' },
        { srNo: 3, unitTag: 'TFA-5.75 TR', zone: 'Main Lobby / Reception', capacity: 5.75, cfm: 2300, ductW: 550, ductH: 400, limit: 400, remark: 'TFA Main Supply' },
        { srNo: 4, unitTag: 'FCU-2.6 TR', zone: 'Consult Rm-1', capacity: 2.6, cfm: 933, ductW: 450, ductH: 250, limit: 250, remark: 'FCU Branch Supply' },
        { srNo: 5, unitTag: 'FCU-3.5 TR', zone: 'Consult Rm-2', capacity: 3.5, cfm: 1178, ductW: 500, ductH: 250, limit: 250, remark: 'FCU Branch Supply' },
        { srNo: 6, unitTag: 'FCU-2.3 TR', zone: 'Consult Rm-3', capacity: 2.3, cfm: 773, ductW: 450, ductH: 200, limit: 250, remark: 'FCU Branch Supply' },
        { srNo: 7, unitTag: 'FCU-2.5 TR', zone: 'Consult Rm-4', capacity: 2.5, cfm: 852, ductW: 1250, ductH: 100, limit: 250, remark: 'FCU Branch Supply (Cassette)' },
        { srNo: 8, unitTag: 'FCU-2.8 TR', zone: 'Consult Rm-5', capacity: 2.8, cfm: 967, ductW: 1250, ductH: 100, limit: 250, remark: 'FCU Branch Supply (Cassette)' },
    ];
    
    calculateAndDisplay();
    showAlert('✅ Sample data loaded successfully!', 'success');
}

// Calculate HVAC values
function calculateRow(row) {
    const ductArea = (row.ductW / 1000) * (row.ductH / 1000); // m²
    const flowM3s = row.cfm * 0.000472; // m³/s
    const flowM3h = flowM3s * 3600; // m³/h
    const velocityMs = flowM3s / ductArea; // m/s
    const velocityMmin = velocityMs * 60; // m/min
    const velocityFpm = velocityMmin * 3.281; // fpm

    const status = velocityMmin <= row.limit ? 'OK' : 'REVISE';

    return {
        ...row,
        ductArea: ductArea.toFixed(3),
        flowM3s: flowM3s.toFixed(3),
        flowM3h: flowM3h.toFixed(2),
        velocityMs: velocityMs.toFixed(2),
        velocityMmin: velocityMmin.toFixed(2),
        velocityFpm: velocityFpm.toFixed(2),
        status: status
    };
}

// Display table
function displayTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (hvacData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="16" style="text-align: center; color: #999;">No data loaded. Upload an Excel file or click "Load Sample Data"</td></tr>';
        return;
    }

    hvacData.forEach(row => {
        const calculatedRow = calculateRow(row);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${calculatedRow.srNo}</td>
            <td><strong>${calculatedRow.unitTag}</strong></td>
            <td>${calculatedRow.zone}</td>
            <td>${calculatedRow.capacity}</td>
            <td>${calculatedRow.cfm}</td>
            <td>${calculatedRow.ductW}</td>
            <td>${calculatedRow.ductH}</td>
            <td>${calculatedRow.ductArea}</td>
            <td>${calculatedRow.flowM3s}</td>
            <td>${calculatedRow.flowM3h}</td>
            <td>${calculatedRow.velocityMs}</td>
            <td>${calculatedRow.velocityMmin}</td>
            <td>${calculatedRow.velocityFpm}</td>
            <td>${calculatedRow.limit} m/min</td>
            <td><span class="status-badge status-${calculatedRow.status.toLowerCase()}">${calculatedRow.status}</span></td>
            <td>${calculatedRow.remark}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Update summary cards
function updateSummary() {
    if (hvacData.length === 0) {
        document.getElementById('totalUnits').textContent = '0';
        document.getElementById('statusOk').textContent = '0';
        document.getElementById('statusRevise').textContent = '0';
        document.getElementById('avgVelocity').textContent = '0.00';
        return;
    }

    const calculatedData = hvacData.map(calculateRow);
    const totalOk = calculatedData.filter(row => row.status === 'OK').length;
    const totalRevise = calculatedData.filter(row => row.status === 'REVISE').length;
    const avgVel = (calculatedData.reduce((sum, row) => sum + parseFloat(row.velocityMs), 0) / calculatedData.length).toFixed(2);

    document.getElementById('totalUnits').textContent = hvacData.length;
    document.getElementById('statusOk').textContent = totalOk;
    document.getElementById('statusRevise').textContent = totalRevise;
    document.getElementById('avgVelocity').textContent = avgVel;
}

// Calculate and display everything
function calculateAndDisplay() {
    displayTable();
    updateSummary();
}

// Export to CSV
function exportToCSV() {
    if (hvacData.length === 0) {
        showAlert('❌ No data to export. Load data first!', 'error');
        return;
    }

    let csv = 'SR NO,UNIT TAG,ZONE / ROOM,CAPACITY (TR),SUPPLY CFM,DUCT W (mm),DUCT H (mm),DUCT AREA (m²),FLOW (m³/s),FLOW (m³/h),VEL. (m/s),VEL. (m/min),VEL. (fpm),CPWD LIMIT,CPWD STATUS,REMARK\n';

    hvacData.forEach(row => {
        const calculatedRow = calculateRow(row);
        csv += `${calculatedRow.srNo},${calculatedRow.unitTag},"${calculatedRow.zone}",${calculatedRow.capacity},${calculatedRow.cfm},${calculatedRow.ductW},${calculatedRow.ductH},${calculatedRow.ductArea},${calculatedRow.flowM3s},${calculatedRow.flowM3h},${calculatedRow.velocityMs},${calculatedRow.velocityMmin},${calculatedRow.velocityFpm},"${calculatedRow.limit} m/min",${calculatedRow.status},"${calculatedRow.remark}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HVAC_Calculations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showAlert('✅ CSV exported successfully!', 'success');
}

// File upload handler
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            hvacData = jsonData.map((row, index) => ({
                srNo: row['SR NO'] || index + 1,
                unitTag: row['UNIT TAG / TYPE'] || row['UNIT TAG'] || '',
                zone: row['ZONE / ROOM'] || row['ZONE'] || '',
                capacity: parseFloat(row['CAPACITY (TR)'] || row['CAPACITY'] || 0),
                cfm: parseFloat(row['SUPPLY CFM'] || row['CFM'] || 0),
                ductW: parseFloat(row['DUCT W (mm)'] || row['DUCT W'] || 0),
                ductH: parseFloat(row['DUCT H (mm)'] || row['DUCT H'] || 0),
                limit: parseFloat(row['CPWD LIMIT'] || 250),
                remark: row['REMARK'] || ''
            }));

            calculateAndDisplay();
            showAlert(`✅ Excel file loaded successfully! ${hvacData.length} records found.`, 'success');
        } catch (error) {
            showAlert(`❌ Error reading file: ${error.message}`, 'error');
            console.error(error);
        }
    };
    reader.readAsArrayBuffer(file);
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    showAlert('📊 HVAC Dashboard Ready! Upload an Excel file or load sample data.', 'info');
});
