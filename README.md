# Camping November 2025

A static site generator for our epic camping trip! 🏕️

## Overview

This project converts markdown files containing camping data into a beautiful static website that deploys to GitHub Pages.

## Setup

```bash
npm install
```

## Development

```bash
npm run build    # Build the site
npm run serve    # Serve locally for testing
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the main branch via GitHub Actions.

## Data Files

- `data/schedule.md` - Who's attending on which dates
- `data/meals.md` - Meal planning and food assignments
- `data/shopping.md` - Shopping checklist
- `data/packing.md` - Packing lists
- `data/activities.md` - Planned activities

## Built With

- Node.js for the static site generator
- Markdown for data files
- GitHub Pages for hosting
- GitHub Actions for CI/CD