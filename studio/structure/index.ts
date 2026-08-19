import {CogIcon} from '@sanity/icons/Cog'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'home', 'about', 'forCompanies']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Forside')
        .icon(HomeIcon)
        .child(S.document().schemaType('home').documentId('home')),

      S.listItem()
        .title('Om oss')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('about').documentId('about')),

      S.listItem()
        .title('For bedrifter')
        .icon(EarthGlobeIcon)
        .child(S.document().schemaType('forCompanies').documentId('forCompanies')),

      S.listItem()
        .title('Nettstedinnstillinger')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
