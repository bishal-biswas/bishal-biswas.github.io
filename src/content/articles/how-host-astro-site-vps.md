---
title: "How to Host an Astro Site on a VPS: Complete Beginner's Guide"
slug: host-astro-site-on-vps
metaDescription: Learn how to host an Astro website on a VPS using Node.js,
  Nginx, PM2, and SSL. Follow this beginner-friendly step-by-step Astro VPS
  deployment guide.
image: host-astro-site-on-vps.webp
author: Bishal Biswas
publishDate: 2026-09-17
isDraft: false
category: Astro
tags:
  - Astro
  - Ubuntu
  - Linux
  - VPS Hosting
---
## Introduction

When I started working with modern JavaScript frameworks, I initially used platforms such as Vercel and Netlify because deployment was extremely simple.

Connect the GitHub repository, select the project, and the website goes live.

But sometimes I want more control.

For example, I may have my own VPS and want to host multiple websites on the same server. I may also want to control Nginx, Node.js, PM2, domains, SSL certificates, logs, and deployments myself.

This is where VPS hosting becomes useful.

In this article, I will show you how I host an **Astro website on a VPS**.

I will use:

- Ubuntu VPS
- Node.js
- npm
- Astro
- Nginx
- PM2
- Git
- Let's Encrypt SSL
- A custom domain

The process might look complicated initially, but once I understand what each component does, it becomes much easier.

---

# What We Are Going to Build

By the end, the setup will look roughly like this:

```text
User
  |
  | HTTPS
  v
Domain
  |
  v
Nginx
  |
  | Reverse Proxy
  v
Astro Application
  |
  v
Node.js
  |
  v
PM2
```

For a static Astro website, I can simplify the setup considerably.

For an SSR Astro website, Node.js needs to run the application, so Nginx will forward requests to the Astro server.

In this article, I will focus on the **Node.js/SSR-style deployment**, because it gives me a setup that can also support dynamic Astro applications.

---

# What Is a VPS?

Before deploying anything, it is useful to understand what a VPS actually is.

VPS stands for **Virtual Private Server**.

It gives me a virtual server with resources such as:

- CPU
- RAM
- Disk storage
- Operating system
- Network access
- Root or administrative access

Unlike shared hosting, I have much more control over the server.

I can install:

```text
Node.js
Nginx
PM2
MongoDB
PostgreSQL
Docker
Git
and other software
```

The exact software I need depends on my project.

For an Astro website, I mainly need Node.js, Nginx, and a process manager such as PM2 for a Node-based deployment.

---

# What Do Nginx and PM2 Do?

Two terms often confuse beginners when they first deploy a Node application.

## Nginx

Nginx acts as the web server and reverse proxy.

The visitor accesses:

```text
https://example.com
```

Nginx receives that request.

It can then forward the request to my Astro application running on something like:

```text
http://127.0.0.1:4321
```

The visitor doesn't need to know that port 4321 exists.

---

## PM2

PM2 is a process manager for Node.js applications.

If I simply run:

```bash
npm run start
```

the application runs in my terminal.

If I close the terminal or the process crashes, the application can stop.

PM2 helps me keep the Node application running.

It can also:

- Restart applications
- Monitor processes
- Start applications after server reboot
- Show logs
- Manage multiple applications

So I can think of it this way:

```text
Nginx = receives web requests

PM2 = keeps my Node application running
```

---

# Step 1: Connect to the VPS

I normally connect to an Ubuntu VPS using SSH.

From Windows PowerShell or Terminal:

```bash
ssh root@YOUR_SERVER_IP
```

For example:

```bash
ssh root@123.123.123.123
```

Replace the IP address with the actual IP address of your VPS.

If your VPS provider gives you a different username, use that username instead.

For example:

```bash
ssh ubuntu@123.123.123.123
```

Once connected, I am working directly on the server.

---

# Step 2: Update Ubuntu

Before installing anything, I update the package lists.

