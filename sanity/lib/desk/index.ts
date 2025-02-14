import {
  Blog,
  Job,
  Pages,
  Projects,
  Review,
  Service,
  Settings,
  Team,
} from '@/sanity/lib/desk/structures';

export const Desk = (S) =>
  S.list()
    .title('Content')
    .items([
      Settings(S),
      // S.documentTypeListItem('inbox').title('Inbox').icon(Mailbox),
      S.divider(),
      Pages(S),
      Projects(S),
      Blog(S),
      Service(S),
      // PostTypes(S),
      S.divider(),
      Team(S),
      Review(S),
      Job(S),
    ]);
