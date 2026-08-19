import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export const post = defineType({
  name: 'post',
  title: 'Blogginnlegg',
  type: 'document',
  icon: DocumentTextIcon,
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
    defineField({name: 'tag', title: 'Tagg', type: 'string'}),
    defineField({
      name: 'excerpt',
      title: 'Utdrag',
      type: 'text',
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt-tekst', type: 'string'})],
    }),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: portableTextBody,
    }),
  ],
  orderings: [
    {title: 'Publiseringsdato, nyest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'excerpt', media: 'cover'},
  },
})
