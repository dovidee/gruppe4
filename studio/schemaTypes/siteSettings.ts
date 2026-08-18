import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nettstedinnstillinger',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'object',
      fields: [
        defineField({name: 'firstName', title: 'Fornavn', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'lastName', title: 'Etternavn', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'name', title: 'Visningsnavn', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'role', title: 'Rolle', type: 'string', validation: (r) => r.required()}),
        defineField({
          name: 'avatar',
          title: 'Avatar',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternativ tekst', type: 'string', validation: (r) => r.required()})],
          validation: (r) => r.required(),
        }),
        defineField({name: 'email', title: 'E-post', type: 'string', validation: (r) => r.required().email()}),
        defineField({
          name: 'location',
          title: 'Tidssone',
          type: 'string',
          description: "IANA-tidssone, f.eks. 'Europe/Oslo'",
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'languages',
          title: 'Språk',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          options: {layout: 'tags'},
        }),
        defineField({
          name: 'locale',
          title: 'Locale',
          type: 'string',
          description: "BCP 47-språkkode, f.eks. 'no' eller 'en'",
          initialValue: 'no',
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'social',
      title: 'Sosiale lenker',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),

    defineField({
      name: 'newsletter',
      title: 'Nyhetsbrev',
      type: 'object',
      fields: [
        defineField({name: 'display', title: 'Vis seksjon', type: 'boolean', initialValue: true}),
        defineField({name: 'title', title: 'Tittel', type: 'string'}),
        defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 2}),
      ],
    }),

    defineField({
      name: 'home',
      title: 'Forside',
      type: 'object',
      fields: [
        defineField({name: 'headline', title: 'Overskrift', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'subline', title: 'Undertekst', type: 'text', rows: 2}),
        defineField({name: 'featuredDisplay', title: 'Vis fremhevet badge', type: 'boolean', initialValue: false}),
        defineField({
          name: 'featuredTitle',
          title: 'Fremhevet badge-tekst',
          type: 'string',
          hidden: ({parent}) => !parent?.featuredDisplay,
        }),
        defineField({
          name: 'featuredHref',
          title: 'Fremhevet badge-lenke',
          type: 'string',
          hidden: ({parent}) => !parent?.featuredDisplay,
        }),
        defineField({name: 'title', title: 'SEO-tittel', type: 'string'}),
        defineField({name: 'description', title: 'SEO-beskrivelse', type: 'text', rows: 2}),
        defineField({
          name: 'image',
          title: 'OG-bilde',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'Om oss',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'SEO-tittel', type: 'string'}),
        defineField({name: 'description', title: 'SEO-beskrivelse', type: 'text', rows: 2}),
        defineField({name: 'tocDisplay', title: 'Vis innholdsfortegnelse', type: 'boolean', initialValue: true}),
        defineField({name: 'tocSubItems', title: 'Vis underpunkter i innholdsfortegnelse', type: 'boolean', initialValue: false}),
        defineField({name: 'avatarDisplay', title: 'Vis avatar', type: 'boolean', initialValue: true}),
        defineField({name: 'calendarDisplay', title: 'Vis "Book møte"', type: 'boolean', initialValue: false}),
        defineField({
          name: 'calendarLink',
          title: 'Kalenderlenke',
          type: 'url',
          hidden: ({parent}) => !parent?.calendarDisplay,
        }),
        defineField({
          name: 'intro',
          title: 'Introduksjon',
          type: 'object',
          fields: [
            defineField({name: 'display', title: 'Vis seksjon', type: 'boolean', initialValue: true}),
            defineField({name: 'title', title: 'Tittel', type: 'string', initialValue: 'Introduksjon'}),
            defineField({name: 'description', title: 'Beskrivelse', type: 'array', of: [defineArrayMember({type: 'block'})]}),
          ],
        }),
        defineField({
          name: 'work',
          title: 'Arbeidserfaring',
          type: 'object',
          fields: [
            defineField({name: 'display', title: 'Vis seksjon', type: 'boolean', initialValue: true}),
            defineField({name: 'title', title: 'Tittel', type: 'string', initialValue: 'Arbeidserfaring'}),
            defineField({
              name: 'experiences',
              title: 'Erfaringer',
              type: 'array',
              of: [defineArrayMember({type: 'workExperience'})],
            }),
          ],
        }),
        defineField({
          name: 'studies',
          title: 'Utdanning',
          type: 'object',
          fields: [
            defineField({name: 'display', title: 'Vis seksjon', type: 'boolean', initialValue: true}),
            defineField({name: 'title', title: 'Tittel', type: 'string', initialValue: 'Utdanning'}),
            defineField({
              name: 'institutions',
              title: 'Institusjoner',
              type: 'array',
              of: [defineArrayMember({type: 'studyInstitution'})],
            }),
          ],
        }),
        defineField({
          name: 'technical',
          title: 'Tekniske ferdigheter',
          type: 'object',
          fields: [
            defineField({name: 'display', title: 'Vis seksjon', type: 'boolean', initialValue: true}),
            defineField({name: 'title', title: 'Tittel', type: 'string', initialValue: 'Tekniske ferdigheter'}),
            defineField({
              name: 'skills',
              title: 'Ferdigheter',
              type: 'array',
              of: [defineArrayMember({type: 'technicalSkill'})],
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'blog',
      title: 'Blogg (side-metadata)',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Tittel', type: 'string'}),
        defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 2}),
      ],
    }),

    defineField({
      name: 'work',
      title: 'Prosjekter (side-metadata)',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Tittel', type: 'string'}),
        defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 2}),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galleri',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Tittel', type: 'string'}),
        defineField({name: 'description', title: 'Beskrivelse', type: 'text', rows: 2}),
        defineField({
          name: 'images',
          title: 'Bilder',
          type: 'array',
          of: [defineArrayMember({type: 'galleryImage'})],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Nettstedinnstillinger'}
    },
  },
})
