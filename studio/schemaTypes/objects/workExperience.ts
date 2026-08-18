import {CaseIcon} from '@sanity/icons/Case'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Arbeidserfaring',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'company',
      title: 'Bedrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Tidsrom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'achievements',
      title: 'Resultater',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [defineArrayMember({type: 'ratioImage'})],
    }),
  ],
  preview: {
    select: {title: 'company', subtitle: 'role'},
  },
})
