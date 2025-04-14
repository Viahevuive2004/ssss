document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu cho biểu đồ cột - Thống kê hoạt động
    const barChartData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        datasets: [
            {
                label: 'Bệnh nhân mới',
                backgroundColor: 'rgba(78, 115, 223, 0.7)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 1,
                data: [45, 80, 65, 59, 90, 120],
            },
            {
                label: 'Lịch khám',
                backgroundColor: 'rgba(231, 74, 59, 0.7)',
                borderColor: 'rgba(231, 74, 59, 1)',
                borderWidth: 1,
                data: [65, 60, 85, 95, 70, 110],
            },
        ],
    };

    // Dữ liệu cho biểu đồ đường - Doanh thu cả khoa
    const revenueChartData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            label: 'Doanh thu (triệu VND)',
            backgroundColor: 'rgba(54, 185, 204, 0.1)',
            borderColor: 'rgba(54, 185, 204, 1)',
            pointBackgroundColor: 'rgba(54, 185, 204, 1)',
            pointBorderColor: 'rgba(54, 185, 204, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 185, 204, 1)',
            data: [85, 100, 105, 120, 90, 95, 110, 130, 145, 165, 180, 195],
            fill: true,
            tension: 0.4
        }],
    };

    // Cấu hình chung cho các biểu đồ
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    font: {
                        size: 11
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: 10,
                titleColor: '#fff',
                bodyColor: '#fff',
                titleFont: {
                    size: 12,
                },
                bodyFont: {
                    size: 11
                },
                displayColors: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    };

    // Cấu hình cho biểu đồ cột
    const barChartConfig = {
        type: 'bar',
        data: barChartData,
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: {
                    ...commonOptions.plugins.legend
                }
            },
        }
    };

    // Cấu hình cho biểu đồ doanh thu
    const revenueChartConfig = {
        type: 'line',
        data: revenueChartData,
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: {
                    display: false
                },
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            let value = context.parsed.y;
                            return `${value} triệu VND`;
                        }
                    }
                }
            },
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    ticks: {
                        ...commonOptions.scales.y.ticks,
                        callback: function(value) {
                            return value + ' tr';
                        }
                    }
                }
            }
        }
    };

    // Khởi tạo biểu đồ
    if (document.getElementById('barChart')) {
        new Chart(document.getElementById('barChart').getContext('2d'), barChartConfig);
    }

    if (document.getElementById('revenueChart')) {
        new Chart(document.getElementById('revenueChart').getContext('2d'), revenueChartConfig);
    }

    // Xử lý sự kiện resize cửa sổ để cập nhật lại kích thước biểu đồ
    function resizeAllCharts() {
        if (window.Chart && Chart.instances) {
            Chart.instances.forEach(instance => {
                instance.resize();
            });
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeAllCharts, 250);
    });
});