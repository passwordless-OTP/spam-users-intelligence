// Additional chart visualizations for merchant dashboard
// Assumes Chart.js is loaded via CDN

document.addEventListener('DOMContentLoaded', function () {
    // Signup Sources Doughnut Chart
    var signupSourcesCtx = document.getElementById('signupSourcesChart');
    if (signupSourcesCtx && window.Chart) {
        new Chart(signupSourcesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social Media', 'Email Campaign', 'Referral', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        '#4f46e5', // Primary
                        '#10b981', // Success
                        '#f59e0b', // Warning
                        '#6366f1', // Info
                        '#9ca3af'  // Gray
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
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
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // Fraud Types Bar Chart
    var fraudTypesCtx = document.getElementById('fraudTypesChart');
    if (fraudTypesCtx && window.Chart) {
        new Chart(fraudTypesCtx, {
            type: 'bar',
            data: {
                labels: ['Disposable Email', 'Catch-all Domain', 'Suspicious IP', 'Known Fraud', 'Bot Activity'],
                datasets: [{
                    label: 'Blocked Attempts',
                    data: [42, 28, 18, 15, 11],
                    backgroundColor: 'rgba(79, 70, 229, 0.8)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    barThickness: 'flex',
                    maxBarThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw || 0;
                                return `Blocked Attempts: ${value}`;
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
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#666',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }

    // Geographical Distribution Map Chart (Simplified as a bar chart)
    var geoDistributionCtx = document.getElementById('geoDistributionChart');
    if (geoDistributionCtx && window.Chart) {
        new Chart(geoDistributionCtx, {
            type: 'bar',
            data: {
                labels: ['United States', 'Russia', 'China', 'Nigeria', 'Brazil', 'India', 'Other'],
                datasets: [{
                    label: 'Suspicious Signups',
                    data: [15, 28, 22, 19, 12, 10, 8],
                    backgroundColor: [
                        'rgba(79, 70, 229, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(156, 163, 175, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 4,
                    barThickness: 'flex',
                    maxBarThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#ddd',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
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
                            color: '#666'
                        }
                    }
                }
            }
        });
    }
});
