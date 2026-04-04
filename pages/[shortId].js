import { getOriginalUrl } from "../lib/urlDatabase";

export default function RedirectFallback() {
  return <div>Redirecting...</div>;
}

export async function getServerSideProps(context) {
  const { shortId } = context.params;
  const originalUrl = await getOriginalUrl(shortId);

  if (!originalUrl) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: originalUrl,
      permanent: false,
    },
  };
}