```bash
sudo apt update
```

Then I can upgrade installed packages:

```bash
sudo apt upgrade -y
```

I usually do this when preparing a new VPS.

---

# Step 3: Install Git

If my Astro project is stored on GitHub, I need Git on the VPS.

```bash
sudo apt install git -y
```

Check that it was installed:

```bash
git --version
```

I should get a version number such as:

```text
git version 2.x.x
```

---

# Step 4: Install Node.js

Astro requires Node.js.

There are several ways to install Node.js on Ubuntu.

For a production server, I prefer using a version manager such as **NVM** when I want easy control over Node versions.

Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```

After installation, reload the shell:

```bash
source ~/.bashrc
```

Check NVM:

```bash
nvm --version
```

Then install the Node.js version required by the project.

For example:

```bash
nvm install --lts
```

Use the project's required Node version if the project specifies one.

Check:

```bash
node -v
```

and:

```bash
npm -v
```

---

# Step 5: Clone the Astro Project

Now I need to put my Astro project on the VPS.

I can clone it from GitHub.

For example:

```bash
cd /var/www
```

Create a directory for the website:

```bash
sudo mkdir -p /var/www/my-astro-site
```

Give the directory to my deployment user if necessary, then clone the repository.

A common approach is:

```bash
cd /var/www
git clone YOUR_GITHUB_REPOSITORY_URL my-astro-site
```

Then:

```bash
cd /var/www/my-astro-site
```

I can check the project files:

```bash
ls
```

I should see files such as:

```text
package.json
astro.config.mjs
src
public
```

depending on the project.

---

# Step 6: Install Dependencies

Inside the project directory:

```bash
npm install
```

If the project uses a lockfile, I prefer using:

```bash
npm ci
```

for a reproducible production installation.

The exact command depends on the package manager and lockfile used by the project.

For example:

```text
package-lock.json  -> npm ci
pnpm-lock.yaml     -> pnpm install --frozen-lockfile
yarn.lock          -> yarn install --frozen-lockfile
```

---

# Step 7: Configure Astro for the Server

This step depends on how my Astro website is built.

If the project is a static website, I can generate static files.

If the project uses Astro SSR, I need an appropriate Astro adapter.

For a Node.js server deployment, the project commonly uses:

```bash
npm install @astrojs/node
```

Then my Astro configuration can use the Node adapter.

For example:

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone'
    })
});
```

The exact configuration depends on the Astro version and project requirements.

The important thing to understand is that:

```text
Static Astro
     |
     v
HTML/CSS/JS files

SSR Astro
     |
     v
Node.js application
```

I should decide which deployment model my project actually needs before setting up the server.

---

# Step 8: Build the Astro Project

Once dependencies and configuration are ready:

```bash
npm run build
```

Astro will build the production version of the application.

If everything is configured correctly, the command should complete successfully.

I recommend fixing all build errors before moving to Nginx or PM2.

If the project doesn't build locally, deploying it to the VPS won't magically fix it.

---

# Step 9: Test the Astro Application

Before configuring Nginx, I like to test the application directly.

For an Astro Node deployment, the exact command depends on the generated output and package scripts.

A common setup is:

```bash
npm run start
```

or:

```bash
node ./dist/server/entry.mjs
```

If Astro is listening on port `4321`, I can test it locally on the VPS:

```bash
curl http://127.0.0.1:4321
```

If I receive HTML output, the application is running.

At this stage:

```text
Browser
   X
   |
   v
Nginx not configured yet

VPS
   |
   v
Astro
   |
   v
Port 4321
```

Once this works, I can move to the reverse proxy configuration.

---

# Step 10: Install PM2

Now I want the Astro Node process to keep running.

I install PM2:

```bash
npm install -g pm2
```

Check it:

```bash
pm2 --version
```

---

# Step 11: Start Astro With PM2

I can start the Astro server using PM2.

For example:

