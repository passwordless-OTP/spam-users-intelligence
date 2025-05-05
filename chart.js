// Enhanced Chart.js integration for merchant dashboard demo
// Assumes Chart.js is loaded via CDN

document.addEventListener('DOMContentLoaded', function () {
    // Sample data for the week
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const blockedSignups = [14, 18, 12, 23, 17, 16, 14];
    const totalSignups = [120, 130, 110, 140, 135, 120, 125];
    const blockRate = blockedSignups.map((blocked, i) => ((blocked / totalSignups[i]) * 100).toFixed(1));
    
    // Date formatting helper
    const formatDate = (dayIndex) => {
        const today = new Date();
        const day = new Date(today);
        day.setDate(today.getDate() - (6 - dayIndex));
        return day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    // Blocked Signups Trend Chart
    var ctx = document.getElementById('blockedSignupsChart');
    if (ctx && window.Chart) {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weekDays,
                datasets: [{
                    label: 'Blocked Signups',
                    data: blockedSignups,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79,70,229,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4f46e5',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#4f46e5',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 2,
                    order: 1
                }, {
                    label: 'Total Signups',
                    data: totalSignups,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    fill: false,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#10b981',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 2,
                    order: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        usePointStyle: true,
                        callbacks: {
                            title: function(tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                return formatDate(index) + ' (' + weekDays[index] + ')';
                            },
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y;
                                }
                                return label;
                            },
                            afterBody: function(tooltipItems) {
                                const index = tooltipItems[0].dataIndex;
                                return 'Block Rate: ' + blockRate[index] + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#666'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: '#666',
                            callback: function(value) {
                                return value;
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear'
                    }
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
        
        // Add chart filter functionality (time period selector)
        const timeFilters = document.querySelectorAll('.chart-time-filter');
        if (timeFilters.length > 0) {
            timeFilters.forEach(filter => {
                filter.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all filters
                    timeFilters.forEach(f => f.classList.remove('active'));
                    
                    // Add active class to clicked filter
                    this.classList.add('active');
                    
                    // Get the time period
                    const period = this.getAttribute('data-period');
                    
                    // Sample data for different time periods (in a real app, this would come from an API)
                    let newLabels, newBlockedData, newTotalData;
                    
                    switch(period) {
                        case 'day':
                            newLabels = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
                            newBlockedData = [3, 5, 2, 7, 4, 6, 3, 5, 4];
                            newTotalData = [25, 30, 20, 35, 28, 32, 26, 30, 28];
                            break;
                        case 'month':
                            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                            newBlockedData = [62, 78, 85, 71];
                            newTotalData = [520, 580, 610, 540];
                            break;
                        case 'year':
                            newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            newBlockedData = [210, 230, 245, 260, 280, 310, 290, 320, 300, 330, 350, 370];
                            newTotalData = [1800, 1850, 1900, 2000, 2100, 2300, 2200, 2400, 2350, 2500, 2600, 2700];
                            break;
                        default: // week
                            newLabels = weekDays;
                            newBlockedData = blockedSignups;
                            newTotalData = totalSignups;
                    }
                    
                    // Update chart data
                    chart.data.labels = newLabels;
                    chart.data.datasets[0].data = newBlockedData;
                    chart.data.datasets[1].data = newTotalData;
                    chart.update();
                });
            });
        }
    }
});

