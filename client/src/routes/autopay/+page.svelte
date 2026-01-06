<script>
  import { onMount } from "svelte";
  import tlv from "./tlv.js";

  import {
    user,
    remoteServer,
    albyRedirectUrl,
    albyClientId,
  } from "$lib/state.svelte.js";

  let recipient = { lnaddress: "thesplitbox@getalby.com", amount: 100 };
  let invoiceRoute = `${remoteServer}/invoice?address=${recipient.lnaddress}`;
  let webhookRoute = `${remoteServer}/webhook-sync`;
  let invoice = "";
  let payload = {
    type: "bitcoin-lightning",
    metadata: tlv,
  };
  let status = [];
  let id = "";
  let jsonData = null;
  let error = null;

  async function getInvoice(payload) {
    id = "";
    status = [`Press F12 to view updates in console`];
    status = status;
    try {
      payload.metadata.value_msat_total = recipient.amount * 1000;
      payload = payload;

      status.push(`Fetching invoice from ${invoiceRoute}`);
      status = status;

      let res = await fetch(invoiceRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const invoice = await res.json();
      console.log(invoice);
      status.push(`Paying Invoice`);
      status = status;
      let payment = await sendSats(invoice);
      console.log(payment);
      status.push(`Invoice paid.`);
      status = status;
      handlePaid(payment.info);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendSats(invoice) {
    try {
      const res = await fetch(`${remoteServer}/alby/pay-invoice`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePaid(paymentInfo) {
    console.log(paymentInfo);

    status.push(
      `Sending payment info to ${webhookRoute} and sending out splits`
    );
    status = status;
    let res = await fetch(webhookRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    });

    let data = await res.json();
    console.log(data);
    id = data.id;
    status.push(`Splits sent. View split status in console`);
    status.push(
      `Click this to see the stored metadata at ${remoteServer}/metadata/${id}`
    );
    status = status;
  }

  function updatePayload(e) {
    payload.metadata.value_msat_total = e.target.value * 1000;
    payload = payload;
  }

  const fetchData = async () => {
    error = null;
    jsonData = null;
    try {
      const res = await fetch(`${remoteServer}/metadata/${id}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      jsonData = await res.json();
    } catch (err) {
      error = err.message;
    }
  };
</script>

<main>
  {#if user.address}
    <div class="page-header">
      <a href="/" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
      <h1>Autopay Demo</h1>
      <p class="user-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Paying from: <span>{user.address}</span>
      </p>
    </div>

    <div class="demo-container">
      <div class="payment-card">
        <h2>Send a Test Boost</h2>
        <p class="card-description">Test the complete payment flow with split distribution</p>
        
        <div class="form-group">
          <label for="boost-amount">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
            </svg>
            Amount (sats)
          </label>
          <input
            id="boost-amount"
            type="number"
            bind:value={recipient.amount}
            placeholder="Enter amount in satoshis"
            on:input={updatePayload}
            class="input-field"
            required
          />
        </div>

        <button 
          type="button" 
          on:click={getInvoice.bind(this, payload)}
          class="autopay-btn"
          disabled={!recipient.amount || recipient.amount <= 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
          </svg>
          Send Boost
        </button>
      </div>

      {#if status.length > 0}
        <div class="status-card">
          <h3>Payment Status</h3>
          <div class="status-steps">
            {#each status as note, i}
              <div class="status-step">
                <div class="step-indicator">{i + 1}</div>
                <p>{note}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if id}
        <div class="metadata-card">
          <div class="metadata-header">
            <h3>Payment Metadata</h3>
            <button on:click={fetchData} class="fetch-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
              Refresh Data
            </button>
          </div>
          
          {#if error}
            <div class="error-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>Error: {error}</p>
            </div>
          {:else if jsonData}
            <div class="json-display">
              <pre><code>{JSON.stringify(jsonData, null, 2)}</code></pre>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <div class="documentation">
      <h2>Technical Details</h2>
      
      <div class="doc-section">
        <h3>Feed Configuration</h3>
        <p>Add this tag to your podcast RSS feed:</p>
        <div class="code-block">
          <pre><code>{`<podcast:splitbox
  invoice="${invoiceRoute}" 
  webhook="${webhookRoute}" 
/>`}</code></pre>
        </div>
      </div>

      <div class="doc-section">
        <h3>Payment Flow</h3>
        <ol class="flow-list">
          <li>Listener sends a boost through their podcast app</li>
          <li>App fetches <code>invoice</code> from the specified URL</li>
          <li>App pays the <code>invoice</code> on behalf of the user</li>
          <li>Payment details are forwarded to the <code>webhook</code> URL</li>
          <li>Webhook returns a lookup GUID for async status checks</li>
        </ol>
      </div>

      <div class="doc-section">
        <h3>Simulated Payload</h3>
        <div class="code-block">
          <pre><code>{JSON.stringify(payload, null, 2)}</code></pre>
        </div>
      </div>
    </div>
  {/if}
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
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .user-info span {
    font-family: 'Fira Code', monospace;
    color: var(--text-primary);
  }

  .demo-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .payment-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .payment-card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .card-description {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .input-field {
    width: 100%;
    padding: 0.875rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    transition: all 0.2s;
  }

  .input-field:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.1);
  }

  .autopay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: var(--shadow-md);
  }

  .autopay-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .autopay-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .autopay-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .status-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .status-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .status-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .status-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .step-indicator {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.875rem;
  }

  .status-step p {
    color: var(--text-secondary);
    line-height: 32px;
    margin: 0;
  }

  .metadata-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .metadata-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .metadata-header h3 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--text-primary);
  }

  .fetch-btn {
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

  .fetch-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .error-box {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: var(--radius-md);
    color: var(--danger);
  }

  .error-box svg {
    flex-shrink: 0;
  }

  .json-display {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1rem;
    overflow-x: auto;
  }

  .json-display pre {
    margin: 0;
  }

  .json-display code {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .documentation {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .documentation h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .doc-section {
    margin-bottom: 2rem;
  }

  .doc-section:last-child {
    margin-bottom: 0;
  }

  .doc-section h3 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .doc-section p {
    color: var(--text-secondary);
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

  .flow-list {
    padding-left: 1.5rem;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .flow-list li {
    margin-bottom: 0.5rem;
  }

  .flow-list code {
    padding: 0.125rem 0.375rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    color: var(--primary-light);
  }

  @media (max-width: 768px) {
    .payment-card,
    .status-card,
    .metadata-card,
    .documentation {
      padding: 1.5rem;
    }

    .metadata-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
</style>
