import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Forside',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Sidetittel',
      type: 'string',
      description: 'Brukes som tittel i nettleserfanen og ved deling. Vises ikke på siden.',
      validation: (r) => r.required().max(60),
    }),
    defineField({name: 'headlineEn', title: 'Sidetittel, engelsk', type: 'string'}),
    defineField({
      name: 'subline',
      title: 'Beskrivelse',
      type: 'text',
      rows: 2,
      description: 'Beskrivelse for søkemotorer og deling. Vises ikke på siden.',
      validation: (r) => r.max(160),
    }),
    defineField({name: 'sublineEn', title: 'Beskrivelse, engelsk', type: 'text', rows: 2}),
    defineField({
      name: 'introVideo',
      title: 'Video',
      type: 'file',
      description:
        'Vises øverst på forsiden. MP4 (H.264 + AAC) spilles av i alle nettlesere.',
      options: {accept: 'video/mp4,video/webm'},
      fields: [
        defineField({
          name: 'title',
          title: 'Tittel',
          type: 'string',
          description: 'Leses opp av skjermlesere.',
        }),
        defineField({name: 'titleEn', title: 'Tittel, engelsk', type: 'string'}),
        defineField({
          name: 'poster',
          title: 'Forsidebilde',
          type: 'image',
          description: 'Bildet som vises til videoen startes. Uten dette brukes gruppebildet.',
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
    defineField({
      name: 'heroImage',
      title: 'Gruppebilde',
      type: 'image',
      options: {hotspot: true},
      description: 'Brukes som forsidebilde for videoen når videoen ikke har et eget.',
      fields: [
        defineField({name: 'alt', title: 'Alt-tekst', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({
      name: 'partnersLead',
      title: 'Innledning (samarbeidspartnere)',
      type: 'string',
      description: 'Kort tekst over navnene, f.eks. «I samarbeid med».',
    }),
    defineField({name: 'partnersLeadEn', title: 'Innledning (samarbeidspartnere), engelsk', type: 'string'}),
    defineField({
      name: 'partners',
      title: 'Samarbeidspartnere',
      type: 'array',
      description: 'Bare navn, ikke logoer. Navnene bytter plass hvert fjerde sekund.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partner',
          fields: [
            defineField({name: 'name', title: 'Navn', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'nameEn', title: 'Navn, engelsk', type: 'string'}),
          ],
          preview: {select: {title: 'name'}},
        }),
      ],
    }),
    defineField({name: 'membersHeading', title: 'Overskrift (medlemmer)', type: 'string'}),
    defineField({name: 'membersHeadingEn', title: 'Overskrift (medlemmer), engelsk', type: 'string'}),
    defineField({name: 'membersLede', title: 'Ingress (medlemmer)', type: 'text', rows: 2}),
    defineField({name: 'membersLedeEn', title: 'Ingress (medlemmer), engelsk', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: 'Forside', subtitle: title}
    },
  },
})
