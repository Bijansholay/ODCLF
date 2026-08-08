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
      description: 'e.g. Coordinator, Secretary, Treasurer',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Member Category',
      type: 'string',
      options: {
        list: [
          { title: 'National Coordinator', value: 'coordinator' },
          { title: 'Interim Coordinating (EXCO) Officer', value: 'exco' },
          { title: 'Distinguished Member', value: 'distinguished' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'distinguished'
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
      name: 'emails',
      title: 'Email Addresses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Contact email addresses of the member.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number of the member.',
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
