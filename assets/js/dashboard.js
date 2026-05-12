/**
 * DASHBOARD.JS - Interactive Client-Side SQL Performance Tuning Simulator
 * Simulates uploading slow query logs, testing indexes, rewriting schema, and displaying performance gains.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dashboard-app')) {
    initDashboard();
  }
});

function initDashboard() {
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const queryList = document.getElementById('query-list');
  const recommendationPanel = document.getElementById('recommendations-panel');
  const statsGains = document.getElementById('stats-gains');

  // Set default mock queries in the dashboard on load
  renderQueries(mockQueries);

  // Upload Actions
  if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--secondary)';
      uploadArea.style.background = 'rgba(0, 245, 212, 0.05)';
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = 'var(--border-color)';
      uploadArea.style.background = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--border-color)';
      uploadArea.style.background = 'transparent';
      if (e.dataTransfer.files.length > 0) {
        simulateLogUpload(e.dataTransfer.files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        simulateLogUpload(fileInput.files[0].name);
      }
    });
  }
}

// Mock Data
const mockQueries = [
  {
    id: 1,
    sql: "SELECT * FROM orders WHERE user_id = 94827 AND status = 'pending' ORDER BY created_at DESC LIMIT 50;",
    duration: "4.82s",
    durationMs: 4820,
    rowsScanned: "2,481,093",
    recommendation: "Add composite index on (user_id, status, created_at)",
    indexApplied: false,
    optimizedDuration: "0.012s",
    optimizedMs: 12,
    impact: "99.7% Speedup"
  },
  {
    id: 2,
    sql: "SELECT d.name, COUNT(e.id) FROM departments d LEFT JOIN employees e ON d.id = e.department_id GROUP BY d.name;",
    duration: "2.15s",
    durationMs: 2150,
    rowsScanned: "420,119",
    recommendation: "Convert LEFT JOIN to INNER JOIN if matching employees are guaranteed, or index department_id",
    indexApplied: false,
    optimizedDuration: "0.08s",
    optimizedMs: 80,
    impact: "96.3% Speedup"
  },
  {
    id: 3,
    sql: "SELECT * FROM logs WHERE message LIKE '%error%' AND created_at > '2026-05-01';",
    duration: "11.3s",
    durationMs: 11300,
    rowsScanned: "15,821,993",
    recommendation: "Fulltable Scan detected. Implement Elasticsearch or create full-text index on message",
    indexApplied: false,
    optimizedDuration: "0.45s",
    optimizedMs: 450,
    impact: "96.0% Speedup"
  }
];

function simulateLogUpload(fileName) {
  const uploadArea = document.getElementById('upload-area');
  const uploadText = document.getElementById('upload-text');
  
  // Show uploading state
  uploadText.innerHTML = `
    <div class="skeleton-wrapper" style="width: 100%">
      <div class="skeleton skeleton-title" style="margin: 0 auto 10px auto;"></div>
      <div class="skeleton skeleton-text" style="margin: 0 auto;"></div>
    </div>
    <p style="margin-top: 10px; color: var(--primary);">Analyzing logs inside ${fileName}...</p>
  `;

  setTimeout(() => {
    // Reset Upload Card
    uploadText.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary); margin-bottom: 10px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
      <p><strong>Upload MySQL Slow Query Log</strong> or drag and drop</p>
      <span style="font-size: 0.8rem; color: var(--text-muted)">Supports .log, .sql, .txt files up to 50MB</span>
    `;

    // Add extra queries to simulate parsing results
    const newQueries = [
      {
        id: 4,
        sql: "SELECT title, author FROM books WHERE category_id = 12 ORDER BY publish_year DESC LIMIT 10;",
        duration: "3.41s",
        durationMs: 3410,
        rowsScanned: "941,200",
        recommendation: "Index detected but outdated. Run OPTIMIZE TABLE books to rebuild indices.",
        indexApplied: false,
        optimizedDuration: "0.005s",
        optimizedMs: 5,
        impact: "99.8% Speedup"
      },
      ...mockQueries
    ];
    
    renderQueries(newQueries);
    showNotification("Success", `Successfully parsed slow query log! ${newQueries.length} slow queries identified.`);
  }, 2000);
}

function renderQueries(queries) {
  const queryList = document.getElementById('query-list');
  if (!queryList) return;

  queryList.innerHTML = '';
  
  queries.forEach(query => {
    const card = document.createElement('div');
    card.className = 'card-glass';
    card.style.textAlign = 'left';
    card.style.alignItems = 'stretch';
    card.style.marginBottom = '15px';
    card.style.padding = '20px';
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-4); margin-bottom: 12px; flex-wrap: wrap;">
        <span style="background: rgba(245, 158, 11, 0.15); color: var(--accent); padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;">
          ⚠️ Execution Time: ${query.duration}
        </span>
        <span style="color: var(--text-muted); font-size: 0.85rem;">
          Rows Scanned: <strong>${query.rowsScanned}</strong>
        </span>
      </div>
      
      <pre style="background: rgba(var(--primary-rgb), 0.03); border: 1px solid var(--border-color); padding: 12px; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; color: var(--primary); margin-bottom: 15px;"><code>${query.sql}</code></pre>
      
      <div style="background: rgba(37, 99, 235, 0.04); border-left: 4px solid var(--primary); padding: 10px 15px; border-radius: 0 8px 8px 0; font-size: 0.9rem; margin-bottom: 15px;">
        <strong>Recommendation:</strong> ${query.recommendation}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div id="optimized-stats-${query.id}" style="display: none; align-items: center; gap: var(--space-4);">
          <span style="color: var(--secondary); font-weight: 700;">✓ Optimized: ${query.optimizedDuration}</span>
          <span style="background: rgba(0, 245, 212, 0.15); color: #02b39a; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">${query.impact}</span>
        </div>
        <button id="btn-test-${query.id}" class="btn btn-secondary" style="padding: 6px 16px; font-size: 0.75rem;" onclick="testOptimization(${query.id})">
          🚀 Test Index/Fix
        </button>
      </div>
    `;
    queryList.appendChild(card);
  });
}

window.testOptimization = function(queryId) {
  const btn = document.getElementById(`btn-test-${queryId}`);
  const statsDiv = document.getElementById(`optimized-stats-${queryId}`);
  
  if (!btn) return;
  
  btn.innerHTML = `<span class="skeleton-text" style="display:inline-block; width: 60px; height: 12px; margin: 0;"></span>`;
  btn.disabled = true;

  setTimeout(() => {
    btn.style.display = 'none';
    statsDiv.style.display = 'flex';
    
    // Play sound or show notification
    showNotification("Performance Gains", "Optimization test succeeded! Latency dropped below 50ms.");
    updateTotalSavings();
  }, 1200);
}

function updateTotalSavings() {
  const querySavingsVal = document.getElementById('query-savings-val');
  const querySpeedupProgress = document.getElementById('query-speedup-progress');
  
  if (querySavingsVal) {
    let currentSavings = parseFloat(querySavingsVal.textContent);
    currentSavings = (currentSavings + 4.8).toFixed(1);
    querySavingsVal.textContent = currentSavings + 's';
    
    if (querySpeedupProgress) {
      querySpeedupProgress.style.width = '94%';
    }
  }
}

function showNotification(title, message) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.bottom = '24px';
  container.style.right = '24px';
  container.style.zIndex = '9999';
  container.style.background = 'var(--bg-card)';
  container.style.border = '1px solid var(--secondary)';
  container.style.borderLeft = '6px solid var(--secondary)';
  container.style.boxShadow = 'var(--shadow-lg)';
  container.style.padding = '16px 24px';
  container.style.borderRadius = '8px';
  container.style.maxWidth = '360px';
  container.style.animation = 'slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
  
  container.innerHTML = `
    <h4 style="font-family:'Outfit',sans-serif; margin-bottom: 4px; display:flex; align-items:center; gap:8px; color: var(--primary);">
      ⚡ ${title}
    </h4>
    <p style="font-size: 0.85rem; color: var(--text-muted);">${message}</p>
  `;
  
  document.body.appendChild(container);
  
  setTimeout(() => {
    container.style.animation = 'fadeOutDown 0.3s ease-out forwards';
    setTimeout(() => {
      container.remove();
    }, 300);
  }, 4000);
}

// Custom Animations inserted dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slideInUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeOutDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);
