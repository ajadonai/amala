import { defineField, defineType } from 'sanity';

export const forumTagSchema = defineType({
  name: 'forumTag',
  title: 'Forum Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'color',
      title: 'Color (CSS)',
      type: 'string',
      description: 'A CSS color value, e.g. #722F37 or rgb(122,158,126). Used for the dot and pill.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first in the filter bar.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
      color: 'color',
    },
    prepare({ title, order, color }) {
      return {
        title: title,
        subtitle: `Order: ${order ?? '—'} · ${color}`,
      };
    },
  },
});
