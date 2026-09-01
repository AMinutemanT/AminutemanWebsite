import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ProgrammeDetail } from '../components/ProgrammeDetail';
import { PROGRAMME_BY_SLUG, type Category } from '../data/programmes';

/**
 * Renders any programme from the content model. One route per category, one
 * component, adding a programme is a data change, not a code change.
 */
export function ProgrammePage({ category }: { category: Category }) {
  const { slug } = useParams<{ slug: string }>();
  const programme = slug ? PROGRAMME_BY_SLUG[slug] : undefined;

  useEffect(() => {
    if (!programme) return;
    const previous = document.title;
    document.title = `${programme.name}, Aminuteman Technologies`;
    return () => {
      document.title = previous;
    };
  }, [programme]);

  // Guard against a slug that exists but sits under a different category, so the
  // canonical URL for each programme stays unique.
  if (!programme || programme.category !== category) {
    return <Navigate to={`/${category}`} replace />;
  }

  return <ProgrammeDetail programme={programme} />;
}

export default ProgrammePage;
