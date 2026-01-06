<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import {
    user,
    remoteServer,
    albyRedirectUrl,
    albyClientId,
  } from "$lib/state.svelte.js";

  let albyLoginUrl = "";

  onMount(async () => {
    albyLoginUrl = `https://getalby.com/oauth?client_id=${albyClientId}&response_type=code&redirect_uri=${albyRedirectUrl}&scope=account:read%20balance:read%20payments:send%20invoices:read`;
    await loadAlby();
  });

  async function loadAlby() {
    user.address = "";
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      try {
        const res = await fetch(
          `${remoteServer}/alby/auth?code=${code}&redirect_uri=${albyRedirectUrl}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        user.address = data.lightning_address;

        const url = new URL(window.location);
        url.searchParams.delete("code");
        goto(url.pathname + url.search, { replaceState: true });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await fetch(`${remoteServer}/alby/refresh`, {
          credentials: "include",
        });
        const data = await res.json();

        user.address = data.lightning_address;
      } catch (err) {}
    }
  }
</script>

<div class="app-container">
  <header>
    <nav>
      <div class="nav-brand">
        <a href="/">
          <span class="lightning-icon">⚡</span>
          <span class="brand-text">The Split Box</span>
        </a>
      </div>
      
      <div class="nav-user">
        {#if user.address}
          <span class="user-address">{user.address}</span>
        {:else}
          <a href={albyLoginUrl} class="login-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
            </svg>
            Login with Alby
          </a>
        {/if}
      </div>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>The Split Box • Open Source Lightning Payment Splitting</p>
  </footer>
</div>

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
    background: rgba(20, 20, 32, 0.8);
  }

  nav {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .nav-brand a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1.25rem;
    transition: opacity 0.2s;
  }

  .nav-brand a:hover {
    opacity: 0.8;
  }

  .lightning-icon {
    font-size: 1.75rem;
    filter: drop-shadow(0 0 8px rgba(247, 147, 26, 0.5));
  }

  .brand-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-address {
    padding: 0.5rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-family: 'Fira Code', monospace;
  }

  .login-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s;
    box-shadow: var(--shadow-md);
  }

  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .login-btn:active {
    transform: translateY(0);
  }

  main {
    flex: 1;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
  }

  footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    nav {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .user-address {
      font-size: 0.75rem;
      padding: 0.5rem 0.75rem;
    }

    main {
      padding: 1rem;
    }
  }
</style>
