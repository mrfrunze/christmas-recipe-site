# Quick Guide: Creating Pull Request to dev branch

## Your Situation
- ✅ You have a fork of the repository
- ✅ Your project is in the `main` branch of your fork
- ❌ You DON'T have a `dev` branch in your fork
- ✅ The original repository has a `dev` branch

## Simple Steps

### Step 1: Create dev branch from your main

1. Open GitHub Desktop
2. Make sure you're on the `main` branch (check the branch name at the top)
3. Go to **Branch → New branch** (or press `Ctrl+Shift+N`)
4. Name: `dev`
5. Create branch based on: `main`
6. Click **Create branch**
7. You should now be on the `dev` branch (check the top - it should say "dev")

### Step 2: Publish the dev branch

1. Make sure you're on the `dev` branch
2. Click **Publish branch** (top right, next to the branch name)
3. Wait for it to finish uploading

### Step 3: Create Pull Request

**Option A: Through GitHub Desktop**
1. After publishing, you'll see a "Create Pull Request" button
2. Click it - it will open your browser

**Option B: Through GitHub website**
1. Go to **Repository → View on GitHub**
2. You'll see a yellow banner saying "dev had recent pushes"
3. Click **Compare & pull request**

### Step 4: Configure the Pull Request

**IMPORTANT:** Make sure these settings are correct:
- **Base repository**: `ufyhlexi/christmas-recipe-site`
- **Base branch**: `dev` ⬅️ **This is important!** Must be `dev`, NOT `main`
- **Compare**: `mrfrunze/christmas-recipe-site` → `dev`

### Step 5: Submit the Pull Request

1. Add a title and description
2. Click **Create pull request**
3. Done! The owner will review and merge it into their `dev` branch

## Visual Flow

```
Your Fork (mrfrunze/christmas-recipe-site)
├── main (your project is here)
└── dev (created from main, contains your project)
    └── Pull Request → Original (ufyhlexi/christmas-recipe-site)
                      └── dev (target branch)
```

## Important Notes

- ✅ Creating `dev` from `main` copies all your files automatically
- ✅ You don't need to copy files manually
- ✅ Make sure the PR goes to `dev`, not `main`
- ✅ After the owner merges your PR into their `dev`, they will merge `dev` → `main` themselves

## Troubleshooting

**Problem: I don't see "Create Pull Request" button**
- Make sure the branch is published
- Try refreshing GitHub Desktop
- Go to GitHub website and create PR manually

**Problem: I can't select `dev` as base branch**
- Make sure the original repository has a `dev` branch
- Check: https://github.com/ufyhlexi/christmas-recipe-site/branches

**Problem: I'm on the wrong branch**
- Check the branch name at the top of GitHub Desktop
- Switch to `dev` branch: **Branch → Switch to another branch → dev**

