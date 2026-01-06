<script>
  import { remoteServer } from "$lib/state.svelte.js";
  let id = "9325d046-c0fd-4988-9704-86ed62b68390";
  let jsonData = null;
  let error = null;
  let loading = false;

  const fetchData = async () => {
    if (!id.trim()) return;
    
    error = null;
    jsonData = null;
    loading = true;
    
    try {
      const res = await fetch(`${remoteServer}/metadata/${id}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      jsonData = await res.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };
</script>

<main>
  <div class="page-header">
    <a href="/" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back
    </a>
    <h1>Transaction Lookup</h1>
    <p class="page-description">Search for payment metadata by transaction GUID</p>
  </div>

  <div class="lookup-container">
    <div class="search-card">
      <div class="search-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <h2>Search Metadata</h2>
      </div>
      
      <div class="search-input-group">
        <input 
          type="text" 
          bind:value={id} 
          placeholder="Enter transaction GUID"
          on:keypress={handleKeyPress}
          class="search-input"
        />
        <button 
          on:click={fetchData} 
          class="search-btn"
          disabled={loading || !id.trim()}
        >
          {#if loading}
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Searching...
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Search
          {/if}
        </button>
      </div>

      <p class="hint">Press Enter to search</p>
    </div>

    {#if error}
      <div class="result-card error">
        <div class="result-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>Error</h3>
        </div>
        <p>{error}</p>
      </div>
    {:else if jsonData}
      <div class="result-card success">
        <div class="result-header">
          <div class="header-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <h3>Metadata Found</h3>
          </div>
          <span class="guid-badge">{id}</span>
        </div>
        
        <div class="json-viewer">
          <div class="json-header">
            <span>JSON Response</span>
            <button 
              class="copy-btn"
              on:click={() => {
                navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
              }}
              title="Copy to clipboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy
            </button>
          </div>
          <pre><code>{JSON.stringify(jsonData, null, 2)}</code></pre>
        </div>
      </div>
    {:else if !loading}
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <h3>No Results Yet</h3>
        <p>Enter a transaction GUID above and click search to view the payment metadata</p>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 900px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    text-decoration: none;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--primary);
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .page-description {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .lookup-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .search-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .search-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
  }

  .search-header h2 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--text-primary);
  }

  .search-input-group {
    display: flex;
    gap: 0.75rem;
  }

  .search-input {
    flex: 1;
    padding: 0.875rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    font-family: 'Fira Code', monospace;
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
  }

  .search-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .search-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .search-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .hint {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    text-align: center;
  }

  .result-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .result-card.error {
    border-color: rgba(239, 68, 68, 0.3);
    background: rgba(239, 68, 68, 0.05);
  }

  .result-card.success {
    border-color: rgba(16, 185, 129, 0.3);
    background: var(--bg-secondary);
  }

  .result-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .result-card.error .result-header {
    color: var(--danger);
  }

  .result-card.success .result-header svg {
    color: var(--accent);
  }

  .result-header h3 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--text-primary);
  }

  .guid-badge {
    padding: 0.375rem 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-family: 'Fira Code', monospace;
    color: var(--text-muted);
  }

  .result-card.error p {
    color: var(--danger);
    margin: 0;
  }

  .json-viewer {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .json-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-color);
  }

  .json-header span {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .json-viewer pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
  }

  .json-viewer code {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
  }

  .empty-state svg {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .empty-state h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .empty-state p {
    color: var(--text-secondary);
    max-width: 400px;
  }

  @media (max-width: 768px) {
    .search-input-group {
      flex-direction: column;
    }

    .search-btn {
      justify-content: center;
    }

    .result-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .guid-badge {
      width: 100%;
      text-align: center;
    }
  }
</style>
