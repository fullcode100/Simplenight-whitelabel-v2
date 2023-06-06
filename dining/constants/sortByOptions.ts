export const SORT_BY_OPTIONS = [
  { value: 'sortByBestMatch', label: 'Best Match', param: 'best_match' },
  { value: 'sortByRating', label: 'Rating', param: 'rating' },
  { value: 'sortByReviewCount', label: 'Review Count', param: 'review_count' },
  { value: 'sortByDistance', label: 'Distance', param: 'distance' },
];

export interface SortBySelect {
  sortBy: string | undefined;
  onChangeSortBy: (value: string) => void;
}
