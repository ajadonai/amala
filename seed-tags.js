#!/usr/bin/env node
/**
 * One-time seed script: creates the default forum tags in Sanity.
 * Run from the project root:
 *   node seed-tags.js
 * 
 * Safe to re-run — skips tags that already exist.
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fcpnq2ps',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const TAGS = [
  { name: 'Salary',    color: '#722F37', order: 1 },
  { name: 'AI Tools',  color: '#8B5E83', order: 2 },
  { name: 'Strategy',  color: '#7A9E7E', order: 3 },
  { name: 'Global',    color: '#7BA3C4', order: 4 },
  { name: 'Support',   color: '#D4846A', order: 5 },
  { name: 'Research',  color: '#C49A6C', order: 6 },
];

async function seed() {
  console.log('Seeding forum tags...\n');

  for (const tag of TAGS) {
    const existing = await client.fetch(
      '*[_type == "forumTag" && name == $name][0]',
      { name: tag.name }
    );

    if (existing) {
      console.log(`  ✓ "${tag.name}" already exists — skipped`);
      continue;
    }

    await client.create({ _type: 'forumTag', ...tag });
    console.log(`  + Created "${tag.name}" (${tag.color})`);
  }

  console.log('\nDone! Tags are now in Sanity Studio under "Forum Tags".');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
