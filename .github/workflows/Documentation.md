This workflow `jekyll-gh-pages.yml` is a GitHub Actions automation. It builds your Jekyll site and pushes  
the generated static HTML into GitHub Pages. Here’s a breakdown of how each part works and how paths matter:

## Trigger
```yaml
on:
  push:
    branches: ["Home"]
  workflow_dispatch:
```
- Runs when you push to the branch `Home`.  
- You can also trigger it manually from the **Actions** tab. If your default  
branch is `main` or `master`, you must change `Home` to that.

## Permissions
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
- Needed so Actions can:
  - Read repo code.
  - Write to the GitHub Pages deployment space.
  - Authenticate the deployment.
 
## Concurrency
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```
- Ensures only one deployment job runs at a time.
- Prevents race conditions when pushing multiple commits quickly.

<br>

## Jobs
The workflow has two jobs: `build` and `deploy`.

1. **Build Job**
```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v4
```
- Pulls your repository code onto the runner.
```yaml
    - name: Setup Pages
      uses: actions/configure-pages@v5
```
- Prepares GitHub Pages settings (like environment and permissions).
```yaml
    - name: Build with Jekyll
      uses: actions/jekyll-build-pages@v1
      with:
        source: ./ 
        destination: ./_site
```
- Runs Jekyll.
- `source: ./` → looks at the repository root for `_config.yml` and site files.
- `destination: ./_site` → Jekyll outputs HTML files into `_site/`.
> This is where **paths** matter:
> - "Jekyll takes Markdown, HTML, layouts, and assets from your repo."
> - "It transforms them into static HTML files."
> - "Output always ends up in `_site/` (or wherever you set `destination`)."
```yaml
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
```
- Packages `_site/` as a temporary build artifact.
- This artifact is handed off to the deploy job.
---
2. **Deploy Job**
```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
  steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```
- Waits for `build` to finish (`needs: build`).
- Downloads the `_site/` artifact.
- Publishes it to GitHub Pages.
- The `page_url` is automatically generated, typically:
  - `https://<username>.github.io/<repo>/` (project site)
  - or `https://<custom-domain>/` if you configured a domain.
---
### How paths work in Jekyll
- **Input paths (source):**  
Controlled by `_config.yml`. By default Jekyll uses repo root. You can change:
```yaml
source: docs
destination: public_site
```
Then set the same in workflow:
```yaml
with:
  source: ./docs
  destination: ./public_site
```
- **Output paths (destination):**
Jekyll dumps the built static site into `_site/` by default. GitHub Pages only serves that folder.
- **URL paths:**
In_config.yml`, you control how links work:
```yaml
url: "https://justkaarlo.com"
baseurl: ""   # use "" for root domain, or "/repo-name" for project pages
```
Then in templates:
```yaml
<a href="{{ site.baseurl }}/about/">About</a>
```
This ensures links work whether you’re hosting under `/repo/` or root.

---

### Summary
- Workflow checks out code → builds Jekyll into `_site/` → uploads `_site/` → deploys to Pages.
- The only folder GitHub Pages serves is the Jekyll destination folder.
- Paths in Jekyll come from two places:
  **1.** `source` and `destination` (build-time input/output).
  **2.** `url` and `baseurl` in `_config.yml` (runtime URL paths).
