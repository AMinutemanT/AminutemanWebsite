import { Navigate, useParams } from 'react-router-dom';
import { ProgrammeDetail } from '../components/ProgrammeDetail';
import {
  CATEGORY_LABEL,
  PROGRAMME_BY_SLUG,
  programmePath,
  type Category,
  type Programme,
} from '../data/programmes';
import { useSeo } from '../utils/seo';
import { NotFound } from './NotFound';

/**
 * Renders any programme from the content model. One route per category, one
 * component, adding a programme is a data change, not a code change.
 */
export function ProgrammePage({ category }: { category: Category }) {
  const { slug } = useParams<{ slug: string }>();
  const programme = slug ? PROGRAMME_BY_SLUG[slug] : undefined;

  if (!programme) return <NotFound />;
  if (programme.category !== category) return <Navigate to={programmePath(programme.slug)} replace />;
  return <ProgrammeContent programme={programme} />;
}

function ProgrammeContent({ programme }: { programme: Programme }) {
  useSeo({
    title: programme.name,
    path: programmePath(programme.slug),
    description: programme.summary,
    image: programme.hero.src,
    breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: CATEGORY_LABEL[programme.category], path: `/${programme.category}` },
          { name: programme.name, path: programmePath(programme.slug) },
        ],
  });

  return <ProgrammeDetail programme={programme} />;
}

export default ProgrammePage;
