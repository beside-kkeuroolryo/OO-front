import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import type { DisplayedCategory } from '@/constants/categories';

type CategoriesProps = {
  selectedCategory: DisplayedCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<DisplayedCategory>>;
};

export default function CategoriesSection({
  selectedCategory,
  setSelectedCategory,
}: CategoriesProps) {
  const handleClickCategory = (category: DisplayedCategory) => setSelectedCategory(category);

  return (
    <section aria-labelledby="category" className="pb-38 pt-30">
      <h2 id="category" className="a11y-hidden">
        카테고리
      </h2>
      <div className="flex flex-wrap gap-8">
        {DISPLAYED_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`font-14 rounded-[1rem] px-18 py-10 font-semibold ${
              category === selectedCategory ? 'bg-cyan text-dark' : 'bg-primary text-tertiary'
            }`}
            onClick={() => handleClickCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
