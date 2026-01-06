<main>
  <div class="page-header">
    <a href="/" class="back-link">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back
    </a>
    <h1>Goals & Philosophy</h1>
    <p class="page-description">Understanding the challenges and vision behind The Split Box</p>
  </div>

  <div class="quotes">
    <blockquote>
      <p>"There are no solutions. There are only trade-offs."</p>
      <cite>— Thomas Sowell</cite>
    </blockquote>

    <blockquote>
      <p>"You can't always get what you want."</p>
      <cite>— The Rolling Stones</cite>
    </blockquote>
  </div>

  <section class="content-section">
  <p>
    Sending splits in a Podcasting 2.0 app is hard. It's by far the most
    complicated part of my code. And there's a lot of bakers making this cake.
    The podcaster has to add their splits to the feed, but not all hosting
    companies support the value block. The Podcast Index decided to put in value
    blocks using Podcaster Wallet to help with adoption, but that made wallets
    more difficult for the app. Now the feed is no longer the source of truth,
    and I have to fetch from two different source to get all of the info a
    podcaster wants me to have. Additionally, the Index isn't always as up to
    date as the feed. While testing recently, I spent two hours trying to figure
    out why the value block in my app wasn't correct only to realize the Index
    was sending an old value block, which is why my updated blocks weren't
    showing up in my functions. I'm not pointing fingers, I'm pointing out the
    facts we have to deal with.
  </p>

  <p>
    To further complicate things, we have wallet builders that have different
    goals than podcasters, but the podcasters are reliant on the wallet
    builders. So what happens when the wallet builders decide not to support the
    method of payment we've been using for the last four years. We have four
    years worth of feeds and Podcaster Wallets using one method, and the more
    popular wallets have decided they won't be supporting that method. So, the
    app now needs to support two different methods of payments to handle the
    legacy value payment method and the new value payment method. Additionally,
    one of those methods allows the app to send metadata to the podcaster, the
    other method, not so much.
  </p>

  <p>
    Another problem with multiple wallets is not every wallet makes it easy for
    a listener to seamlessly send payments. That requires an API the apps are
    allowed to access. But is an app developer now required to support every
    wallet API out there, or just the four major ones? This starts to feel more
    and more like Google, Apple, Facebook, and Twitter getting their mitts into
    every app there is. An widespread solution is to show a QR code and the
    listener can copy/paste or scan it from their wallet of choice, but this is
    hardly seamless. Copying a code from your podcast app, opening your wallet,
    pasting the code in, pushing send... yeah, it works, but it's a hassle.
  </p>

  <p>
    And then there's the apps. iOS, Android, WebApps, mobile, desktop. There's a
    lot going on, and they hardly play well together. Desktop is great, because
    you can install browser plug ins for your wallet of choice, but most people
    are listening on their phone, and browser plugins don't work. There's things
    like AlbyHub that give an oAuth API so the app can connect with any wallet
    connected to the Hub, but that only works with certain wallets. Strike has
    an API, but it's only for business accounts, and only works with Strike
    Wallets. An app could host wallets, but now they're taking ownership of
    other people's money, and many app devs don't want the responsibility. Or
    they could pay a company to host the wallets, but that's going to cost $500
    a month, and that's a lot of dough for an indie app developer.
  </p>

  <p>
    The other issue is, people don't realize most of the heavy lifting for
    payments has been handled by the wallet provider. Take Alby for example.
    Alby has a single endpoint an app can send all of the splits to, and Alby
    will make all the payments and send back a single response with all of the
    payment details. This works great for mobile app devs who are worried about
    battery life and bandwidth. The new wallet methods don't allow that. The way
    the new wallet methods work is the app needs to send three requests PER
    SPLIT to make all of the payments. For a feed with 12 splits, you're looking
    at 36 requests PER BOOST. It's a difficult situation for them to be in
    considering they've spent the last two years only making one request per
    boost.
  </p>

    <div class="highlight-box">
      <h2>Who Are the Players?</h2>
      <div class="players-grid">
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Podcaster
        </div>
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Hosting Solution
        </div>
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
          Podcast Index
        </div>
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          Podcaster Wallet
        </div>
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
          </svg>
          Wallet Providers
        </div>
        <div class="player-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
            <rect x="9" y="9" width="6" height="6"/>
            <line x1="9" y1="1" x2="9" y2="4"/>
            <line x1="15" y1="1" x2="15" y2="4"/>
            <line x1="9" y1="20" x2="9" y2="23"/>
            <line x1="15" y1="20" x2="15" y2="23"/>
            <line x1="20" y1="9" x2="23" y2="9"/>
            <line x1="20" y1="14" x2="23" y2="14"/>
            <line x1="1" y1="9" x2="4" y2="9"/>
            <line x1="1" y1="14" x2="4" y2="14"/>
          </svg>
          Apps
        </div>
      </div>
    </div>

  <p>
    So who's responsibility is it that the podcaster get paid? In a sense, all
    of ours, but this question is more who cares most that the podcaster gets
    paid? The podcaster should. So when it comes to who takes the responsibility
    for ensuring easy payments, I would argue the podcaster has a more vested
    interest and should take on that responsibility, either personally or
    through their hosting company.
  </p>

    <div class="solution-section">
      <h2>The Split Box is My Solution</h2>
      <p>
        It's one of many possibilities. It's flawed, there are things about it I
        don't like. Any issues you have, I probably also have. I'm not interested in
        arguing anymore. If you don't like this solution, don't use it. Or fork it
        and make it better. I'm open to suggestions for improvements, but I'm not
        interested in bitching about why this doesn't do something you want it to or
        why it's flawed in this way or that way. I know it is. This is the
        compromise I've built. My preference is to continue using keysend, but I'm
        not a Wallet Provider, I write WebApps, so I'm at the mercy of the direction
        the Wallet Providers go. If you want it to do something else, make it do
        something else. It's all open for you guys to make it your own.
      </p>
    </div>

    <div class="goals-section">
      <h2>Goals for The Split Box (TSB)</h2>
      <ul class="goals-list">
        <li>
          <strong>Open Source & Self-Hostable:</strong> TSB is not a company, it's an idea. It's an open source server anyone can
          host for themselves and/or others. I don't want to handle your payments,
          and if I end up doing so, I will take a 10% cut off the top to encourage
          you to handle them yourself. I'll be running a server for a while for
          demonstration, and to help out some of the people that support me, but if
          it gets too expensive, I'll pull the plug on it. v4v baby.
        </li>
        <li>
          <strong>Single Endpoint:</strong> A single URL to send the metadata to.
        </li>
        <li>
          <strong>Backward Compatible Metadata:</strong> The metadata will be the TLV record we've been sending for the last four
          years. This means any existing app doesn't need to do much to change their
          existing code. The existing apps will need to make three calls per boost: one to send the TLV
          record and get the invoice, one for the listener to pay the invoice, and one
          to send the payment details from the paid invoice back to the Split Box to verify
          payment.
        </li>
        <li>
          <strong>Automated Split Distribution:</strong> Once payment is verified, TSB will forward the percentage of each split to
          each split. This solves the problem for PWA and serverless apps not having
          a back end. The podcaster will provide their own payment back end, either
          their own or a third party, preferably their hosting company.
        </li>
        <li>
          <strong>Feed as Source of Truth:</strong> The feed is the source of truth. This means the Podcaster Wallet would go
          away. A podcaster puts their desired splits into their feed, The Split Box
          looks up the feed and episode from the TLV record, then finds the
          appropriate value block. If a timestamp is included in the TLV record, The
          Split Box will also look up any Value Time Splits for that episode and
          adjust the splits accordingly. In the future, I hope this simplifies
          things for the app devs so they don't have to figure out
          remote_feed_guids, remote_item_guids, Value Time Stamps, etc. They would
          just need to send the feed_guid, item_guid, feed_url, and Timestamp and
          TSB server handles all the remote item stuff.
        </li>
        <li>
          <strong>Moving Forward:</strong> I am willing to budge on the Podcaster Wallet thing, but the hosts and
          podcasters have had plenty of time to figure this out, and if we're going
          to shake the apple cart with wallets, we might as well go through all the
          pain at once and get everyone on board with the new way of doing things.
          We should stop catering to those that don't want to innovate.
        </li>
        <li>
          <strong>Keysend First:</strong> If the address supports keysend, TSB will update the TLV accordingly for
          each split, then make the payment using keysend and sending the TLV
          record. Even with lnaddress, TSB looks for a .well-known/keysend route
          first, because keysend rules!
        </li>
        <li>
          <strong>LNURL Fallback:</strong> If the address is lnurlp only, TSB will store the TLV record, then send a
          payment with a comment. That comment will be a link to retrieve the TLV
          record. You'll have to work with your own wallet provider if they don't
          allow comments, and to see the comments. I'd also encourage you to find a
          wallet provider that supports webhooks, so when you get a payment in, you
          can have those comments sent to your own server so you can fetch and store
          the TLV records. But hey, if you're going to have a server that fetches
          and stores TLV records, you might as well run your own Split Box.
        </li>
      </ul>
    </div>
  </section>
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

  .quotes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  blockquote {
    background: var(--bg-secondary);
    border-left: 4px solid var(--primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin: 0;
  }

  blockquote p {
    font-size: 1.125rem;
    font-style: italic;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  cite {
    display: block;
    text-align: right;
    color: var(--text-muted);
    font-style: normal;
    font-size: 0.875rem;
  }

  .content-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
  }

  .content-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .content-section p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .content-section p:last-child {
    margin-bottom: 0;
  }

  .highlight-box {
    background: linear-gradient(135deg, rgba(247, 147, 26, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  .highlight-box h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    text-align: center;
  }

  .players-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }

  .player-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    text-align: center;
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .player-item svg {
    color: var(--primary);
  }

  .player-item:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  .solution-section,
  .goals-section {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  .solution-section h2,
  .goals-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .solution-section p {
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .goals-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .goals-list li {
    padding-left: 2rem;
    position: relative;
    color: var(--text-secondary);
    line-height: 1.8;
  }

  .goals-list li::before {
    content: '⚡';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.25rem;
    filter: drop-shadow(0 0 4px rgba(247, 147, 26, 0.5));
  }

  .goals-list strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.25rem;
  }

  @media (max-width: 768px) {
    .quotes {
      grid-template-columns: 1fr;
    }

    .content-section,
    .highlight-box,
    .solution-section,
    .goals-section {
      padding: 1.5rem;
    }

    .players-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
