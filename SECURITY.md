# Security Policy

The **DevSec Status** team takes the security and integrity of our platform, data crawlers, and users seriously. We appreciate the responsible disclosure of security issues by researchers and contributors.

---

## Supported Versions

Only the latest release running on the `main` branch is actively supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not open a public issue**. Instead, follow one of the methods below:

1. **GitHub Private Vulnerability Reporting (Recommended)**:  
   Go to the [Security Advisories tab](https://github.com/sercanvr/devsec-status/security/advisories/new) on GitHub and click **"Report a vulnerability"**. This creates a confidential advisory directly with repository maintainers.

2. **Direct Contact**:  
   If Private Vulnerability Reporting is unavailable, please email **sercanvar@gmail.com** with the subject line `[SECURITY] DevSec Status Vulnerability Report`.

### What to Include in Your Report

To help us triage and resolve the issue quickly, please provide:
- A clear description of the vulnerability.
- Steps to reproduce, Proof of Concept (PoC), or code snippet.
- The potential impact and affected components.
- Any suggested remediations or mitigations.

---

## Our Commitment

- We will acknowledge receipt of your vulnerability report within **48 hours**.
- We will provide a timeline for triage and resolution.
- We will notify you once a fix is deployed, and we will credit you in the release notes / advisory (if you wish).

---

## Scope & Defenses

DevSec Status implements multiple layers of defense:
- **DOMPurify Sanitization**: Strict HTML sanitization on all dynamic and externally rendered strings.
- **Dataset Schema & URL Allowlisting**: CI-enforced validation ensuring all repositories and external assets come from trusted origins.
- **Zero Runtime API Tokens**: No client-side exposure of GitHub API tokens; metrics are pre-fetched via isolated server-side GitHub Actions.
