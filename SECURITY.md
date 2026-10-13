# Security Policy

The **DevSec Status** team takes the security and integrity of our platform, data crawlers, and users seriously. We appreciate the responsible disclosure of security issues by researchers and contributors.

---

## Supported Versions

Only the latest version deployed from the `main` branch is actively supported with security updates. We do not maintain legacy versions or backports.

| Deployment / Branch | Supported          |
| ------------------- | ------------------ |
| `main` (Latest)     | :white_check_mark: |
| Older revisions     | :x:                |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**.

Please submit reports through **[GitHub Private Vulnerability Reporting](https://github.com/sercanvr/devsec-status/security/advisories/new)**. This creates a confidential advisory directly with repository maintainers and provides a private communication channel without exposing maintainer contact details to scraping bots.

### What to Include in Your Report

To help us triage and resolve the issue quickly, please provide:
- A clear description of the vulnerability.
- Steps to reproduce, Proof of Concept (PoC), or code snippet.
- The potential impact and affected components.
- Any suggested remediations or mitigations.

---

## Our Commitment

- We will acknowledge receipt of your vulnerability report within **72 hours** on a best-effort basis.
- We will provide a timeline for triage and resolution.
- We will notify you once a fix is deployed, and we will credit you in the release notes or security advisory (if desired).

---

## Security Architecture & Practices

- **Client-Side Sanitization**: DOMPurify sanitizes externally rendered strings and descriptions.
- **Dataset Schema & URL Allowlisting**: CI-enforced automated tests validate that external links and icons conform strictly to HTTPS and approved CDN domains.
- **Zero Client-Side API Secrets**: No GitHub tokens or private credentials are bundled into frontend assets; repository metrics are compiled statically via GitHub Actions cron workflows.
- **Content Security Policy (CSP)**: Headers deployed via `vercel.json` enforce `script-src 'self'` and `object-src 'none'` to restrict third-party executable scripts, while permitting inline styles for dynamic UI components.

---

## Out of Scope

The following items are outside the scope of our open-source vulnerability disclosure process:
- Vulnerabilities in third-party cloud infrastructure (Vercel, GitHub, or upstream CDNs).
- Automated scanner outputs (e.g. Nessus, Qualys, Burp) lacking a demonstrated, realistic exploit PoC.
- Denial of Service (DoS/DDoS) attacks against frontend CDN edges.
- Social engineering attacks targeting maintainers.
