/**
 * Fills in the English fields and the new homepage headings in one transaction.
 * It only sets the fields listed below; everything else in each document is left
 * as it is.
 * It also removes the subheading line from each Norwegian box text under
 * "For bedrifter", so each box keeps only its title as a heading.
 * The three Kartverket projects become one: "kartverket" gets every team's
 * repository under "Laget av", and the other two are unpublished. They stay in
 * the Studio as drafts, so either can be published again from there.
 *
 * Dry run (prints the patches, writes nothing):
 *   npx sanity exec scripts/i18n-patch.ts --with-user-token
 * Write to the dataset:
 *   npx sanity exec scripts/i18n-patch.ts --with-user-token -- --commit
 */
import {getCliClient} from 'sanity/cli'

// `sanity exec` runs under Node; the Studio's tsconfig has no Node types.
declare const process: {argv: string[]; exit(code: number): never}

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

// kartverket-3's cover (the NaviSafe logo), used on the combined Kartverket project.
const KARTVERKET_COVER = {
  _type: 'image',
  asset: {_type: 'reference', _ref: 'image-2436c9552a1c0485a8c1db93bbf37675a1453919-701x851-png'},
}

// One row per person; people on the same team share a repository link.
function contributor(key: string, memberId: string, githubUrl: string) {
  return {
    _key: key,
    _type: 'contributor',
    member: {_type: 'reference', _ref: memberId},
    githubUrl,
  }
}

// Duplicates of "kartverket", replaced by its contributor list.
const unpublish = ['caeb0e58-a31d-494e-9b95-4097aa6aacce', '807a9417-e476-4c5c-b8ac-1a071934093d']