```bash
pm2 start ./dist/server/entry.mjs --name my-astro-site
```

If the application needs a specific host and port, I can configure environment variables.

For example:

```bash
HOST=127.0.0.1 PORT=4321 pm2 start ./dist/server/entry.mjs --name my-astro-site
```

Then check:

```bash
pm2 list
```

I should see something similar to:

```text
┌────┬────────────────┬─────────┬─────────┐
│ id │ name           │ status  │ uptime  │
├────┼────────────────┼─────────┼─────────┤
│ 0  │ my-astro-site  │ online  │ ...     │
└────┴────────────────┴─────────┴─────────┘
```

---

# Step 12: Save the PM2 Process

PM2 needs to know which applications should be restored after a server reboot.

Run:

```bash
pm2 save
```

Then generate the startup command:

```bash
pm2 startup
```

PM2 will give me a command.

I need to copy and execute the command it provides.

Then run:

```bash
pm2 save
```

Now PM2 can restore the application after the server restarts.

---

# Step 13: Install Nginx

Now I install Nginx:

```bash
sudo apt install nginx -y
```

Check its status:

```bash
sudo systemctl status nginx
```

If everything is working, I should see that Nginx is active.

I can also test:

```bash
http://YOUR_SERVER_IP
```

The default Nginx page should appear.

---

# Step 14: Point the Domain to the VPS

Before configuring Nginx for my domain, I need to point the domain to the VPS.

Suppose my domain is:

```text
example.com
```

In my domain DNS settings, I create an `A` record:

```text
Type: A
Name: @
Value: YOUR_SERVER_IP
```

For:

```text
www.example.com
```

I can create another record:

```text
Type: A
Name: www
Value: YOUR_SERVER_IP
```

DNS changes can take some time to propagate.

I can check the domain using:

```bash
ping example.com
```

or a DNS lookup tool.

---

# Step 15: Create an Nginx Configuration

Now I need to tell Nginx what to do when someone visits my domain.

Create a configuration file:

```bash
sudo nano /etc/nginx/sites-available/my-astro-site
```

Add:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:4321;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Replace:

```text
example.com
```

with your actual domain.

The important line is:

```nginx
proxy_pass http://127.0.0.1:4321;
```

This tells Nginx:

> Forward requests to my Astro application running on port 4321.

---

# Step 16: Enable the Nginx Configuration

Now I create a symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/my-astro-site /etc/nginx/sites-enabled/
```

Before restarting Nginx, I always test the configuration.

```bash
sudo nginx -t
```

If everything is correct, I should see:

```text
syntax is ok
test is successful
```

Then reload Nginx:

```bash
sudo systemctl reload nginx
```

Now I can open:

```text
http://example.com
```

If DNS is configured correctly and Astro is running, the website should appear.

---

# Step 17: Add HTTPS With Let's Encrypt

I don't want visitors using plain HTTP in production.

I want:

```text
https://example.com
```

instead of:

```text
http://example.com
```

A common way to configure free SSL certificates on Ubuntu with Nginx is **Certbot**.

Install Certbot and its Nginx plugin:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Then run:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot can obtain the certificate and update the Nginx configuration.

After that, open:

```text
https://example.com
```

Your Astro website should now be accessible over HTTPS.

---

# Step 18: Check Automatic Certificate Renewal

Let's Encrypt certificates are short-lived, so I don't want to manually renew them every time.

Certbot generally installs automatic renewal functionality.

I can test the renewal process:

```bash
sudo certbot renew --dry-run
```

If the test succeeds, automatic renewal should be configured correctly.

---

# Step 19: Configure a Firewall

A VPS should not expose every possible port to the internet.

If I use Ubuntu's UFW firewall, I can allow SSH:

```bash
sudo ufw allow OpenSSH
```

Allow HTTP:

```bash
sudo ufw allow 80/tcp
```

Allow HTTPS:

```bash
sudo ufw allow 443/tcp
```

Then enable UFW:

```bash
sudo ufw enable
```

Check the rules:

```bash
sudo ufw status
```

One important thing I remember is that I generally **do not need to expose the Astro port publicly**.

For example, if Astro runs on:

```text
127.0.0.1:4321
```

Nginx can access it internally.

Visitors only need access to:

```text
80
443
```

and SSH on the port I use.

---

# Step 20: Useful PM2 Commands

Once the website is deployed, I frequently use PM2 commands.

### See running applications

```bash
pm2 list
```

### View logs

```bash
pm2 logs my-astro-site
```

### Restart application

```bash
pm2 restart my-astro-site
```

### Stop application

```bash
pm2 stop my-astro-site
```

### Remove application from PM2

```bash
pm2 delete my-astro-site
```

### View application details

```bash
pm2 show my-astro-site
```

These commands are worth remembering.

---

# Updating the Astro Website

Now suppose I make changes to my Astro project and push them to GitHub.

On the VPS:

```bash
cd /var/www/my-astro-site
```

Pull the latest code:

```bash
git pull
```

Install dependencies if required:

```bash
npm ci
```

Build the project:

```bash
npm run build
```

Then restart the application:

```bash
pm2 restart my-astro-site
```

The updated version should now be live.

So my basic deployment workflow becomes:

```text
Local Changes
     |
     v
