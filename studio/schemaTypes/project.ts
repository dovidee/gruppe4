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
      name: 'meta',
      title: 'Metalinje',
      type: 'string',
      description: 'F.eks. «4. semester, ASP.NET Core, 247 commits»',
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
    defineField({
      name: 'stack',
      title: 'Teknologi',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'githubUrl', title: 'GitHub-lenke', type: 'url'}),
    defineField({
      name: 'roleNote',
      title: 'Merknad om gruppe',
      type: 'text',
      rows: 2,
      description: 'Brukes når prosjektet er fra en annen gruppe enn bachelorgruppa.',
    }),
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
            defineField({name: 'body', title: 'Innhold', type: 'array', of: portableTextBody}),
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
