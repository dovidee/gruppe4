import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {portableTextBody} from './objects/portableTextBody'

export const home = defineType({
  name: 'home',
  title: 'Forside',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Gruppebilde',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
      fields: [
        defineField({name: 'alt', title: 'Alt-tekst', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({name: 'heroCaption', title: 'Bildetekst', type: 'string'}),
    defineField({
      name: 'eyebrow',
      title: 'Overlinje',
      type: 'string',
      description: 'F.eks. «Gruppe 4, IS-310, Universitetet i Agder»',
    }),
    defineField({
      name: 'headline',
      title: 'Overskrift',
      type: 'string',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'subline',
      title: 'Ingress',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Hovedknapp',
      type: 'object',
      fields: [
        defineField({name: 'label', type: 'string'}),
        defineField({name: 'href', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Sekundærknapp',
      type: 'object',
      fields: [
        defineField({name: 'label', type: 'string'}),
        defineField({name: 'href', type: 'string'}),
      ],
    }),
    defineField({name: 'introEyebrow', title: 'Overlinje (om gruppa)', type: 'string'}),
    defineField({name: 'introHeading', title: 'Overskrift (om gruppa)', type: 'string'}),
    defineField({
      name: 'introBody',
      title: 'Om gruppa',
      type: 'array',
      of: portableTextBody,
    }),
    defineField({
      name: 'introVideo',
      title: 'Video (om gruppa)',
      type: 'file',
      description: 'Vises under navnene. MP4 (H.264 + AAC) spilles av i alle nettlesere.',
      options: {accept: 'video/mp4,video/webm'},
      fields: [
        defineField({
          name: 'title',
          title: 'Tittel',
          type: 'string',
          description: 'Leses opp av skjermlesere.',
        }),
        defineField({
          name: 'poster',
          title: 'Forsidebilde',
          type: 'image',
          description: 'Bildet som vises til videoen startes.',
        }),
        defineField({
          name: 'captions',
          title: 'Undertekster',
          type: 'file',
          description: 'Valgfri WebVTT-fil (.vtt).',
          options: {accept: '.vtt,text/vtt'},
        }),
      ],
    }),
    defineField({name: 'membersHeading', title: 'Overskrift (medlemmer)', type: 'string'}),
    defineField({name: 'membersLede', title: 'Ingress (medlemmer)', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: 'Forside', subtitle: title}
    },
  },
})
