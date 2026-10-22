# 🚀 RootLab (`root@lab:~$`)

> **Verified Tech Workplace Network, Private Company Watercoolers, Direct Referrals & Developer Community Hub**

RootLab is a developer-first platform designed to solve the three biggest problems in tech networking:
1. **The Referral Black Hole**: Bypassing automated HR filters by connecting job seekers directly with verified internal employees who can submit employee referrals.
2. **Unfiltered Workplace Truth**: Real interview questions, actual salary/CTC numbers, and honest company culture gossip without corporate PR or HR surveillance.
3. **Private Company Watercoolers**: Isolated, encrypted lounges accessible strictly to colleagues sharing the same verified company email domain (e.g. `@google.com`, `@amazon.com`, `@stripe.com`, `@tcs.com`).

---

## 🔒 Zero-Trace Cryptographic Privacy Guarantee

Developers and engineers must feel safe discussing salary, workplace culture, and company policies without fear of employer retaliation.

RootLab uses a **Zero-Knowledge Domain Hashing** architecture:
* When a user inputs their work email (`alex@uber.com`), the domain `@uber.com` is extracted to award the `[Verified @Uber]` badge.
* The email is salted and hashed via a one-way cryptographic function (`SHA-256(email + SERVER_SALT)`).
* **The raw email address is immediately discarded.** No cleartext emails are ever stored in the database or attached to public posts or chat messages.

---

## ⚡ Core Features

* **🌍 Global Community Feed**: Filter discussions across:
  * 🤝 **Job Referrals**: Internal job postings with direct referral requests.
  * 🎯 **Interview Intel & TC**: Real interview rounds, live debugging tests, and compensation breakdowns.
  * ☕ **IT Gossip & Layoffs**: Early policy leaks, RTO mandates, and restructure radars.
  * 🛠️ **DevOps & Engineering**: Production post-mortems, K8s triage, and incident debugging.
  * 🛡️ **CyberSecurity & Bug Bounty**: WAF bypasses, exploit analyses, and security scripts.
* **🔒 Company Watercooler**: A locked company lounge accessible only to colleagues with verified work email domains.
* **💬 Multi-Channel Dev Chat Rooms**: Terminal-styled live rooms (`#general-hall`, `#devops-triage`, `#interview-prep`) with syntax-highlighted code blocks.
* **👥 Developer & Referral Directory**: Filter engineers by company, verified status, tech stack (Kubernetes, Go, AWS, Python, Burp Suite), and referral availability.

---

## 🛠️ Tech Stack & Portability

Built with a modern, modular architecture with **zero vendor lock-in**:
* **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript
* **Styling**: Tailwind CSS v4 (Dark terminal theme) + Lucide Icons
* **Hosting Today**: Vercel (Fast edge routing, zero-cost serverless start)
* **Future Migration Ready**: Standalone Docker container (`Dockerfile` & `docker-compose.yml`) ready for deployment to AWS, GCP, Fly.io, or self-hosted Kubernetes.

---

## 🏃 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# Visit http://localhost:3000
```

---

## 🐙 Pushing to Your GitHub Repository

Initialize and push this clean standalone repository to your GitHub account (`anoop-v-official`):

```bash
# 1. Navigate to the project
cd /home/lenovo/Documents/rootlab

# 2. Initialize git and make initial commit
git init -b main
git add .
git commit -m "feat: initial RootLab verified tech network and community platform"

# 3. Create a new repository named 'rootlab' on GitHub (https://github.com/new)
# 4. Link and push:
git remote add origin https://github.com/Anoop-v-official/rootlab.git
git push -u origin main
```

---

## 🚀 Deployment

### Option A: Vercel (Recommended for Launch)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your `rootlab` repository from GitHub.
3. Keep default Next.js build settings and click **Deploy**.

### Option B: Docker / Self-Hosted VPS (When Scaling Up)
```bash
# Build and run with Docker Compose
docker compose up -d --build
```

---

## 📄 License
MIT License. Built for developers, AI engineers, DevOps, and ethical hackers.
