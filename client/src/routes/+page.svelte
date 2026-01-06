<script>
  import { user } from "$lib/state.svelte.js";
</script>

<div class="hero">
  <h1>Lightning Payment Splitting for Podcasters</h1>
  <p class="hero-subtitle">
    Simplify value4value payments with automated split distribution
  </p>
</div>

<div class="cards-grid">
  <a href="/settings" class="card">
    <div class="card-icon settings">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m0-12l-4.5 2.5m9 9L12 19m4.5-7.5L12 13m-4.5 2.5L12 13m4.5-7.5L12 7m-4.5 2.5L12 7"/>
        <path d="M19.07 4.93A10 10 0 0 1 4.93 19.07m14.14 0A10 10 0 0 1 4.93 4.93"/>
      </svg>
    </div>
    <h2>Settings</h2>
    <p>Configure your Alby token, approved podcast GUIDs, and integration endpoints</p>
    {#if !user.address}
      <span class="card-badge">Login Required</span>
    {/if}
  </a>

  <a href="/autopay" class="card">
    <div class="card-icon autopay">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
      </svg>
    </div>
    <h2>Autopay Demo</h2>
    <p>Test the split payment flow with live Lightning transactions</p>
    {#if !user.address}
      <span class="card-badge">Login Required</span>
    {/if}
  </a>

  <a href="/lookup" class="card">
    <div class="card-icon lookup">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    </div>
    <h2>Transaction Lookup</h2>
    <p>Search and view payment metadata by transaction GUID</p>
  </a>

  <a href="/goals" class="card">
    <div class="card-icon goals">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    </div>
    <h2>Goals & Philosophy</h2>
    <p>Learn about the vision and challenges of podcast value payments</p>
  </a>
</div>

<div class="info-section">
  <h3>How It Works</h3>
  <div class="steps">
    <div class="step">
      <div class="step-number">1</div>
      <h4>Add to Your Feed</h4>
      <p>Include the splitbox tag in your podcast RSS feed</p>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <h4>Listener Sends Boost</h4>
      <p>Fans send value through compatible podcast apps</p>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <h4>Automatic Distribution</h4>
      <p>Payments are automatically split to all recipients</p>
    </div>
  </div>
</div>

<style>
  .hero {
    text-align: center;
    padding: 3rem 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .card {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s;
  }

  .card:hover .card-icon {
    transform: scale(1.1);
  }

  .card-icon.settings {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%);
    color: var(--secondary);
  }

  .card-icon.autopay {
    background: linear-gradient(135deg, rgba(247, 147, 26, 0.2) 0%, rgba(247, 147, 26, 0.1) 100%);
    color: var(--primary);
  }

  .card-icon.lookup {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%);
    color: var(--accent);
  }

  .card-icon.goals {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
    color: #3b82f6;
  }

  .card h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }

  .card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .card-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: var(--danger);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .info-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
    margin-top: 3rem;
  }

  .info-section h3 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-primary);
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .step {
    text-align: center;
  }

  .step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    box-shadow: var(--shadow-md);
  }

  .step h4 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .step p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .steps {
      grid-template-columns: 1fr;
    }
  }
</style>
