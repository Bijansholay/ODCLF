import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Optional end date and time of the event.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Room 402, Zoom, Faculty Lounge',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A detailed description of the event.',
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Optional cover image or flyer for the event.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Optional external registration link (e.g. Eventbrite, Google Forms).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      start: 'startDate',
      location: 'location',
      media: 'image',
    },
    prepare(selection) {
      const { title, start, location, media } = selection;
      const formattedDate = start ? new Date(start).toLocaleDateString() : 'No Date';
      return {
        title: title,
        subtitle: `${formattedDate} - ${location}`,
        media: media,
      };
    },
  },
});
