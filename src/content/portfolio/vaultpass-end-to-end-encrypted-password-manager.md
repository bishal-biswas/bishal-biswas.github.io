---
title: VaultPass — End-to-End Encrypted Password Manager
slug: vaultpass-end-to-end-encrypted-password-manager
featuredImage: vaultpass-secure-password-manager-featuredimage.webp
projectBriefDescription: A zero-knowledge password manager built with React 19,
  Firebase and the Web Crypto API, where the database only ever stores
  ciphertext.
screenshots:
  - vaultpass-2-.webp
  - vaultpass-3-.webp
  - vaultpass-1-.webp
projectType: Web Development
publishDate: 2026-09-03
isDraft: false
isStatus: Personal
techStack:
  - React
  - Firebase
isProjectCompleted: true
projectDuration: 2 Weeks
projectLiveLink: https://dev-bishal.github.io/PasswordManager/
projectRepoLink: https://github.com/dev-bishal/PasswordManager/
---
<b>VaultPass</b> is a personal project I built to answer an uncomfortable question: <i>if I store my passwords in someone else's database, what exactly can they read?</i> For most hobby password managers the honest answer is "everything" — the app encrypts nothing, and whoever holds the database console holds the passwords.

So I built one where the answer is "nothing". VaultPass encrypts every secret <b>in the browser</b>, using a master password that never leaves the device. Firestore stores ciphertext and nothing else. I have full admin access to the Firebase project behind the live demo, and I still cannot read a single password saved in it.

## How It's Made

The app is a <b>React 19 single-page application</b> bundled with <b>Vite</b>, styled with <b>Tailwind CSS 4</b>, backed by <b>Firebase</b> for identity and storage, and deployed as a static build to <b>GitHub Pages</b>. There is no server of my own anywhere in the stack.

It started life as three hand-written HTML mockups — a landing page, an auth page and a dashboard — which I used to settle the visual language before writing any React. Those static files became the design reference, and the shared theme in `index.css` is a direct port of them. Building the design first and the state second meant the React work was almost entirely about behaviour rather than layout.

The architecture is deliberately small — three React contexts, each owning exactly one concern:

- <b>`AuthContext`</b> — who you are. Wraps Firebase Auth, exposes register / login / Google sign-in / password reset / profile updates.
- <b>`VaultContext`</b> — whether the vault is open. Owns the in-memory encryption key and a five-state machine (`loading → setup / locked → unlocked / error`), plus the encrypt and decrypt helpers.
- <b>`ToastContext`</b> — feedback. A single toast slot with its own timers.

`VaultProvider` deliberately sits *inside* `AuthProvider`, because the vault key is derived per signed-in user, and *above* the router, so navigating between pages never drops the key.

## The Encryption Model

This is the part the whole project exists for. VaultPass uses <b>envelope encryption</b>, implemented directly against the browser's native `crypto.subtle` — no crypto libraries, no dependencies:

```
master password ──PBKDF2-SHA256, 310k iterations, 16-byte salt──► KEK  (memory only)
data key (DEK)  ──AES-GCM wrapped with the KEK──────────────────► wrappedKey  (stored)
each secret     ──AES-256-GCM with a fresh 96-bit IV────────────► { ct, iv }   (stored)
```

A few decisions in there are worth explaining:

- <b>The master password is never stored or transmitted.</b> Not to Firestore, not to `localStorage`. It exists only as a variable in memory, which means it genuinely cannot be reset — and the setup screen says so, in a warning box, before you commit to one.
- <b>Wrapping a data key instead of encrypting with the derived key directly.</b> Changing your master password then re-wraps a single 32-byte key rather than decrypting and re-encrypting every entry in the vault. One write instead of N.
- <b>The wrong password fails loudly, and nothing else does.</b> AES-GCM is authenticated, so an incorrect master password fails the tag check when unwrapping the data key. That failure *is* the password check — there is deliberately no stored hash or verifier that would let an attacker test guesses more cheaply than doing the full PBKDF2 derivation.
- <b>The vault re-locks on reload</b>, because the key lives only in memory. There is also a *Lock Vault* action in the dashboard menu that wipes it on demand.
- <b>Legacy entries migrate themselves.</b> Encryption was added after the first working version, so entries saved as plaintext are detected on first unlock and silently re-written as ciphertext in place.

