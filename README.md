# Know-Ta! Panel Presentation

A scroll-driven, interactive deck for a thesis panel at a university presenting Chapters 1 and 2 of "Know-Ta!: A Two-Branch Deep Learning Framework for AI-Generated Music Detection".

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

To build the project for production:

```bash
npm run build
```

## GitHub Pages Deployment

This project includes a GitHub Actions workflow to automatically deploy to GitHub Pages on every push to the `main` branch. 

### One-Time Setup
For the automatic deployment to work, you must configure your repository settings:
1. Go to your repository **Settings** on GitHub.
2. Select **Pages** from the left sidebar.
3. Under the **Build and deployment** section, set the **Source** dropdown to **GitHub Actions**.

The workflow will automatically set the correct base path and generate a `404.html` so direct links continue to work.
