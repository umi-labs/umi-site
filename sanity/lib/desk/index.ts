import {
  Blog,
  Job,
  Pages,
  PostTypes,
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
      // Inbox(S),
      S.divider(),
      Pages(S),
      Projects(S),
      Blog(S),
      PostTypes(S),
      S.divider(),
      Team(S),
      Service(S),
      Review(S),
      Job(S),
    ]);
