type NextPage = import('next').NextPage;

type ReactElement = import('react').ReactElement;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => JSX.Element;
  auth?: { roles: UserType[] };
};
