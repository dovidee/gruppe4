import {TagIcon} from '@sanity/icons/Tag'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const technicalSkill = defineType({
  name: 'technicalSkill',
  title: 'Teknisk ferdighet',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tags',
      title: 'Tagger',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'technicalSkillTag',
          fields: [
            defineField({name: 'name', title: 'Navn', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'icon',
              title: 'Ikon',
              type: 'string',
              description: 'Once UI-ikonnøkkel, f.eks. figma, javascript, nextjs',
            }),
          ],
          preview: {select: {title: 'name'}},
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [defineArrayMember({type: 'ratioImage'})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
