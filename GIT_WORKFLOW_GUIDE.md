# Git Workflow Guide

A complete guide to the basic Git workflow for cloning, making changes, and pushing to a repository.

## Table of Contents
- [Quick Reference](#quick-reference)
- [Step-by-Step Workflow](#step-by-step-workflow)
- [Detailed Explanations](#detailed-explanations)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Quick Reference

```bash
# 1. Clone the repository
git clone [repo-url]

# 2. Navigate to the repository
cd repo-name

# 3. Make your changes (edit files, create new files, etc.)

# 4. Stage all changes
git add .

# 5. Commit with a descriptive message
git commit -m "Your message"

# 6. Push to remote repository
git push
```

---

## Step-by-Step Workflow

### Step 1: Clone the Repository

Clone an existing repository from a remote source (GitHub, GitLab, Bitbucket, etc.):

```bash
git clone https://github.com/username/repository.git
```

Or with SSH:
```bash
git clone git@github.com:username/repository.git
```

**What this does:** Downloads a complete copy of the repository, including all files, commit history, and branches.

### Step 2: Navigate to the Repository

```bash
cd repository
```

Replace `repository` with the actual name of the cloned directory.

### Step 3: Make Changes

Now you can work on your project:

- **Create new files:** `touch newfile.txt`
- **Edit existing files:** Use your favorite text editor
- **Delete files:** `rm oldfile.txt`
- **Create directories:** `mkdir new-directory`

Example:
```bash
# Create a new file
echo "Hello, World!" > hello.txt

# Edit a file (example with nano)
nano README.md

# Create a directory and file
mkdir src
touch src/main.js
```

### Step 4: Stage Your Changes

Stage all changes (new, modified, and deleted files):

```bash
git add .
```

**Alternative options:**
- Stage specific file: `git add filename.txt`
- Stage multiple files: `git add file1.txt file2.txt`
- Stage all files in a directory: `git add directory/`
- Stage all modified files (not new files): `git add -u`

**Check what will be staged:**
```bash
git status
```

### Step 5: Commit Your Changes

Create a commit with a descriptive message:

```bash
git commit -m "Add new feature for user authentication"
```

**Good commit message examples:**
- `git commit -m "Fix bug in login validation"`
- `git commit -m "Add user profile page"`
- `git commit -m "Update dependencies to latest versions"`
- `git commit -m "Refactor database connection logic"`

**Multi-line commit messages:**
```bash
git commit -m "Add user authentication" -m "- Implement login functionality
- Add password hashing
- Create user session management"
```

### Step 6: Push to Remote

Push your commits to the remote repository:

```bash
git push
```

**First push on a new branch:**
```bash
git push -u origin branch-name
```

**Push to a specific branch:**
```bash
git push origin main
```

---

## Detailed Explanations

### Understanding `git add .`

The `git add .` command stages all changes in the current directory and subdirectories:

- **New files** → Staged for commit
- **Modified files** → Staged for commit  
- **Deleted files** → Staged for commit

**Note:** Files listed in `.gitignore` are NOT staged.

### Understanding `git commit`

A commit creates a snapshot of your staged changes with:
- A unique identifier (SHA hash)
- Author information
- Timestamp
- Commit message

### Understanding `git push`

Push uploads your local commits to the remote repository, making them available to others.

---

## Best Practices

### 1. **Write Clear Commit Messages**

✅ Good:
```
Add user registration form
Fix memory leak in image processor
Update API documentation
```

❌ Bad:
```
fixed stuff
changes
asdfasdf
```

### 2. **Commit Often, Push Regularly**

- Commit logical units of work
- Don't wait too long to push (risk losing work)
- Push at least at the end of your work session

### 3. **Check Status Before Committing**

```bash
git status          # See what's changed
git diff            # See exact changes
git diff --staged   # See staged changes
```

### 4. **Review Before Staging**

```bash
# See what you're about to add
git status

# See detailed changes
git diff

# Then stage
git add .
```

### 5. **Pull Before Push**

If working with others, always pull first:
```bash
git pull
git push
```

---

## Common Scenarios

### Starting Fresh with an Existing Project

```bash
# Clone the repository
git clone https://github.com/username/project.git

# Enter the directory
cd project

# Create a new branch for your work
git checkout -b feature/my-new-feature

# Make changes
echo "New feature" > feature.txt

# Stage, commit, and push
git add .
git commit -m "Add new feature"
git push -u origin feature/my-new-feature
```

### Daily Development Workflow

```bash
# Start your day - pull latest changes
git pull

# Make your changes
# ... edit files ...

# Check what changed
git status
git diff

# Stage and commit
git add .
git commit -m "Implement feature X"

# Push to remote
git push

# Repeat as needed
```

### Fixing a Mistake Before Pushing

```bash
# Made a bad commit? Undo it (keeps changes)
git reset HEAD~1

# Fix your changes
# ... edit files ...

# Stage and commit again
git add .
git commit -m "Corrected commit message"
git push
```

### Working on Multiple Features

```bash
# Create a branch for feature A
git checkout -b feature-a
# ... work on feature A ...
git add .
git commit -m "Complete feature A"
git push -u origin feature-a

# Switch back to main branch
git checkout main

# Create a branch for feature B
git checkout -b feature-b
# ... work on feature B ...
git add .
git commit -m "Complete feature B"
git push -u origin feature-b
```

---

## Troubleshooting

### Problem: "fatal: not a git repository"

**Solution:** You're not in a Git repository. Clone one or initialize:
```bash
git init
```

### Problem: "Updates were rejected because the remote contains work..."

**Solution:** Pull changes first, then push:
```bash
git pull --rebase
git push
```

### Problem: "You have unstaged changes"

**Solution:** Either stage them or stash them:
```bash
# Stage and commit
git add .
git commit -m "Save changes"

# Or temporarily stash
git stash
# ... do other work ...
git stash pop
```

### Problem: "Permission denied (publickey)"

**Solution:** 
- Set up SSH keys for your Git hosting service
- Or use HTTPS URL instead of SSH

### Problem: "fatal: refusing to merge unrelated histories"

**Solution:** 
```bash
git pull --allow-unrelated-histories
```

### Problem: Committed to wrong branch

**Solution:**
```bash
# On wrong branch
git log  # Note the commit hash

# Switch to correct branch
git checkout correct-branch

# Cherry-pick the commit
git cherry-pick <commit-hash>

# Go back and remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

---

## Additional Resources

- **Check commit history:** `git log`
- **See recent commits:** `git log --oneline -10`
- **View file changes:** `git diff filename`
- **Undo staged changes:** `git reset HEAD filename`
- **Discard local changes:** `git checkout -- filename`

For more advanced Git topics, see:
- [Git Setup Guide](GIT_SETUP_GUIDE.md) - Setting up remote repositories
- [Official Git Documentation](https://git-scm.com/doc)

---

## Summary

The basic workflow is simple:

1. **Clone** → Get the repository
2. **Change** → Make your edits
3. **Add** → Stage your changes
4. **Commit** → Save your changes locally
5. **Push** → Share your changes with others

Practice this workflow, and it will become second nature! 🚀
