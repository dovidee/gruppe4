import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const forCompanies = defineType({
  name: 'forCompanies',
  title: 'For bedrifter',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Overlinje', type: 'string'}),
    defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
    defineField({name: 'lede', title: 'Ingress', type: 'text', rows: 2}),
    defineField({
      name: 'columns',
      title: 'Kolonner',
      type: 'array',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          fields: [
            defineField({name: 'title', title: 'Tittel', type: 'string'}),
            defineField({
              name: 'bullets',
              title: 'Punkter',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({name: 'ctaLabel', title: 'Knappetekst', type: 'string'}),
  ],
  preview: {
    prepare() {
      return {title: 'For bedrifter'}
    },
  },
})
