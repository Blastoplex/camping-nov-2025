#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

// Configuration
const dataDir = './data';
const templatesDir = './templates';
const outputDir = './dist';

// Ensure output directory exists
fs.ensureDirSync(outputDir);

// Read the layout template
const layoutTemplate = fs.readFileSync(path.join(templatesDir, 'layout.html'), 'utf8');

// Function to render markdown file to HTML
function renderMarkdownFile(filePath, outputPath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = fm(content);
  const html = marked(parsed.body);
  
  const title = parsed.attributes.title || path.basename(filePath, '.md');
  const fileName = path.basename(filePath);
  const editUrl = `https://github.com/Blastoplex/camping-nov-2025/edit/main/data/${fileName}`;
  
  const editButton = `<div class="edit-section">
            <a href="${editUrl}" class="edit-btn" target="_blank">📝 Edit on GitHub</a>
        </div>`;
  
  const finalHtml = layoutTemplate
    .replace('{{title}}', title)
    .replace('{{content}}', html)
    .replace('{{nav}}', generateNavigation())
    .replace('{{editButton}}', editButton);
  
  fs.writeFileSync(outputPath, finalHtml);
  console.log(`Generated: ${outputPath}`);
}

// Generate navigation menu
function generateNavigation() {
  const dataFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.md'));
  const navItems = dataFiles.map(file => {
    const name = path.basename(file, '.md');
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    return `<a href="${name}.html">${displayName}</a>`;
  });
  return navItems.join(' | ');
}

// Build all markdown files
console.log('Building camping site...');

// Create index page
const indexContent = `---
title: Camping November 2025
---

# 🏕️ Camping November 2025

Welcome to our epic camping trip planning site! Use the navigation above to explore different sections.

## Quick Links

- [Schedule](schedule.html) - Who's coming when
- [Meals](meals.html) - Food planning
- [Shopping](shopping.html) - What to buy
- [Packing](packing.html) - What to bring
- [Activities](activities.html) - Fun stuff to do

Have an awesome trip everyone! 🔥🌲🎣
`;

fs.writeFileSync(path.join(dataDir, 'index.md'), indexContent);

// Function to render index page (without edit button)
function renderIndexPage(filePath, outputPath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = fm(content);
  const html = marked(parsed.body);
  
  const title = parsed.attributes.title || path.basename(filePath, '.md');
  
  const finalHtml = layoutTemplate
    .replace('{{title}}', title)
    .replace('{{content}}', html)
    .replace('{{nav}}', generateNavigation())
    .replace('{{editButton}}', '');
  
  fs.writeFileSync(outputPath, finalHtml);
  console.log(`Generated: ${outputPath}`);
}

// Process all markdown files in data directory
const dataFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('.md'));
dataFiles.forEach(file => {
  const inputPath = path.join(dataDir, file);
  const outputPath = path.join(outputDir, file.replace('.md', '.html'));
  
  if (file === 'index.md') {
    renderIndexPage(inputPath, outputPath);
  } else {
    renderMarkdownFile(inputPath, outputPath);
  }
});

// Clean up temporary index file
fs.unlinkSync(path.join(dataDir, 'index.md'));

console.log('🎉 Site built successfully!');
console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
console.log('🚀 Ready for deployment to GitHub Pages!');