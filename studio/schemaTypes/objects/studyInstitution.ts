import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

export const studyInstitution = defineType({
  name: 'studyInstitution',
  title: 'Utdanningsinstitusjon',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'description'},
  },
})