The rule I liked writing most is in `firestore.rules`, which enforces encryption at the <b>database</b> layer rather than trusting the client:

```js
allow create, update: if request.auth != null
  && request.auth.uid == uid
  && isCiphertext(request.resource.data.password)
  && isCiphertext(request.resource.data.notes);
```

An encrypted field is a map of `{ ct, iv }`. A plain string is rejected by Firestore itself. So even if I shipped a bug that bypassed the encryption path, the database would refuse the write instead of quietly storing readable passwords. Defence in depth, and a nice safety net for a codebase with exactly one developer.

## What Each Part of the Stack Actually Does

- <b>React 19 + Vite</b> — Context API for all shared state (no Redux; the app simply isn't big enough to earn it), `useMemo` for the search / filter / sort pipeline so it doesn't re-run on every keystroke, and `useRef` for the encryption key specifically because a ref does *not* trigger re-renders and never ends up serialised into React state.
- <b>React Router 7</b> — clean URLs (`/login`, `/dashboard`, `/profile`) with a `ProtectedRoute` wrapper, and `basename` wired to Vite's `BASE_URL` so the identical build works at the dev root and under the `/PasswordManager/` sub-path on Pages.
- <b>Tailwind CSS 4</b> — via the first-party Vite plugin, so there's no PostCSS config at all. Utilities carry the layout; a hand-written layer holds the theme tokens, gradients, the sliding form panel and the scroll-reveal animations.
- <b>Firebase Auth</b> — email/password plus Google sign-in, password reset, and re-authentication before a password change. Every Firebase error code is mapped to a human sentence rather than shown raw.
- <b>Cloud Firestore</b> — `onSnapshot` gives live sync for free: add a password on your phone and it appears on your laptop without a refresh. Security rules scope every document to `request.auth.uid`.
- <b>Web Crypto API</b> — PBKDF2 derivation, AES-GCM encryption, key wrapping, and `crypto.getRandomValues` for the password generator, which uses a CSPRNG rather than `Math.random()`.
- <b>Swiper</b> — the testimonial carousel on the landing page.
- <b>GitHub Pages</b> — static hosting over HTTPS, which the Web Crypto API requires anyway since `crypto.subtle` only exists in a secure context.

One deployment detail I enjoyed solving: GitHub Pages has no SPA fallback, so a direct visit to `/PasswordManager/dashboard` is a real 404. A `404.html` catches it, encodes the requested path into a query string and bounces to the app root, where a snippet in `index.html` restores the true URL via `history.replaceState()` *before* React mounts. Deep links and refreshes work exactly as they should.

## What It Contains

- 🏠 <b>Landing page</b> — hero with an animated vault preview, feature grid, security explainer, testimonial carousel and scroll-reveal animations driven by `IntersectionObserver`.
- 🔑 <b>Authentication</b> — a split-screen auth page with tabbed login / register / password-reset panels, live password-strength feedback and Google sign-in.
- 🛡️ <b>Master password gate</b> — first-run vault setup with a strength meter and an explicit "this cannot be recovered" warning, plus an unlock screen on every return visit.
- 🗄️ <b>The vault</b> — create, edit and delete entries across five categories, synced live with Firestore and encrypted on the way out.
- 🔎 <b>Finding things</b> — full-text search across name, username, category and notes; category chips; five sort orders; and three view densities (3-column, 2-column, list).
- ⚡ <b>Password generator</b> — adjustable length and character sets, guarantees at least one character from each selected class, then shuffles so the guaranteed characters aren't always at the front.
- 📋 <b>One-click copy</b> with a `document.execCommand` fallback for browsers that block the async clipboard API.
- 👤 <b>Profile and settings</b> — change your display name, change your login password (with re-authentication), change your master password (which re-wraps the key), and a "forgot your master password?" modal that explains, honestly, that there is no way back.

## What Can Be Improved

Writing this up honestly matters more to me than the feature list. In rough order of how much they bother me:

1. <b>The landing page markets a product that doesn't exist.</b> "5M+ Active Users", "99.9% Uptime", invented testimonials, and a feature card for biometric authentication that isn't implemented. It made sense as a design exercise, but shipping fake social proof on a security tool is the wrong instinct. This should be rewritten as an honest demo page — or the numbers replaced with real ones.
2. <b>PBKDF2 should be Argon2id.</b> 310,000 iterations of PBKDF2-SHA256 meets current OWASP guidance, but PBKDF2 is cheap to accelerate on a GPU. Argon2id is memory-hard and far more expensive to attack in parallel; it means adding a WASM dependency, which is exactly the kind of tradeoff worth making here.
3. <b>Entry metadata is stored in plaintext.</b> `name`, `url`, `username` and `category` are unencrypted so that search, filtering and sorting can run without decrypting the whole vault first. That's a real, deliberate tradeoff — but it means the database still reveals *which* services you use and under what usernames. The fix is a client-side search index built after unlock, or blind indexing.
4. <b>There is no auto-lock.</b> The vault locks on reload or manual action, but an unlocked tab left open on a shared machine stays unlocked indefinitely. It needs an idle timer, a lock on `visibilitychange`, and a clipboard that clears itself ~30 seconds after a copy.
5. <b>There is no recovery path at all.</b> "Unrecoverable" is the correct security property, but real password managers soften it with a printable emergency kit or a recovery key sealed under a second secret. Right now a forgotten master password is a total, silent data loss event.
6. <b>No import or export.</b> A password manager you can't get your data *out* of is a trap. Encrypted JSON export and CSV import from other managers are table stakes, and I'd want them before suggesting anyone actually use this.
7. <b>No tests.</b> The crypto module in particular deserves proper unit tests — encrypt/decrypt round-trips, rejection of a wrong master password, key re-wrapping preserving decryptability, and the plaintext-migration path. Right now every one of those is verified by hand.
8. <b>The whole vault re-decrypts on every Firestore snapshot.</b> Editing one entry triggers an AES-GCM decrypt of all of them. Invisible at ten entries, noticeably wasteful at a thousand. Memoising per document ID and `updatedAt` would fix it.
9. <b>The strength meter is naive.</b> It counts character classes, so `Password1!` scores "Strong". Swapping in `zxcvbn` would give real entropy estimates and catch common patterns, and integrating the Have I Been Pwned range API — which uses k-anonymity, so no password ever leaves the device — would flag breached and reused entries.
10. <b>Accessibility needs a proper pass.</b> The dropdown menus close on outside click but ignore Escape and arrow keys, `aria-expanded` is missing throughout, the toast isn't an ARIA live region, and deletion uses a raw `window.confirm()` that breaks the visual language of everything around it.
11. <b>Infrastructure gaps.</b> No ESLint or Prettier config, no CI, no `.env` for the Firebase config (the keys are public by design, but environment variables would let dev and production point at different projects), and no Firebase App Check to stop the API being driven by anything other than the real app.
12. <b>The landing page is client-rendered.</b> A marketing page delivered as an empty `<div>` plus a JavaScript bundle is the wrong shape for SEO. Pre-rendering it — or, fittingly, rebuilding it in Astro and mounting only the app as an island — would fix both the crawlability and the first-paint time.

Building this taught me more about applied cryptography than any amount of reading did — particularly that the interesting decisions aren't which cipher to use, but where the key lives, what happens when someone forgets it, and how much you're willing to leak in exchange for a working search box.
