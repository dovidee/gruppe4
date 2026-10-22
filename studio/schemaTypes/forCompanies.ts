import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const forCompanies = defineType({
  name: 'forCompanies',
  title: 'For bedrifter',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
    defineField({name: 'headingEn', title: 'Overskrift, engelsk', type: 'string'}),
    defineField({
      name: 'columns',
      title: 'Kolonner',
      type: 'array',
      description:
        'Hver kolonne blir et eget panel med egen knapp. Knappene får grønn, lilla og gul farge i den rekkefølgen.',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          fields: [
            defineField({name: 'title', title: 'Tittel', type: 'string'}),
            defineField({name: 'titleEn', title: 'Tittel, engelsk', type: 'string'}),
            defineField({
              name: 'bullets',
              title: 'Punkter',
              type: 'array',
              description: 'Første punkt blir undertittel, resten brødtekst.',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({
              name: 'bulletsEn',
              title: 'Punkter, engelsk',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({name: 'ctaLabel', title: 'Knappetekst', type: 'string'}),
            defineField({name: 'ctaLabelEn', title: 'Knappetekst, engelsk', type: 'string'}),
            defineField({
              name: 'ctaHref',
              title: 'Knappelenke',
              type: 'string',
              description: 'F.eks. /prosjekter, /blogg eller /om-oss#kontakt',
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'For bedrifter'}
    },
  },
})
