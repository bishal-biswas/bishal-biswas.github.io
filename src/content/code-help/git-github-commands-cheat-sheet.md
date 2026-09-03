---
title: Git & GitHub Commands Cheat Sheet
slug: git-github-commands-cheat-sheet
metaDescription: I created a portfolio-ready Markdown cheat sheet covering
  Git/GitHub commands for the VS Code terminal, PowerShell, CMD, macOS Terminal,
  and Linux.
featuredImage: git-cheat-sheet.webp
publishDate: 2026-09-03
isDraft: false
tags:
  - Git
  - Github
---
# Git & GitHub Commands Cheat Sheet

A practical cheat sheet for the most commonly used **Git and GitHub commands**. These commands can be used from the **VS Code integrated terminal**, Windows PowerShell, Command Prompt, macOS Terminal, or Linux Terminal.

> **Note:** Git commands work locally. Commands such as `git push` and `git pull` interact with a remote repository such as GitHub.

---

## 1. Check Git Installation

| Purpose | Description | Command |
|---|---|---|
| Check Git version | Verifies that Git is installed and shows the installed version. | `git --version` |
| Show Git help | Opens general Git help. | `git help` |
| Show help for a command | Displays help for a specific Git command. | `git help <command>` |

Example:

```bash
git --version
git help commit
```

---

## 2. Configure Git

These commands are normally run once on a new computer.

| Purpose | Description | Command |
|---|---|---|
| Set username | Sets the name attached to your Git commits. | `git config --global user.name "Your Name"` |
| Set email | Sets the email attached to your Git commits. | `git config --global user.email "you@example.com"` |
| View configuration | Displays Git configuration values. | `git config --list` |
| View global configuration | Displays global Git configuration. | `git config --global --list` |
| Change default branch | Sets the default initial branch name to `main`. | `git config --global init.defaultBranch main` |

Example:

