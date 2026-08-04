import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'member',
  title: 'Member Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. President, Secretary, Treasurer',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'A brief bio of the member.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers will be displayed first (e.g. 1 for President, 2 for Vice President).',
      initialValue: 10,
    }),
    defineField({
      name: 'active',
      title: 'Active Officer',
      type: 'boolean',
      description: 'Uncheck to hide past officers from the listing without deleting them.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      active: 'active',
    },
    prepare(selection) {
      const { title, subtitle, media, active } = selection;
      return {
        title: title,
        subtitle: `${subtitle} (${active ? 'Active' : 'Inactive'})`,
        media: media,
      };
    },
  },
});
