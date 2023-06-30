const fs = require('fs');
const printer = require('./printer');

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();

  if (isSameDay(date, today)) {
    return `today at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  } else {
    return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

const outputCoverageReportToHTML = (report, reportPath) => {
  const packageJson = fs.readFileSync('package.json', 'utf8');
  const { name: packageName } = JSON.parse(packageJson);

  const currentDate = formatDate(new Date().toLocaleString());

  const [header, ...rows] = report; // Destructure the header and rows

  const modules = [];
  const coveredCounts = [];
  const uncoveredCounts = [];

  rows.forEach(([module, _, coveredText]) => {
    const moduleIndex = modules.indexOf(module);
    if (moduleIndex === -1) {
      modules.push(module);
      coveredCounts.push(coveredText === 'Yes' ? 1 : 0);
      uncoveredCounts.push(coveredText === 'Yes' ? 0 : 1);
    } else {
      if (coveredText === 'Yes') {
        coveredCounts[moduleIndex]++;
      } else {
        uncoveredCounts[moduleIndex]++;
      }
    }
  });

  let previousModule = '';

  const html = `
    <html>
      <head>
        <title>${packageName} - Feature Coverage Report</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

        <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      background-color: #f7f7f7;
      color: #333333;
      position: relative; /* Add this line */

    }

    h1 {
      color: #007acc;
      margin-bottom: 20px;
      display: inline-block; /* Add this line */

    }

    h2 {
      margin-top: 30px;
      color: #007acc;
    }

    #chart-container {
      margin-bottom: 20px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 20px;
    }

    th,
    td {
      border: 1px solid #c7c7c7;
      padding: 8px;
      text-align: left;
      color: #333333;
    }

    th {
      background-color: #eaeaea;
      color: #333333;
    }

    .covered {
      background-color: #c8e6c9;
    }

    .uncovered {
      background-color: #ffcdd2;
    }

    footer {
      margin-top: 50px;
      padding: 10px;
      background-color: #f2f2f2;
      text-align: center;
      color: #555555;
    }

    .footer_copyright {
      color: var(--dark);
    }

    /* Dark theme styles */
    .dark-theme {
      background-color: #1e1e1e;
      color: #d4d4d4;
    }

    .dark-theme h1 {
      color: #61afef;
    }

    .dark-theme h2 {
      color: #61afef;
    }

    .dark-theme th {
      background-color: #282828;
      color: #d4d4d4;
    }

    .dark-theme td {
      color: #abb2bf;
    }

    .dark-theme .covered {
      background-color: #1e1e1e;
      color: #98c379;
    }

    .dark-theme .uncovered {
      background-color: #1e1e1e;
      color: #e06c75;
    }

    .dark-theme footer {
      background-color: #333333;
      color: #aaaaaa;
    }

    .theme-button {
      background-color: #aaa;
      color: #333;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .dark-theme .theme-button {
      background-color: #ccc;
      color: #111;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
    }
  </style>
      </head>
      <body class="dark-theme">
      
        <h1>${packageName}</h1>
        <h2>Feature Coverage Report</h2>

        <button class="theme-button" onclick="toggleTheme()"><i id="theme-button-icon" class="fas fa-star"></i></button>

        <div id="chart-container">
          <canvas id="chart"></canvas>
        </div>
        <table>
          <tr>
            <th>Module</th>
            <th>Feature</th>
            <th>Covered</th>
          </tr>
          ${rows
      .map(row => {
        const [module, feature, coveredText] = row;
        const moduleCell = module === previousModule ? '<td></td>' : `<td>${module}</td>`;
        const coveredCellClass = coveredText === 'Yes' ? 'covered' : 'uncovered';
        const coveredCell = `<td class="${coveredCellClass}">${coveredText}</td>`;
        previousModule = module;
        return `
                <tr>
                  ${moduleCell}
                  <td>${feature}</td>
                  ${coveredCell}
                </tr>
              `;
      })
      .join('')}
        </table>

        <footer style="text-align: center; margin-top: 20px;">
          Report created ${currentDate}<br>
        </footer>

    
        <script>
          const modules = ${JSON.stringify(modules)};
          const coveredCounts = ${JSON.stringify(coveredCounts)};
          const uncoveredCounts = ${JSON.stringify(uncoveredCounts)};

          const ctx = document.getElementById('chart').getContext('2d');
          new Chart(ctx, {
        type: 'bar',
        data: {
          labels: modules,
          datasets: [
            {
              label: 'Covered',
              data: coveredCounts,
              backgroundColor: '#98c379'
            },
            {
              label: 'Uncovered',
              data: uncoveredCounts,
              backgroundColor: '#e06c75'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              stacked: true,
              title: {
                display: true,
                text: 'Modules'
              }
            },
            y: {
              beginAtZero: true,
              stacked: true,
              title: {
                display: true,
                text: 'Count'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });

  // Function to toggle the theme
    function toggleTheme() {
      const body = document.body;
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';

      const lightIcon = 'fa-star';
      const darkIcon = 'fa-moon';

      if (currentTheme === 'dark') {
        body.classList.remove('dark-theme');
        document.getElementById('theme-button-icon').classList.remove(lightIcon);
        document.getElementById('theme-button-icon').classList.add(darkIcon);
      } else {
        body.classList.add('dark-theme');
        document.getElementById('theme-button-icon').classList.remove(darkIcon);
        document.getElementById('theme-button-icon').classList.add(lightIcon);

      }
    }

    </script>

  </body>
</html>
`;

  const path = require('path');

  const fullPath = reportPath + '/feature-coverage-report.html';
  const directoryPath = path.dirname(fullPath);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  fs.writeFileSync(fullPath, html);

  printer.log(`Coverage report written to ${fullPath}`);
};

module.exports = {
  outputCoverageReportToHTML
};

// Example usage const report = [ ['Module A', 'Feature 1', 'Yes'], ['Module A', 'Feature 2', 'No'], ['Module B', 'Feature 3', 'Yes'], ['Module B', 'Feature 4', 'Yes'], ['Module B', 'Feature 5', 'No'], ];

//outputCoverageReportToHTML(report, 'coverage-report.html');
