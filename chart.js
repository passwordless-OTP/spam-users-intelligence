// Simple Chart.js integration for merchant dashboard demo
// Assumes Chart.js is loaded via CDN

document.addEventListener('DOMContentLoaded', function () {
    // Blocked Signups Trend Chart
    var ctx = document.getElementById('blockedSignupsChart');
    if (ctx && window.Chart) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Blocked Signups',
                    data: [14, 18, 12, 23, 17, 16, 14],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79,70,229,0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Total Signups',
                    data: [120, 130, 110, 140, 135, 120, 125],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    fill: false,
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
