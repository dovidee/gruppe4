import {defineArrayMember, defineField} from 'sanity'

export const portableTextBody = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'H2', value: 'h2'},
      {title: 'H3', value: 'h3'},
      {title: 'H4', value: 'h4'},
      {title: 'Sitat', value: 'blockquote'},
    ],
    lists: [
      {title: 'Punktliste', value: 'bullet'},
      {title: 'Nummerert liste', value: 'number'},
    ],
    marks: {
      decorators: [
        {title: 'Fet', value: 'strong'},
        {title: 'Kursiv', value: 'em'},
        {title: 'Kode', value: 'code'},
      ],
      annotations: [
        defineField({
          name: 'link',
          title: 'Lenke',
          type: 'object',
          icon: () => '🔗',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto']}),
            }),
          ],
        }),
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternativ tekst',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
  }),
  defineArrayMember({
    type: 'object',
    name: 'codeBlock',
    title: 'Kodeblokk',
    fields: [
      defineField({name: 'code', title: 'Kode', type: 'text', rows: 6}),
      defineField({name: 'language', title: 'Språk', type: 'string', initialValue: 'text'}),
    ],
    preview: {
      select: {subtitle: 'language'},
      prepare({subtitle}) {
        return {title: 'Kodeblokk', subtitle}
      },
    },
  }),
]
