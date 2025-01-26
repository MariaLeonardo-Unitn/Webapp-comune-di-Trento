const reportList = document.querySelector('.report-list');
const sortDropdown = document.querySelector('.sort-dropdown');
const filterInput = document.querySelector('.filter-input');

// Sample report data (replace with actual data)
const reports = [
    {
        id: 1,
        date: '01/09/2024',
        reason: 'accumulo di rifiuti',
        location: 'Via Antonio Gazzoletti',
        status: 'Completata',
        image: 'report1.jpg',
    },
    // ... other reports
];

sortDropdown.addEventListener('change', (event) => {
    const sortOrder = event.target.value;
    sortReports(sortOrder);
    renderReports();
});

function sortReports(order) {
    reports.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
}

function renderReports() {
    reportList.innerHTML = '';
    reports.forEach(report => {
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        reportCard.innerHTML = `
            <img src="${report.image}" alt="Report Image">
            <p>Data: ${report.date}</p>
            <p>Motivo: ${report.reason}</p>
            <p>Luogo: ${report.location}</p>
            <p class="status">${report.status}</p>
            <button>Visualizza foto</button>
        `;

        reportList.appendChild(reportCard);
    });
}

renderReports();

filterInput.addEventListener('input', () => {
    // Implement filtering logic here
});
