import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galleribilde',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternativ tekst',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orientation',
      title: 'Orientering',
      type: 'string',
      options: {
        list: [
          {title: 'Horisontal', value: 'horizontal'},
          {title: 'Vertikal', value: 'vertical'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {media: 'image', subtitle: 'orientation'},
    prepare({media, subtitle}) {
      return {title: 'Galleribilde', subtitle, media}
    },
  },
})