Git Commit
     |
     v
Git Push
     |
     v
VPS
     |
     v
git pull
     |
     v
npm ci
     |
     v
npm run build
     |
     v
PM2 restart
     |
     v
Website Updated
```

---

# What If I Use GitHub Actions?

Manually running:

```bash
git pull
npm ci
npm run build
pm2 restart
```

every time works, but eventually I may want to automate it.

This is where **GitHub Actions** becomes useful.

I can create a deployment workflow that:

1. Detects a push to the production branch
2. Connects to the VPS through SSH
3. Pulls the latest code
4. Installs dependencies
5. Builds the Astro project
6. Restarts PM2

Then my deployment becomes:

```text
git push
    |
    v
GitHub Actions
    |
    v
VPS
    |
    v
Build
    |
    v
PM2 Restart
```

This is one of the first steps I would take when moving from manual deployment toward a proper CI/CD workflow.

---

# Static Astro vs SSR Astro on a VPS

Before deploying Astro, I always ask myself:

> Does this project actually need a Node server?

Astro can be used to generate static websites.

For example:

```text
Blog
Portfolio
Documentation
Landing Page
Company Website
```

may be suitable for static output.

In that situation, the architecture can be much simpler:

```text
User
  |
  v
Nginx
  |
  v
Static HTML/CSS/JS
```

I don't necessarily need PM2 or a Node server for every static Astro website.

For SSR:

```text
User
  |
  v
Nginx
  |
  v
PM2
  |
  v
Node.js
  |
  v
Astro SSR
```

So I should not automatically add PM2 just because the project uses Astro.

The deployment method should match the project's output mode.

---

# Common Problems and Their Solutions

## 1. Nginx Shows 502 Bad Gateway

If I see:

```text
502 Bad Gateway
```

I first check whether Astro is running.

```bash
pm2 list
```

Then:

```bash
pm2 logs my-astro-site
```

I also check the port:

```bash
curl http://127.0.0.1:4321
```

If this doesn't work, the problem is probably with the Astro application rather than Nginx.

---

## 2. Website Works on Port 4321 but Not Through Domain

If:

```text
http://127.0.0.1:4321
```

works but:

```text
https://example.com
```

doesn't, I check:

```text
DNS
Nginx configuration
Firewall
SSL configuration
```

I also run:

```bash
sudo nginx -t
```

---

## 3. Astro Works Locally but Not on VPS

I check the Node.js version:

```bash
node -v
```

Then compare it with the version required by the project.

I also run:

```bash
npm run build
```

directly on the VPS.

Build errors usually tell me what needs to be fixed.

---

## 4. Changes Are Not Appearing

I check:

```bash
git status
```

Then:

```bash
git pull
```

Build again:

```bash
npm run build
```

And restart:

```bash
pm2 restart my-astro-site
```

If the browser still shows old content, I also check browser caching and any caching layer in front of the server.

---

## 5. PM2 Application Keeps Restarting

I check:

```bash
pm2 logs my-astro-site
```

If the application crashes immediately, PM2 itself isn't necessarily the problem.

There may be an application error, missing environment variable, incorrect Node version, or incorrect start command.

---

# Where Should I Store Multiple Websites?

If I host multiple projects on the same VPS, I like keeping them organized.

For example:

```text
/var/www/
    website-one/
    website-two/
    website-three/
