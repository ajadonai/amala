import { defineField, defineType } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'surveyUrl',
      title: 'Google Form / Survey URL',
      type: 'url',
      description: 'The Google Form embed URL for the survey page.',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url',
    }),
    defineField({
      name: 'scholarUrl',
      title: 'Google Scholar URL',
      type: 'url',
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume / CV (PDF)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
