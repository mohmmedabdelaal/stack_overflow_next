import { getPopularTags } from '@/lib/actions/tag.action';
import RenderTags from './RenderTags';

const FilterTags = async () => {
  const popularTags = await getPopularTags();
  return (
    <div>
      {popularTags.map((tag) => (
        <RenderTags
          key={tag._id}
          _id={tag._id}
          name={tag.name}
          totalQuestions={tag.totalQuestions}
        />
      ))}
    </div>
  );
};

export default FilterTags;