const patches: Record<string, Fields> = {
  siteSettings: {
    responsePromise: 'Det som ikke knekker koden, gjør den sterkere.',
    responsePromiseEn: "What doesn't break the code makes it stronger.",
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
    membersLede: 'Vi utfordrer hverandres ideer for å komme frem til de beste løsningene.',
    membersLedeEn: "We challenge each other's ideas to arrive at the best solutions.",
  },

  forCompanies: {
    headingEn: 'Do you have a challenge we can solve together?',
    'columns[_key=="c1"].bullets': [
      'Vi har opparbeidet oss bred faglig kompetanse innen IT, systemutvikling, informasjonssystemer og prosjektarbeid gjennom bachelorstudiet ved Universitetet i Agder.',
    ],
    'columns[_key=="c1"].titleEn': 'Academic expertise',
    'columns[_key=="c1"].bulletsEn': [
      'Through our bachelor programme at the University of Agder we have built broad expertise in IT, systems development, information systems and project work.',
    ],
    'columns[_key=="c1"].ctaLabel': 'Se prosjekter',
    'columns[_key=="c1"].ctaLabelEn': 'See projects',
    'columns[_key=="c1"].ctaHref': '/prosjekter',
    'columns[_key=="c2"].bullets': [
      'Som studenter kan vi bidra med nye perspektiver, kreative ideer og oppdatert kunnskap. Vi er motiverte for å sette teori ut i praksis og finne løsninger på reelle problemstillinger.',
    ],
    'columns[_key=="c2"].titleEn': 'New perspectives',
    'columns[_key=="c2"].bulletsEn': [
      'As students we bring new perspectives, creative ideas and up-to-date knowledge. We are motivated to put theory into practice and find solutions to real problems.',
    ],
    'columns[_key=="c2"].ctaLabel': 'Les bloggen vår',
    'columns[_key=="c2"].ctaLabelEn': 'Read our blog',
    'columns[_key=="c2"].ctaHref': '/blogg',
    'columns[_key=="c3"].title': 'En fleksibel samarbeidspartner',
    'columns[_key=="c3"].bullets': [
      'Vi ønsker å ha tett dialog med samarbeidspartnere gjennom prosjektet. Sammen kan vi utforske problemstillinger, utvikle løsninger og skape verdi for begge parter.',
    ],
    'columns[_key=="c3"].titleEn': 'A flexible partner',
    'columns[_key=="c3"].bulletsEn': [
      'We want close dialogue with our partners throughout the project. Together we can explore problems, develop solutions and create value for both sides.',
    ],
    'columns[_key=="c3"].ctaLabel': 'Ta kontakt!',
    'columns[_key=="c3"].ctaLabelEn': 'Get in touch!',
    'columns[_key=="c3"].ctaHref': '/om-oss#kontakt',
  },

  'member-1': {
    roleEn: 'Product owner',
    bioEn: [
      "I am 23 years old, born and raised in Kristiansand, and I have more than four years of experience working in Coop stores, so I have dealt with a lot of customer service. I am a student of IT and information systems, and I have a general interest in all things technology and computers. I also have a one-year programme in history from UiA. I have been involved with all kinds of technology since I was little and keep an eye out for anything new and interesting coming to the market. My experience from retail means I know how to talk to people, how not to talk to people, and everything from discipline, patience, efficiency and professionalism to simply showing up well on time. In a group I tend to be good at researching topics in depth, reading a lot and doing my assigned task to the best of my ability.",
    ].join('\n\n'),
  },
  'member-2': {
    name: 'Benjamin Stedal',
    roleEn: 'Frontend developer',
    bioEn: [
      "My name is Benjamin Stedal and I study IT and information systems at UiA. I also have work experience in social work as a support contact and health worker at Strømmeveien 69. I also have experience with digital applications and solutions in more physical work, as a factory worker at Gyli Plast AS. In these roles I have also helped the municipal workplaces with IT support, such as setting up user accounts and installing new applications and systems. I understand this well, since for most of my life I have been into computers and programming, using computers I built myself at a young age. My practical IT knowledge from work and personal life, combined with a good understanding of the social and political sides of digital systems, makes me a good colleague when it comes to developing systems that are easy to use for people who do not necessarily know much about IT.",
    ].join('\n\n'),
  },
  'member-3': {
    roleEn: 'UX / UI designer',
    bioEn: [
      "I am 22 and a bachelor student in IT and information systems. I am especially interested in technology, design, sports and gaming.",
      "Outside my studies I have gained relevant work experience by building and running a Shopify web shop, where among other things I worked with products, design and various Shopify apps and features. I also have customer service experience from working in both a grocery store and a restaurant. This has given me experience communicating with different people, solving problems and working efficiently in different situations.",
      "In our group I want to contribute engagement, creativity and good collaboration. At the same time I want to keep developing within IT, learn new things and gain new perspectives by working with and learning from the others in the group.",
    ].join('\n\n'),
  },
  'member-4': {
    roleEn: 'Security Champion',
    bioEn: [
      "I am 23, from Lithuania, and grew up in Forsand. In upper secondary school I took sales, service and security, where I sharpened an interest in cybersecurity I have had since childhood. There I learned how companies carry out risk assessments according to context, and how to prevent unwanted incidents. During my work placement I worked as a security guard at Stavanger University Hospital during the coronavirus pandemic, to see how the public sector secures physical areas.",
      "Before I got a place as a student, I spent my time on hands-on IT security labs on platforms like HackTheBox and TryHackMe. During my studies I gained experience with Python, C# and SQL. By combining the theoretical foundation with the practical experience, I was able to identify and report vulnerabilities in external systems through responsible vulnerability disclosure (VDP). I enjoy examining logs, integrating and securing role-based access control, implementing virtualisation with Docker and VirtualBox, and uncovering forgotten and unknown data paths (shadow IT). In my free time I switch between competitive gaming (esports), CTF labs, coding and football. I would describe myself as competitive, persistent, proactive and a clear communicator.",
    ].join('\n\n'),
  },
  'member-5': {
    roleEn: 'Project manager',
    bioEn: [
      "I am 21 and lived in Kragerø, Telemark, for 18 years. I am a student on the IT and information systems programme at the University of Agder. Over the summers I have built up a lot of work experience in service and sales, which has given me insight into how to behave professionally. I believe communication is the most important thing for a group, and I will work to make sure everyone is heard.",
    ].join('\n\n'),
  },

  'project-kartverket': {
    cover: KARTVERKET_COVER,
    summary:
      'Registering og oppdatering av luftfartshindre rapporter for piloter og saksbehandlere i Kartverket.',
    summaryEn:
      'Reporting and updating aviation obstacles for pilots and case handlers at the Norwegian Mapping Authority.',
    sections: [
      {
        _key: 'om',
        _type: 'projectSection',
        body: blocks('kvno', [
          'Hovedmålet med prosjektet var å lage en webapplikasjon der piloter kan rapportere hindringer til Nasjonalt register over luftfartshindre. Løsningen skal kunne brukes av piloter og flybesetninger i Norsk Luftambulanse, Luftforsvaret og Politiets helikoptertjeneste.',
          'Bare i juni 2025 fløy 1 227 553 passasjerer innenlands, omtrent en femtedel av hele befolkningen i Norge. Studenter som reiser hjem til familien, arbeidere på vei til jobb og familier som skal gjenforenes, vil alle komme seg på tvers av landet på rimelig tid. At et relativt lite land har så stort behov for flytrafikk, skyldes først og fremst geografien. Fjell, dype fjorder og krevende terreng gjør reiser på land vanskelige og tidkrevende, og en togtur innenlands kan sjelden måle seg med et fly i reisetid.',
          'Befolkningen er dessuten spredt over hele landet, i motsetning til i mange andre moderne land. Det gjør viktige tjenester som nødberedskap i distriktene til en krevende utfordring. Store infrastrukturprosjekter som bruer, motorveier og tunneler har bidratt, men de kan bare løse en del av problemet.',
          'Pilotene må også forholde seg til hindringer som antenner, kraner, tårn, trær, strømstolper og annen infrastruktur, i tillegg til terreng, dårlig sikt og vær. Slike hindringer kan gjøre det umulig å lande trygt og i verste fall føre til dødsulykker. I områder uten nettdekning bruker pilotene i dag fysiske kart, og en digital applikasjon kan erstatte dem.',
        ]),
        bodyEn: blocks('kven', [
          'The main goal of this project was to build a web application that lets pilots report obstacles to the national register of aviation obstacles. The application is meant for pilots and flight crews in the Norwegian Air Ambulance, the Air Force and the Police Helicopter Service.',
          "In June 2025 alone, 1,227,553 passengers flew domestically, roughly one fifth of Norway's entire population. Students travelling home to their families, workers on their way to their jobs and families reuniting all want to cross the country in a reasonable amount of time. Norway is a relatively small nation, and its strong need for air travel comes mainly from its geography. Mountains, deep fjords and harsh terrain make travel on land difficult and time-consuming, and a domestic train ride rarely matches a flight for travel time.",
          'The population is also spread across the country, unlike in many other modern nations, which makes important services such as emergency response in rural areas a difficult challenge. Major infrastructure projects such as bridges, highways and tunnels have tried to remedy this, but they can only go so far.',
          'Pilots also face obstacles such as antennas, cranes, towers, trees, utility poles and other infrastructure, as well as terrain, poor visibility and weather. These can stop pilots from landing safely or even cause fatal accidents. In areas without a connection, pilots rely on physical maps, and a digital application could replace them.',
        ]),
      },
    ],
    contributors: [
      contributor('paulius', 'member-4', 'https://github.com/letsgorm/KartverketProject'),
      contributor('kevin', 'member-3', 'https://github.com/letsgorm/KartverketProject'),
      contributor('benjamin', 'member-2', 'https://github.com/FalckM/Kartverket-Kodeprosjekt'),
      contributor('per-rai', 'member-5', 'https://github.com/asklootz/NaviSafe'),
      contributor('andre', 'member-1', 'https://github.com/asklootz/NaviSafe'),
    ],
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
  // Already unpublished duplicates are skipped below, so only patched documents must exist.
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

  // Unpublishing: keep the content as a draft, then remove the published copy.
  // An existing draft is newer than the published copy, so it is left alone.
  const published: Fields[] = await client.fetch('*[_id in $unpublish]', {unpublish})
  for (const doc of published) {
    const {_id, _rev, _createdAt, _updatedAt, _system, ...content} = doc
    tx.createIfNotExists({...content, _id: `drafts.${_id}`, _type: content._type as string})
    tx.delete(_id as string)
    console.log(`${_id}: unpublished (kept as drafts.${_id})`)
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
