export module '@tanstack/table-core' {
   interface FilterFns {
      fuzzy: FilterFn<unknown>
   }
   interface FilterMeta {
      itemRank: RankingInfo
   }
}
