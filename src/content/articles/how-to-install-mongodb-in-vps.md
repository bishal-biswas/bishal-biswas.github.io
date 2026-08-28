---
title : How to Install MongoDB on Your Ubuntu VPS
slug : how-to-install-mongodb-in-vps
featuredImage : how-to-install-mongodb-in-vps.jpg
author : Bishal Biswas
publishDate : 2026-01-16T08:30
isDraft : false
metaDescription :  Explore my developer portfolio, built with Astro and powered by Vercel & Supabase. Discover articles on web development, project case studies on my blog.
category : Tech Information
tags : [MongoDB, Ununtu, VPS]
includeFancyBox : true
---

Are you setting up a new Ubuntu Virtual Private Server (VPS) and need a robust database solution? MongoDB is a popular NoSQL database that offers flexibility and scalability, making it an excellent choice for modern web applications. This guide will walk you through the process of installing MongoDB on your Ubuntu VPS, covering versions like Focal (20.04), Jammy (22.04), and even the latest Noble (24.04).

## Before You Begin
Ensure you have:

An Ubuntu VPS (this guide covers 20.04 LTS, 22.04 LTS, and 24.04 LTS).

sudo privileges on your VPS.

Basic familiarity with the Linux command line.

Determine your Ubuntu Version: It's crucial to know your Ubuntu version (codename). Use this command:

<pre><code  class="language-js">
lsb_release -a
</code></pre>
Look for the Codename: line. It will be focal (20.04), jammy (22.04), or noble (24.04). Keep this in mind for Step 3.

----------

## Step 1: Update Your System and Install Dependencies
Before installing any new software, it's a good practice to update your package lists and upgrade existing packages. This ensures you have the latest security patches and dependencies.

<pre><code  class="language-js">sudo apt update
sudo apt upgrade -y
sudo apt install -y gnupg curl
</code></pre>

gnupg is used for handling GPG keys, and curl is used to download the MongoDB public key.

----------

## Step 2: Import the MongoDB GPG Key
MongoDB packages are cryptographically signed to ensure their authenticity. You need to import the public GPG key for the MongoDB repository.

<pre><code  class="language-js">curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
</code></pre>
Note: The URL for the GPG key server-7.0.asc is generally compatible across various MongoDB versions (7.x and 8.x) and Ubuntu releases, as the key primarily authenticates the source.

----------

## Step 3: Create a List File for MongoDB
Now, you need to create a list file (.list) that tells apt where to find the MongoDB packages. This is where your Ubuntu codename (focal, jammy, or noble) is important.

For Ubuntu 20.04 (Focal Fossa):

<pre><code  class="language-js">
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
For Ubuntu 22.04 (Jammy Jellyfish):
</code></pre>

<pre><code  class="language-js">echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
For Ubuntu 24.04 (Noble Numbat): For Noble, it's best to aim for MongoDB 8.0, as 7.0 might have libssl conflicts.
</code></pre>

<pre><code  class="language-js">echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
</code></pre>

Important Note for Noble (24.04): If you are on Noble, make sure you use the server-8.0.gpg key in Step 2 and the 8.0 repository in Step 3 as shown above to avoid potential dependency conflicts.

After adding the repository, update your apt cache:

<pre><code  class="language-js">sudo apt update
</code></pre>
----------

## Step 4: Install MongoDB
With the repository added and updated, you can now install the MongoDB packages. We'll install mongodb-org, which is a metapackage that installs the server, shell, tools, and other necessary components.

<pre><code  class="language-js">sudo apt install -y mongodb-org
</code></pre>
----------

## Step 5: Start MongoDB
After installation, MongoDB is not always started automatically. You need to start the mongod service and enable it to launch on boot.

<pre><code  class="language-js">
sudo systemctl start mongod
sudo systemctl enable mongod
</code></pre>

To check the status of the MongoDB service:
<pre><code class="language-js">sudo systemctl status mongod
</code></pre>

You should see output indicating that the service is active (running).

----------

## Step 6: Verify MongoDB Installation
You can verify that MongoDB is running and accessible by connecting to it using the mongosh shell.

<pre><code  class="language-js">mongosh
</code></pre>

If successful, you'll see the MongoDB shell prompt, where you can run commands like db.version() to check the database version. Type exit to leave the shell.

----------

## Security Best Practices
Out of the box, MongoDB might be accessible to anyone on your VPS. For a production environment, you must implement security measures:

Enable Authentication: Create administrative users and enable authentication in mongodb.conf.

Bind to Localhost: By default, MongoDB usually binds to 127.0.0.1 (localhost). If you need it accessible from other servers, bind it to a specific private IP and configure a firewall. Never expose MongoDB directly to the public internet without proper authentication and network restrictions.

Firewall (UFW): Configure ufw to allow access only on specific ports and from specific IP addresses.

----------

## Visual Guide: Watch the Installation
Sometimes, seeing is believing! Here's a helpful video that walks through the MongoDB installation process on Ubuntu:


<div class="grid place-items-center my-5 w-full lg:h-100 h-78.75">
   <a class="w-full lg:h-100 h-78.75 my-3 block"
     href="https://www.youtube.com/watch?v=PCj4ItAcdCQ"
     data-fancybox
     data-width="100%"
     data-height="100%"
   >
   <img
      src="https://i.ytimg.com/vi_webp/PCj4ItAcdCQ/hqdefault.webp"
      class="size-full m-0! p-0 object-cover"
      alt="Video poster"
      width="240"
      height="180"
   />
</a>
</div>

Conclusion
You've successfully installed MongoDB on your Ubuntu VPS! You now have a powerful NoSQL database ready to power your applications. Remember to always prioritize security, especially when deploying databases in a production environment.