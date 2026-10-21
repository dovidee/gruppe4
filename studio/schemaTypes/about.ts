import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export const about = defineType({
  name: 'about',
  title: 'Om oss',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({name: 'headingEn', title: 'Overskrift, engelsk', type: 'string'}),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      description:
        'Gå dypere enn forsiden: hvordan gruppa jobber, hvordan den tar beslutninger, ambisjonsnivå, hva slags selskap den vil bli.',
      of: portableTextBody,
      validation: (r) => r.required(),
    }),
    defineField({name: 'bodyEn', title: 'Innhold, engelsk', type: 'array', of: portableTextBody}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: 'Om oss', subtitle: title}
    },
  },
})
