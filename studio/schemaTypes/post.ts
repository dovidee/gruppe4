import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export const post = defineType({
  name: 'post',
  title: 'Blogginnlegg',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Undertittel', type: 'string'}),
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
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternativ tekst', type: 'string', validation: (r) => r.required()})],
    }),
    defineField({name: 'tag', title: 'Tagg', type: 'string'}),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [defineArrayMember({type: 'teamMember'})],
    }),
    defineField({name: 'link', title: 'Ekstern lenke', type: 'url'}),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: portableTextBody,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'summary', media: 'image'},
  },
})
