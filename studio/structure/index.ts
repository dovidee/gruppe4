import {CogIcon} from '@sanity/icons/Cog'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Nettstedinnstillinger')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
