import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const ratioImage = defineType({
  name: 'ratioImage',
  title: 'Bilde med sideforhold',
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
      name: 'width',
      title: 'Bredde (forhold)',
      type: 'number',
      initialValue: 16,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'height',
      title: 'Høyde (forhold)',
      type: 'number',
      initialValue: 9,
      validation: (rule) => rule.required().positive(),
    }),
  ],
  preview: {
    select: {media: 'image', width: 'width', height: 'height'},
    prepare({media, width, height}) {
      return {title: `${width}:${height}`, media}
    },
  },
})