```

Each application can have its own:

```text
Git repository
Node application
PM2 process
Nginx configuration
Domain
SSL certificate
```

For example:

```text
example.com
      |
      v
Nginx
      |
      v
127.0.0.1:4321
      |
      v
Astro Website 1


blog.example.com
      |
      v
Nginx
      |
      v
127.0.0.1:4322
      |
      v
Astro Website 2
```

This allows one VPS to host multiple applications.

---

# The Complete Architecture

After everything is configured, the production setup looks like this:

```text
                    INTERNET
                        |
                        v
                  example.com
                        |
                        v
                     NGINX
                  /           \
                 /             \
              HTTP             HTTPS
                                |
                                v
                        Reverse Proxy
                                |
                                v
                     127.0.0.1:4321
                                |
                                v
                             PM2
                                |
                                v
                            Node.js
                                |
                                v
                          Astro SSR
```

This might look complicated when written as a diagram, but each component has a specific responsibility.

```text
Domain       -> Points visitors to the server

Nginx        -> Receives web requests

SSL          -> Provides HTTPS

PM2          -> Keeps Node running

Node.js      -> Runs the Astro server

Astro        -> Generates and serves the application
```

---

# My Basic Astro VPS Deployment Checklist

When I deploy an Astro project to a new VPS, I generally work through this checklist:

```text
[ ] Create VPS
[ ] Install updates
[ ] Install Git
[ ] Install Node.js
[ ] Clone repository
[ ] Install dependencies
[ ] Configure Astro
[ ] Build project
[ ] Test Astro locally
[ ] Install PM2
[ ] Start Astro with PM2
[ ] Save PM2 process
[ ] Install Nginx
[ ] Point domain to VPS
[ ] Configure Nginx
[ ] Test Nginx
[ ] Configure HTTPS
[ ] Test SSL renewal
[ ] Configure firewall
[ ] Test website
```

Once I have done this a few times, deploying another Astro application becomes much faster.

---

# Final Thoughts

Hosting an Astro website on a VPS may seem difficult when I look at all the commands involved.

But when I break it down, there are only a few important pieces.

**Astro** is my application.

**Node.js** runs the server-side Astro application when I use SSR.

**PM2** keeps the Node process running.

**Nginx** receives requests from visitors and forwards them to Astro.

**DNS** connects my domain to the VPS.

**Let's Encrypt** provides HTTPS.

And **Git** gives me a convenient way to get my project onto the server and update it.

The most important thing I learned is that I don't need to memorize every command.

I need to understand how the pieces connect:

```text
Domain
   ↓
Nginx
   ↓
PM2
   ↓
Node.js
   ↓
Astro
```

Once I understand that architecture, troubleshooting becomes much easier.

If the domain doesn't work, I check DNS.

If Nginx returns 502, I check the Astro process.

If the application crashes, I check PM2 logs.

If the build fails, I check the Node version, dependencies, environment variables, and Astro configuration.

That is what makes VPS deployment much less intimidating.

And once I am comfortable with this setup, the next natural step is automating the deployment with **GitHub Actions and CI/CD**, so I don't have to manually log into the VPS every time I publish a new version.
