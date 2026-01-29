# Git Setup Guide

## Adding a Remote Repository

To connect your local Git repository to a remote repository (like GitHub, GitLab, or Bitbucket), you need to add a remote origin.

### Command Syntax

```bash
git remote add origin [repo-url]
```

### Examples

#### GitHub Repository
```bash
git remote add origin https://github.com/username/repository.git
```

#### GitLab Repository
```bash
git remote add origin https://gitlab.com/username/repository.git
```

#### Bitbucket Repository
```bash
git remote add origin https://bitbucket.org/username/repository.git
```

#### SSH URL (Recommended for frequent pushes)
```bash
git remote add origin git@github.com:username/repository.git
```

### Verify Remote Configuration

After adding the remote, verify it was added correctly:

```bash
git remote -v
```

Expected output:
```
origin  [repo-url] (fetch)
origin  [repo-url] (push)
```

### Common Next Steps

1. **Push your code to the remote repository:**
   ```bash
   git push -u origin main
   ```
   or
   ```bash
   git push -u origin master
   ```

2. **If the remote already exists, you can update it:**
   ```bash
   git remote set-url origin [new-repo-url]
   ```

3. **To remove a remote:**
   ```bash
   git remote remove origin
   ```

### Troubleshooting

- **Error: remote origin already exists**
  - Either remove the existing remote: `git remote remove origin`
  - Or update it: `git remote set-url origin [new-repo-url]`

- **Error: Permission denied (publickey)**
  - Make sure you've added your SSH key to your Git hosting service
  - Or use HTTPS URL instead of SSH

### Current Repository Remote

This repository already has a remote origin configured:
```bash
origin  https://github.com/4usayan-cloud/gh-repo-clone-4usayan-cloud-https-github.com-USER-REPO.git-
```
