# How to Host Your Portfolio

You have two excellent choices for free, high-performance hosting: **Netlify** or **Vercel**. Both are very easy to use with your GitHub repository.

## Option 0: The Quickest Method (Drag & Drop - No Git Required)

Since I have already run the build command for you, you can deploy immediately without installing anything:

1.  **Locate the `dist` folder**: Go to `c:\Users\vijay\OneDrive\Desktop\portfolio\dist` in your File Explorer.
2.  **Go to Netlify**: Log in to [Netlify.com](https://www.netlify.com/).
3.  **Drag & Drop**: In the "Sites" tab, you will see a box saying "Drag your folder here". Drag your `dist` folder into that box.
4.  **Configure Env Vars**: Once deployed, go to **Site Settings** > **Environment Variables** and add your Supabase keys (see below).

## Option 1: Using Git (Recommended for Updates)

### How to Install Git on Windows
1.  **Download**: Visit [git-scm.com/download/win](https://git-scm.com/download/win) and click "Click here to download".
2.  **Install**: Run the downloaded `.exe` file.
    *   Keep clicking "Next" (Defaults are fine).
    *   Make sure "Git Bash Here" is checked.
3.  **Verify**: Open a new Command Prompt (cmd) or PowerShell and type `git --version`. If it shows a version number, you are good to go!

### Connect to GitHub
Once Git is installed:
1.  Open your terminal in the project folder.
2.  Run these commands:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3.  Go to [GitHub.com](https://github.com/new) and create a new repository (name it `portfolio`).
4.  Copy the commands shown under "…or push an existing repository from the command line" and paste them into your terminal.
    *   Example: `git remote add origin https://github.com/YOUR_USER/portfolio.git`
    *   Example: `git push -u origin main`

### Troubleshooting: "Git is not recognized" (How to Add to PATH)

If you installed Git but your terminal says `git : The term 'git' is not recognized`, you need to add it to your System PATH manually:

1.  **Find the Git path**: It is usually `C:\Program Files\Git\cmd`. (Double check this folder exists).
2.  **Open Environment Variables**:
    *   Press `Windows Key` + `R`.
    *   Type `sysdm.cpl` and hit Enter.
    *   Go to the **"Advanced"** tab -> Click **"Environment Variables..."**.
3.  **Edit Path**:
    *   Under "System variables" (bottom box), find the variable named **`Path`** and select it.
    *   Click **"Edit..."**.
    *   Click **"New"** and paste: `C:\Program Files\Git\cmd`
    *   Click **"New"** again and paste: `C:\Program Files\Git\bin` (Optional but good).
    *   Click **OK** on all boxes.
4.  **Restart Terminal**: Close **ALL** terminal windows (VS Code, PowerShell, etc.) and re-open them for the change to take effect.
5.  **Test**: Type `git --version` again.

## Option 2: Netlify (Automatic Deployment)

1.  Go to [Netlify.com](https://www.netlify.com/) and sign up/login.
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Choose **GitHub**.
4.  Authorize Netlify to access your GitHub repositories.
5.  Select your portfolio repository.
6.  **Configure Build Settings** (Netlify usually detects these automatically):
    *   **Build Command**: `npm run build`
    *   **Publish directory**: `dist`
7.  **Environment Variables** (Crucial Step):
    *   Click on **"Advanced"** or **"Show advanced"**.
    *   Add a new variable: `VITE_SUPABASE_URL` -> (Paste your URL from `.env`)
    *   Add another variable: `VITE_SUPABASE_ANON_KEY` -> (Paste your Key from `.env`)
8.  Click **"Deploy site"**.

## Option 2: Vercel (Recommended for performance)

1.  Go to [Vercel.com](https://vercel.com/) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import from **GitHub**.
4.  Find your repository and click **"Import"**.
5.  **Configure Project**:
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Root Directory**: `./`
6.  **Environment Variables**:
    *   Expand the **"Environment Variables"** section.
    *   Key: `VITE_SUPABASE_URL`, Value: (Paste your URL) -> Click Add.
    *   Key: `VITE_SUPABASE_ANON_KEY`, Value: (Paste your Key) -> Click Add.
7.  Click **"Deploy"**.

## Post-Deployment Checks

1.  **Visit your new URL** (e.g., `https://your-site.netlify.app`).
2.  **Verify Data**: Check if your Projects and Skills are loading (this confirms Supabase connection).
3.  **Test Admin**: Try logging into `/admin` (Redirects might need configuration).

### Fixing Single Page App Routing (Important!)
If you refresh a page (like `/admin`) and get a 404 error, you need a redirect rule.

**For Netlify**:
Create a file named `_redirects` in your `public` folder with this content:
```
/*  /index.html  200
```

**For Vercel**:
It usually handles this automatically with the Vite preset, but if not, create a `vercel.json` file in root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
idk how to use git