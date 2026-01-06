<script>
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import {
    user,
    remoteServer,
    albyRedirectUrl,
    albyClientId,
  } from "$lib/state.svelte.js";

  let albyAccessToken = "";
  let tokenSaved = false;
  let approvedGuids = [""];
  let invoiceRoute = `${remoteServer}/invoice?address=${user.address}`;
  let webhookRoute = `${remoteServer}/webhook-sync`;

  onMount(fetchSettings);
  async function fetchSettings() {
    try {
      const res = await fetch(`${remoteServer}/fetch-settings`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to fetch settings:", res.status);
        return;
      }

      const data = await res.json();
      console.log(data);

      // Handle null or undefined data
      if (data) {
        tokenSaved = data.albyAccessToken || false;
        approvedGuids = data.approvedGuids && data.approvedGuids.length > 0
          ? data.approvedGuids
          : [""];
      } else {
        tokenSaved = false;
        approvedGuids = [""];
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  }

  async function saveSettings() {
    const payload = { albyAccessToken, approvedGuids };

    let res = await fetch(remoteServer + "/save-settings", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.status === "saved") {
      tokenSaved = true;
      alert("Setting Saved");
    }
  }
</script>

{#if user.address}
  <main>
    <div class="page-header">
      <a href="/" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
      <h1>Settings</h1>
      <p class="user-address-header">{user.address}</p>
    </div>

    <div class="settings-container">
      <button class="save-settings" on:click={saveSettings}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Save Settings
      </button>
      <section class="settings-section">
        <div class="section-header">
          <h2>Alby Access Token</h2>
          {#if tokenSaved}
            <span class="status-badge saved">✓ Saved</span>
          {/if}
        </div>
        <div class="form-group">
          <label for="alby-access-token">Access Token</label>
          <input
            type="password"
            id="alby-access-token"
            bind:value={albyAccessToken}
            placeholder={tokenSaved ? "Token saved (hidden for security)" : "Enter your Alby access token"}
            class="input-field"
          />
          <p class="help-text">
            Get your token from <a href="https://getalby.com/developer/access_tokens/new" target="_blank">Alby Developer Portal</a>. 
            Required scopes: <code>invoices:read</code> and <code>payments:send</code>
          </p>
        </div>
      </section>

      <section class="settings-section">
        <div class="section-header">
          <h2>Approved Podcast GUIDs</h2>
          <button
            class="add-guid-btn"
            on:click={() => {
              approvedGuids.unshift("");
              approvedGuids = approvedGuids;
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add GUID
          </button>
        </div>
        <p class="help-text">
          Add your podcast feed GUIDs to prevent unauthorized use. Only payments from these podcasts will be processed.
        </p>
        <div class="guids-list">
          {#each approvedGuids as guid, i}
            <div class="guid-input-row">
              <input 
                type="text" 
                id={`guid-${i}`} 
                bind:value={guid}
                placeholder="Enter podcast GUID"
                class="input-field"
              />
              <button 
                class="remove-btn"
                on:click={() => {
                  approvedGuids.splice(i, 1);
                  approvedGuids = approvedGuids;
                }}
                title="Remove GUID"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          {/each}
        </div>
      </section>
    </div>

    <section class="instructions-section">
      <h2>Setup Instructions</h2>
      
      <div class="instruction-step">
        <h3>1. Add to Your Podcast Feed</h3>
        <p>Include this tag in your RSS feed. Update the server route if you're self-hosting.</p>
        <div class="code-block">
          <pre><code>{`<podcast:splitbox
  invoice="${invoiceRoute}" 
  webhook="${webhookRoute}" 
/>`}</code></pre>
        </div>
      </div>

      <div class="instruction-step">
        <h3>2. Security Recommendations</h3>
        <div class="info-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div>
            <p>
              <strong>For Alby Hub users:</strong> We recommend setting up a 
              <a href="https://guides.getalby.com/user-guide/alby-account-and-browser-extension/alby-hub/app-store/subaccounts-friends-and-family" target="_blank">
                subaccount with Lightning Address
              </a> specifically for this service.
            </p>
            <p>
              Only fund it with sats you're comfortable risking. This limits potential losses while testing the service.
            </p>
          </div>
        </div>
      </div>

      <div class="instruction-step">
        <h3>3. GUID Protection</h3>
        <div class="info-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div>
            <p>
              Adding your podcast GUIDs prevents unauthorized use of your Lightning address. 
              If someone adds your address to their feed without an approved GUID, you'll receive 
              the sats, but The Split Box won't distribute splits.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
{/if}

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

  .user-address-header {
    color: var(--text-muted);
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }

  .settings-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .save-settings {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: var(--shadow-md);
    margin-bottom: 2rem;
  }

  .save-settings:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .save-settings:active {
    transform: translateY(0);
  }

  .settings-section {
    margin-bottom: 2.5rem;
  }

  .settings-section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin: 0;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    font-weight: 600;
  }

  .status-badge.saved {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: var(--accent);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all 0.2s;
    font-family: 'Fira Code', monospace;
  }

  .input-field:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
  }

  .input-field::placeholder {
    color: var(--text-muted);
  }

  .help-text {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .help-text a {
    color: var(--primary);
    text-decoration: none;
  }

  .help-text a:hover {
    text-decoration: underline;
  }

  .help-text code {
    padding: 0.125rem 0.375rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    color: var(--primary-light);
  }

  .add-guid-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .add-guid-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .guids-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .guid-input-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .guid-input-row .input-field {
    flex: 1;
  }

  .remove-btn {
    padding: 0.75rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: var(--danger);
    color: var(--danger);
  }

  .instructions-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .instructions-section > h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .instruction-step {
    margin-bottom: 2rem;
  }

  .instruction-step:last-child {
    margin-bottom: 0;
  }

  .instruction-step h3 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .instruction-step p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .code-block {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1rem;
    overflow-x: auto;
  }

  .code-block pre {
    margin: 0;
  }

  .code-block code {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .info-box {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(139, 92, 246, 0.05);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
  }

  .info-box svg {
    flex-shrink: 0;
    color: var(--secondary);
  }

  .info-box p {
    margin-bottom: 0.5rem;
  }

  .info-box p:last-child {
    margin-bottom: 0;
  }

  .info-box a {
    color: var(--primary);
    text-decoration: none;
  }

  .info-box a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .settings-container,
    .instructions-section {
      padding: 1.5rem;
    }

    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .guid-input-row {
      flex-direction: column;
    }

    .guid-input-row .input-field {
      width: 100%;
    }
  }
</style>
