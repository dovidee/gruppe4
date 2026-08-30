import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const member = defineType({
  name: 'member',
  title: 'Medlem',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      validation: (r) => r.required(),
      description: 'Styrer rekkefølgen på forsiden. 1 til 6.',
    }),
    defineField({
      name: 'role',
      title: 'Rolle i gruppa',
      type: 'string',
      validation: (r) => r.required(),
      description: 'En ekte rolle, f.eks. «Design og UX». Ikke «Gruppemedlem».',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrett',
      type: 'image',
      options: {hotspot: true},
      description: 'Stående bilde, 4:5 eller smalere. Minst 1200px på korteste side.',
      fields: [
        defineField({name: 'alt', title: 'Alt-tekst', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
      validation: (r) => r.required(),
      description: 'Fire til seks setninger. Nevn noe som faktisk har skjedd: en jobb, et verv, en bug.',
    }),
    defineField({
      name: 'skills',
      title: 'Kan',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'learning',
      title: 'Vil lære',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
    defineField({name: 'github', title: 'GitHub', type: 'url'}),
    defineField({name: 'email', title: 'E-post', type: 'string'}),
  ],
  orderings: [
    {title: 'Rekkefølge', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'portrait'},
  },
})
