import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Sosial lenke',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      description: 'Once UI-ikonnøkkel, f.eks. github, linkedin, instagram, threads, email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto']}),
    }),
    defineField({
      name: 'essential',
      title: 'Vis på Om oss-siden',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'link'},
  },
})
