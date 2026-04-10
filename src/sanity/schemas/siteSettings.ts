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
    defineField({
      name: 'surveyResponses',
      title: 'Survey Responses Count',
      type: 'string',
      description: 'Displayed on homepage and survey page (e.g. "500+").',
      initialValue: '500+',
    }),
    defineField({
      name: 'surveyCountries',
      title: 'Survey Countries Count',
      type: 'string',
      description: 'Number of countries represented (e.g. "5").',
      initialValue: '5',
    }),
    defineField({
      name: 'surveyCompletion',
      title: 'Survey Completion Rate',
      type: 'string',
      description: 'Completion percentage (e.g. "92%").',
      initialValue: '92%',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