```bash
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

---

## 3. Create or Clone a Repository

| Purpose | Description | Command |
|---|---|---|
| Initialize repository | Converts the current folder into a Git repository. | `git init` |
| Clone repository | Downloads an existing remote repository to your computer. | `git clone <repository-url>` |
| Clone into a specific folder | Clones the repository into the specified directory. | `git clone <repository-url> <folder-name>` |

Example:

```bash
git init
git clone https://github.com/username/repository.git
```

---

## 4. Check Repository Status

| Purpose | Description | Command |
|---|---|---|
| Check status | Shows modified, staged, and untracked files. | `git status` |
| Short status | Shows a compact version of repository status. | `git status --short` |
| Show remote repositories | Displays configured remote repositories. | `git remote -v` |

Example:

```bash
git status
git remote -v
```

---

## 5. Add Files to Staging

| Purpose | Description | Command |
|---|---|---|
| Stage one file | Adds a specific file to the staging area. | `git add <file>` |
| Stage multiple files | Adds multiple specific files. | `git add <file1> <file2>` |
| Stage all changes | Stages new, modified, and deleted files in the current directory. | `git add .` |
| Stage all repository changes | Stages changes throughout the repository. | `git add -A` |
| Unstage a file | Removes a file from staging without deleting it. | `git restore --staged <file>` |

Example:

```bash
git add index.html
git add .
git restore --staged index.html
```

---

## 6. Commit Changes

| Purpose | Description | Command |
|---|---|---|
| Create a commit | Saves staged changes to the local Git history. | `git commit -m "Commit message"` |
| Commit with a message | Creates a commit with a descriptive message. | `git commit -m "Add login feature"` |
| Commit all tracked changes | Stages modified/deleted tracked files and commits them. New untracked files are not included. | `git commit -am "Update files"` |
| Amend last commit | Changes the most recent commit. | `git commit --amend` |
| Amend commit message | Replaces the most recent commit message. | `git commit --amend -m "New message"` |

Example:

```bash
git add .
git commit -m "Add user authentication"
```

---

## 7. View Commit History

| Purpose | Description | Command |
|---|---|---|
| View history | Shows commit history. | `git log` |
| Compact history | Shows one-line summaries of commits. | `git log --oneline` |
| Show recent commits | Shows the latest commits in compact form. | `git log --oneline -10` |
| Show graph | Displays branches and commits as a graph. | `git log --oneline --graph --all` |
| Show commit details | Displays information about a specific commit. | `git show <commit-id>` |

Useful command:

```bash
git log --oneline --graph --all
```

---

## 8. Branch Commands

| Purpose | Description | Command |
|---|---|---|
| List branches | Shows local branches. | `git branch` |
| List all branches | Shows local and remote branches. | `git branch -a` |
| Create branch | Creates a new branch. | `git branch <branch-name>` |
| Switch branch | Switches to an existing branch. | `git switch <branch-name>` |
| Create and switch | Creates a branch and switches to it. | `git switch -c <branch-name>` |
| Delete branch | Deletes a local branch after it has been merged. | `git branch -d <branch-name>` |
| Force delete branch | Deletes a local branch even if it has not been merged. | `git branch -D <branch-name>` |
| Rename current branch | Renames the currently checked-out branch. | `git branch -m <new-name>` |

Example:

```bash
git switch -c feature/login
```

---

## 9. Push Changes to GitHub

| Purpose | Description | Command |
|---|---|---|
| Push branch | Uploads local commits to the remote repository. | `git push origin <branch-name>` |
| Push current branch | Pushes the current branch to its configured upstream branch. | `git push` |
| First push | Pushes a branch and sets its upstream remote branch. | `git push -u origin <branch-name>` |
| Push all branches | Pushes all local branches to the remote. | `git push --all` |
| Delete remote branch | Deletes a branch from the remote repository. | `git push origin --delete <branch-name>` |
| Push tags | Uploads tags to the remote repository. | `git push --tags` |

Typical first push:

```bash
git push -u origin main
```

---

## 10. Pull Changes from GitHub

| Purpose | Description | Command |
|---|---|---|
| Pull changes | Downloads remote changes and integrates them into the current branch. | `git pull` |
| Pull from branch | Pulls changes from a specific remote branch. | `git pull origin <branch-name>` |
| Fetch changes | Downloads remote changes without modifying your current branch. | `git fetch` |
| Fetch all remotes | Downloads changes from all configured remotes. | `git fetch --all` |

Difference:

```text
git fetch  → Download remote changes
git pull   → Fetch + integrate remote changes
```

---

## 11. Remote Repository Commands

| Purpose | Description | Command |
|---|---|---|
| Add remote | Connects the local repository to a remote repository. | `git remote add origin <repository-url>` |
| View remotes | Displays remote repository URLs. | `git remote -v` |
| Change remote URL | Changes the URL of an existing remote. | `git remote set-url origin <repository-url>` |
| Remove remote | Removes a configured remote. | `git remote remove origin` |
| Rename remote | Renames an existing remote. | `git remote rename <old-name> <new-name>` |

Example:

```bash
git remote add origin https://github.com/username/repository.git
```

---

## 12. Merge Branches

| Purpose | Description | Command |
|---|---|---|
| Merge branch | Merges another branch into the current branch. | `git merge <branch-name>` |
| Abort merge | Cancels an ongoing merge. | `git merge --abort` |
| Continue merge | Continues after resolving merge conflicts. | `git merge --continue` |

Example:

```bash
git switch main
git merge feature/login
```

---

## 13. Rebase

| Purpose | Description | Command |
|---|---|---|
| Rebase branch | Replays your commits on top of another branch. | `git rebase <branch-name>` |
| Abort rebase | Cancels an ongoing rebase. | `git rebase --abort` |
| Continue rebase | Continues a rebase after resolving conflicts. | `git rebase --continue` |
| Interactive rebase | Lets you edit, reorder, combine, or remove recent commits. | `git rebase -i HEAD~<number>` |

Example:

```bash
git rebase main
```

> **Warning:** Avoid rebasing commits that have already been shared if other people depend on those commits.

---

## 14. Undo Changes

| Purpose | Description | Command |
|---|---|---|
| Discard changes in a file | Restores a file to its last committed/staged state. | `git restore <file>` |
| Unstage file | Removes a file from staging. | `git restore --staged <file>` |
| Restore file from a commit | Restores a file to the version from a specific commit. | `git restore --source=<commit-id> <file>` |
| Revert commit | Creates a new commit that reverses an existing commit. | `git revert <commit-id>` |
| Reset to previous commit | Moves HEAD and optionally changes the staging/working tree. | `git reset <commit-id>` |
| Soft reset | Moves HEAD but keeps changes staged. | `git reset --soft <commit-id>` |
| Mixed reset | Moves HEAD and unstages changes while keeping files. | `git reset --mixed <commit-id>` |
| Hard reset | Moves HEAD and discards tracked working-tree changes. | `git reset --hard <commit-id>` |

### Reset vs Revert

```text
git reset  → Rewrites local history
git revert → Creates a new commit that undoes an earlier commit
```

Be especially careful with:

```bash
git reset --hard
```

---

## 15. Stash Changes

Git stash temporarily stores uncommitted changes so you can switch branches or work on something else.

| Purpose | Description | Command |
|---|---|---|
| Stash changes | Temporarily saves current changes. | `git stash` |
| Stash with message | Saves changes with a descriptive message. | `git stash push -m "message"` |
| List stashes | Shows all saved stashes. | `git stash list` |
| Apply stash | Restores a stash but keeps it in the stash list. | `git stash apply` |
| Apply specific stash | Restores a specific stash. | `git stash apply stash@{0}` |
| Pop stash | Restores the latest stash and removes it from the stash list. | `git stash pop` |
| Delete stash | Deletes a specific stash. | `git stash drop stash@{0}` |
| Clear stashes | Deletes all stashes. | `git stash clear` |

Example:

```bash
git stash push -m "Work in progress"
git switch main
git stash pop
```

---

## 16. Compare Changes

| Purpose | Description | Command |
|---|---|---|
| Show working changes | Shows changes that are not staged. | `git diff` |
| Show staged changes | Shows changes that are staged for commit. | `git diff --staged` |
| Compare branches | Shows differences between two branches. | `git diff <branch1>..<branch2>` |
| Compare commits | Shows differences between two commits. | `git diff <commit1>..<commit2>` |

Example:

```bash
git diff
git diff --staged
git diff main..feature/login
```

---

## 17. Git Tags

Tags are commonly used to mark releases or important versions.

| Purpose | Description | Command |
|---|---|---|
| List tags | Shows existing tags. | `git tag` |
| Create tag | Creates a lightweight tag. | `git tag <tag-name>` |
| Create annotated tag | Creates a tag with a message and metadata. | `git tag -a <tag-name> -m "message"` |
| Show tag | Displays information about a tag. | `git show <tag-name>` |
| Delete local tag | Deletes a local tag. | `git tag -d <tag-name>` |
| Push tag | Uploads a tag to GitHub. | `git push origin <tag-name>` |
| Delete remote tag | Deletes a tag from the remote repository. | `git push origin --delete <tag-name>` |

Example:

```bash
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0
```

---

## 18. GitHub CLI (`gh`)

If GitHub CLI is installed, you can manage many GitHub features directly from the terminal.

| Purpose | Description | Command |
|---|---|---|
| Check GitHub CLI | Shows the installed GitHub CLI version. | `gh --version` |
| Login to GitHub | Authenticates the GitHub CLI. | `gh auth login` |
| Check authentication | Shows the current authentication status. | `gh auth status` |
| Clone repository | Clones a GitHub repository. | `gh repo clone <owner>/<repo>` |
| Create repository | Creates a new GitHub repository. | `gh repo create` |
| View repository | Displays repository information. | `gh repo view` |
| Open repository | Opens the repository in your browser. | `gh repo view --web` |
| List issues | Lists repository issues. | `gh issue list` |
| Create issue | Creates a GitHub issue. | `gh issue create` |
| List pull requests | Lists pull requests. | `gh pr list` |
| Create pull request | Creates a pull request. | `gh pr create` |
| View pull request | Displays pull request details. | `gh pr view <number>` |
| Checkout pull request | Checks out a pull request locally. | `gh pr checkout <number>` |
| Merge pull request | Merges a pull request. | `gh pr merge <number>` |

Example:

```bash
gh auth login
gh repo view --web
gh pr list
```

---

## 19. GitHub Pull Request Workflow

A common workflow for contributing changes is:

```bash
git switch main
git pull

