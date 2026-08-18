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
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({name: 'summary', title: 'Sammendrag', type: 'text', rows: 3}),
    defineField({
      name: 'images',
      title: 'Bilder (karusell)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alternativ tekst', type: 'string', validation: (r) => r.required()})],
        }),
      ],
    }),
    defineField({name: 'tag', title: 'Tagg', type: 'string'}),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [defineArrayMember({type: 'teamMember'})],
    }),
    defineField({name: 'link', title: 'Live lenke / repo', type: 'url'}),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: portableTextBody,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary', media: 'images.0'},
  },
})
