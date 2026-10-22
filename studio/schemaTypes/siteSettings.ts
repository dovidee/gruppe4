import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Innstillinger',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'groupName',
      title: 'Gruppenavn',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'responsePromise',
      title: 'Slagord (bunntekst)',
      type: 'string',
      description: 'Vises til høyre i bunnteksten.',
    }),
    defineField({
      name: 'responsePromiseEn',
      title: 'Slagord (bunntekst), engelsk',
      type: 'string',
    }),
    defineField({
      name: 'nav',
      title: 'Meny',
      type: 'array',
      description: 'Rekkefølgen her styrer menyen. Standard: Hjem, Prosjekter, Blogg, Om oss.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', title: 'Tekst', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'labelEn', title: 'Tekst, engelsk', type: 'string'}),
            defineField({name: 'href', title: 'Lenke', type: 'string', validation: (r) => r.required()}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Innstillinger'}
    },
  },
})