git switch -c feature/my-feature

# Make your changes

git status
git add .
git commit -m "Add my feature"

git push -u origin feature/my-feature
```

Then create a Pull Request on GitHub.

With GitHub CLI:

```bash
gh pr create
```

---

## 20. Common Git Workflow

For everyday development:

```bash
# Get the latest code
git pull

# Create a feature branch
git switch -c feature/my-feature

# Check changes
git status

# Stage changes
git add .

# Commit changes
git commit -m "Add my feature"

# Push branch
git push -u origin feature/my-feature
```

---

## 21. Quick Fixes for Common Problems

### Check which branch you are on

```bash
git branch --show-current
```

### See what changed

```bash
git status
git diff
```

### See recent commits

```bash
git log --oneline -10
```

### Accidentally staged a file

```bash
git restore --staged <file>
```

### Accidentally changed a file and want to discard it

```bash
git restore <file>
```

### Temporarily save unfinished work

```bash
git stash
```

### Restore stashed work

```bash
git stash pop
```

### Update your local branch

```bash
git pull
```

### See remote URL

```bash
git remote -v
```

### Create a new branch

```bash
git switch -c feature/new-feature
```

### Push a new branch

```bash
git push -u origin feature/new-feature
```

---

## 22. Useful Git Aliases

Aliases allow you to create shorter Git commands.

| Purpose | Command |
|---|---|
| Create `co` for checkout/switch | `git config --global alias.co switch` |
| Create `br` for branch | `git config --global alias.br branch` |
| Create `ci` for commit | `git config --global alias.ci commit` |
| Create `st` for status | `git config --global alias.st status` |
| Create a compact log | `git config --global alias.lg "log --oneline --graph --all"` |

After creating the aliases:

```bash
git st
git br
git lg
```

---

# Most Frequently Used Commands

If you only want to remember the commands you use every day, start with these:

```bash
# Check status
git status

