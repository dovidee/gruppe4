import {CaseIcon} from '@sanity/icons/Case'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export const project = defineType({
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({name: 'order', title: 'Rekkefølge', type: 'number'}),
    defineField({
      name: 'personal',
      title: 'Personlig prosjekt',
      type: 'boolean',
      initialValue: false,
      description:
        'Slå på for prosjekter et medlem har laget på egen hånd. De vises under medlemmet på forsiden.',
    }),
    defineField({
      name: 'meta',
      title: 'Metalinje',
      type: 'string',
      description: 'F.eks. «IS-202» eller «4. semester, ASP.NET Core»',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Data', value: 'data'},
          {title: 'Sikkerhet', value: 'sikkerhet'},
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'cover',
      title: 'Skjermbilde',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt-tekst', type: 'string'})],
    }),
    defineField({
      name: 'summary',
      title: 'Kort beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Én setning, skrevet for noen som ikke tok faget.',
    }),
    defineField({name: 'summaryEn', title: 'Kort beskrivelse, engelsk', type: 'text', rows: 2}),
    defineField({
      name: 'stack',
      title: 'Teknologi',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'contributors',
      title: 'Laget av',
      type: 'array',
      description:
        'Én rad per medlem, med lenke til sin egen versjon av koden. Flere grupper som har laget samme oppgave samles i ett prosjekt.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contributor',
          fields: [
            defineField({
              name: 'member',
              title: 'Medlem',
              type: 'reference',
              to: [{type: 'member'}],
              validation: (r) => r.required(),
            }),
            defineField({name: 'githubUrl', title: 'GitHub-lenke', type: 'url'}),
          ],
          preview: {
            select: {title: 'member.name', subtitle: 'githubUrl', media: 'member.portrait'},
          },
        }),
      ],
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub-lenke (gammel)',
      type: 'url',
      description: 'Brukes bare når «Laget av» er tom.',
    }),
    defineField({
      name: 'authors',
      title: 'Laget av, ren tekst (gammel)',
      type: 'string',
      description: 'Brukes bare når «Laget av» er tom.',
    }),
    defineField({
      name: 'roleNote',
      title: 'Merknad om gruppe',
      type: 'text',
      rows: 2,
      description: 'Brukes når prosjektet er fra en annen gruppe enn bachelorgruppa.',
    }),
    defineField({name: 'roleNoteEn', title: 'Merknad om gruppe, engelsk', type: 'text', rows: 2}),
    defineField({
      name: 'sections',
      title: 'Avsnitt',
      type: 'array',
      description:
        'Foreslått rekkefølge: Problemet, Det vi bygde, Testing, Sikkerhet, Hva vi ville gjort annerledes.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectSection',
          fields: [
            defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
            defineField({name: 'headingEn', title: 'Overskrift, engelsk', type: 'string'}),
            defineField({name: 'body', title: 'Innhold', type: 'array', of: portableTextBody}),
            defineField({name: 'bodyEn', title: 'Innhold, engelsk', type: 'array', of: portableTextBody}),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
  ],
  orderings: [
    {title: 'Rekkefølge', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary', media: 'cover'},
  },
})
