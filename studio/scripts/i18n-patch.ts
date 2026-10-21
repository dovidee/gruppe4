/**
 * Fills in the English fields and the new homepage headings in one transaction.
 * It only sets the fields listed below; everything else in each document is left
 * as it is.
 *
 * Dry run (prints the patches, writes nothing):
 *   npx sanity exec scripts/i18n-patch.ts --with-user-token
 * Write to the dataset:
 *   npx sanity exec scripts/i18n-patch.ts --with-user-token -- --commit
 */
import {getCliClient} from 'sanity/cli'

type Fields = Record<string, unknown>

const client = getCliClient({apiVersion: '2025-01-01'})
const commit = process.argv.includes('--commit')

// Plain paragraphs become Portable Text blocks; a leading "**" marks a bold line.
function blocks(prefix: string, paragraphs: string[]) {
  return paragraphs.map((text, i) => {
    const bold = text.startsWith('**')
    return {
      _type: 'block',
      _key: `${prefix}${i}`,
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `${prefix}${i}s`,
          text: bold ? text.slice(2) : text,
          marks: bold ? ['strong'] : [],
        },
      ],
    }
  })
}

const patches: Record<string, Fields> = {
  siteSettings: {
    responsePromise: 'Hver detalj, vurdert to ganger.',
    responsePromiseEn: 'Every detail, questioned twice.',
    'nav[_key=="nav1"].labelEn': 'Home',
    'nav[_key=="nav2"].labelEn': 'Projects',
    'nav[_key=="nav3"].labelEn': 'Blog',
    'nav[_key=="nav4"].labelEn': 'About us',
  },

  home: {
    headlineEn: 'resonansIT',
    'introVideo.titleEn': 'Video',
    partnersLead: 'I samarbeid med',
    partnersLeadEn: 'In partnership with',
    partners: [
      {_key: 'uia', _type: 'partner', name: 'Universitetet i Agder', nameEn: 'University of Agder'},
      {_key: 'sor-tre', _type: 'partner', name: 'Sør-Tre'},
    ],
    membersHeading: 'Fem ulike styrker. Ett felles prosjekt.',
    membersHeadingEn: 'Five different strengths. One shared project.',
    membersLede: 'Vi utfordrer hverandres ideer, så prosjektet aldri går i blinde.',
    membersLedeEn: "We challenge each other's ideas, so the project never moves forward blindly.",
  },

  forCompanies: {
    headingEn: 'Do you have a challenge we can solve together?',
    'columns[_key=="c1"].titleEn': 'Academic expertise',
    'columns[_key=="c1"].bulletsEn': [
      'IT and information systems',
      'Through our bachelor programme at the University of Agder we have built broad expertise in IT, systems development, information systems and project work.',
    ],
    'columns[_key=="c1"].ctaLabel': 'Se prosjekter',
    'columns[_key=="c1"].ctaLabelEn': 'See projects',
    'columns[_key=="c1"].ctaHref': '/prosjekter',
    'columns[_key=="c2"].titleEn': 'New perspectives',
    'columns[_key=="c2"].bulletsEn': [
      'Fresh eyes on existing challenges',
      'As students we bring new perspectives, creative ideas and up-to-date knowledge. We are motivated to put theory into practice and find solutions to real problems.',
    ],
    'columns[_key=="c2"].ctaLabel': 'Les bloggen vår',
    'columns[_key=="c2"].ctaLabelEn': 'Read our blog',
    'columns[_key=="c2"].ctaHref': '/blogg',
    'columns[_key=="c3"].titleEn': 'Collaboration',
    'columns[_key=="c3"].bulletsEn': [
      'A flexible partner',
      'We want close dialogue with our partners throughout the project. Together we can explore problems, develop solutions and create value for both sides.',
    ],
    'columns[_key=="c3"].ctaLabel': 'Ta kontakt!',
    'columns[_key=="c3"].ctaLabelEn': 'Get in touch!',
    'columns[_key=="c3"].ctaHref': '/om-oss#kontakt',
  },

  // The Norwegian tagline is left empty on purpose: the site falls back to the
  // first sentence of the bio until someone writes one in the Studio.
  'member-1': {
    roleEn: 'Product owner',
    taglineEn:
      'I am 23, born and raised in Kristiansand, with more than four years at Coop stores and plenty of customer service behind me.',
  },
  'member-2': {
    roleEn: 'Frontend developer',
    taglineEn: 'I am Benjamin Stedal, a student of IT and information systems at UiA.',
  },
  'member-3': {
    roleEn: 'UX / UI designer',
    taglineEn: 'I am 22 and studying for a bachelor in IT and information systems.',
  },
  'member-4': {
    roleEn: 'Security Champion',
    taglineEn: 'I am 23, from Lithuania, and grew up in Forsand.',
  },
  'member-5': {
    roleEn: 'Project manager',
    taglineEn: 'I am 21 and lived in Kragerø, Telemark, for 18 years.',
  },

  'project-kartverket': {
    summaryEn:
      'Reporting and updating aviation obstacles for pilots and case handlers at the Norwegian Mapping Authority. Map data is available offline.',
  },
  'caeb0e58-a31d-494e-9b95-4097aa6aacce': {
    summaryEn:
      'Reporting and updating aviation obstacles for pilots and case handlers at the Norwegian Mapping Authority.',
  },
  '807a9417-e476-4c5c-b8ac-1a071934093d': {
    summaryEn:
      'Reporting and updating aviation obstacles for pilots and case handlers at the Norwegian Mapping Authority.',
  },

  about: {
    headingEn: 'About bachelor group 4',
    bodyEn: blocks('en', [
      'Welcome to resonansIT!',
      'We are six students who recently came together as a group. As students on the bachelor programme in IT and information systems at the University of Agder, we bring different academic perspectives, experience and skills that we want to develop together. Through our studies we have built solid expertise, both individually and as a group. Although the group is new, we have already found a good working dynamic where we make use of each other\'s strengths, experience and perspectives. This gives us a good foundation for continuing to deliver good results while we keep growing, both professionally and as a group.',
      'We put weight on a working environment built on openness, trust and inclusion, where everyone can contribute their abilities, thoughts and ideas. We see our differences as a strength and want to use them to complement each other and find good solutions to the challenges we meet. As we keep working together, we want to build on what we have already learned and continue to develop as an effective and close-knit group.',
    ]),
  },

  '75e6e0f4-10b9-4f6c-983c-951c0b9aa03d': {
    titleEn: 'A Friday follow-up meeting',
    excerptEn: 'Project assigned, a session with former bachelor students, and design thinking.',
    bodyEn: blocks('en', [
      '**Tuesday, 2026-09-01',
      '**IS-310, Project execution',
      'We were given a wish list of projects that each student ranked from 1 to 10 (first to last choice). To avoid groupthink and bias, we used Scrum poker, an estimation technique for sizing tasks through a blind vote. It was very interesting to see how the members ranked their lists, because it gave us valuable insight into how we handle prioritisation.',
      'While the group stood united against some rankings that ended up at the bottom, others split us completely into two camps with either very high or very low placements. After adding up the total score for each block, the group showed a strong, shared core effort on first and second place, except for one member who ranked second place low.',
      'A dilemma came up while summing the results: one project had the most top placements but was automatically disqualified because a single member put it at the very bottom. Since we had agreed that the minority should also be heard, that rule took effect.',
      'In the end we were assigned a knowledge base in partnership with Sør-Tre! With a wide range of hardware, paint, equipment and much more, the group will try to take load off customer service and internal departments. It will be exciting and certainly demanding, since we have to think across many different customer needs!',
      '**Friday, 2026-09-11',
      '**IS-310, Project execution',
      '**15:00-16:00',
      'The group joined a follow-up meeting after a session where four former students talked about their experiences from their bachelor project. They had different perspectives on how they handled the panic about what a student should do in their last two semesters. We often think students fall into three groups: those who want to work, those who want to keep studying, and those who want to do something other than IT.',
      'But as the former students pointed out, many probably feel unsure or torn between two of the options. Some got offers early in the process by being a good group, while others had to work harder to show they could pull it off.',
      'The most important lesson from the session was not to send applications to every company at random. A company might not seem that exciting at first, but as we learn more about them and they learn about us, the process gets better. Ruling out ideas that do not seem exciting can be a dead end; an insight the group will take with us and reflect on.',
      'At the follow-up meeting itself we learned more about each other, including strengths and weaknesses when working together, priorities, expectations and the group\'s goals. Even though Benjamin was not there, we got him on Discord and he worked alongside us!',
      'Here we agreed on how to divide the work, how to handle conflicts, and strategies for individual coping. Deadlines and conflict handling were central topics that the group gave very high priority during the meeting.',
      '**Friday, 2026-09-11',
      '**IS-219, Digitalisation and service design',
      '**16:00-16:30',
      'After handing in the group contract, we spent the time we had left on IS-219. The focus was design thinking, which is relevant for the knowledge base we will work on. Some of the examples we discussed came from the book, while we made up others ourselves: a woman who dressed up as an elderly person to see how it feels to be treated as one, how a hospital took inspiration from Ferrari during crises and accidents by cutting communication and increasing speed, and that stakeholders are not only the people who drink Coca-Cola, but also those who drink Pepsi, and those who do not drink soda at all!',
      'Even though we did not finish, the group showed it could reflect, switch context between subjects and take an active part from start to finish.',
      '**The plan for next time',
      'Finish the IS-219 design thinking part, work on IS-216 data science, and find possible solutions for the knowledge base.',
    ]),
  },
}

async function main() {
  const ids = Object.keys(patches)
  const existing: string[] = await client.fetch('*[_id in $ids]._id', {ids})
  const missing = ids.filter((id) => !existing.includes(id))
  if (missing.length) {
    throw new Error(`Documents not found, nothing was written: ${missing.join(', ')}`)
  }

  const tx = client.transaction()
  for (const [id, fields] of Object.entries(patches)) {
    tx.patch(id, (p) => p.set(fields))
    console.log(`${id}: ${Object.keys(fields).join(', ')}`)
  }

  if (!commit) {
    console.log('\nDry run. Add "-- --commit" to write these fields.')
    return
  }
  const result = await tx.commit()
  console.log(`\nCommitted transaction ${result.transactionId}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
