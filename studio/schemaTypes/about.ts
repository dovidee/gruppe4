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
      name: 'eyebrow',
      title: 'Overlinje',
      type: 'string',
      description: 'F.eks. «Gruppe 4, IS-310, Universitetet i Agder»',
    }),
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Innhold',
      type: 'array',
      description:
        'Gå dypere enn forsiden: hvordan gruppa jobber, hvordan den tar beslutninger, ambisjonsnivå, hva slags selskap den vil bli.',
      of: portableTextBody,
      validation: (r) => r.required(),
    }),
    defineField({name: 'membersHeading', title: 'Overskrift (medlemmer)', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: 'Om oss', subtitle: title}
    },
  },
})