# Get latest changes
git pull

# Create a branch
git switch -c feature/my-feature

# Switch branch
git switch main

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes
git push

# Push a new branch
git push -u origin feature/my-feature

# View branches
git branch -a

# View commit history
git log --oneline

# Temporarily save changes
git stash

# Restore stash
git stash pop

# View remote repository
git remote -v
```

---

# Typical Git → GitHub Workflow

```text
Create / Clone Repository
          ↓
       git pull
          ↓
   Create Feature Branch
          ↓
   Make Code Changes
          ↓
      git status
          ↓
       git add .
          ↓
  git commit -m "message"
          ↓
      git push
          ↓
   GitHub Pull Request
          ↓
       Code Review
          ↓
        Merge
```

---

## Git Command Cheat Sheet at a Glance

| Category | Most Useful Commands |
|---|---|
| Setup | `git config` |
| Create repository | `git init` |
| Clone | `git clone` |
| Status | `git status` |
| Stage | `git add` |
| Commit | `git commit` |
| History | `git log` |
| Branch | `git branch`, `git switch` |
| Merge | `git merge` |
| Rebase | `git rebase` |
| Download changes | `git fetch`, `git pull` |
| Upload changes | `git push` |
| Remote | `git remote` |
| Undo | `git restore`, `git revert`, `git reset` |
| Temporary work | `git stash` |
| Compare | `git diff` |
| Releases | `git tag` |
| GitHub CLI | `gh` |
