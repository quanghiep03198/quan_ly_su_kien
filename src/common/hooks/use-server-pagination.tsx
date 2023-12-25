import { useReducer } from 'react'

export enum PaginationActions {
   GO_TO_NEXT_PAGE,
   GO_TO_PREV_PAGE,
   GO_TO_FIRST_PAGE,
   GO_TO_LAST_PAGE,
   CHANGE_PAGE_SIZE
}

export type PaginationStateType = Record<'page' | 'limit', number>

export type PaginationActionType = {
   type: PaginationActions
   payload?: number
}

export type PaginationHandler = React.Dispatch<PaginationActionType>

const intialState: PaginationStateType = {
   page: 1,
   limit: 10
}

const reducer = (state: any, action: PaginationActionType) => {
   switch (action.type) {
      case PaginationActions.GO_TO_NEXT_PAGE:
         return { ...state, pageIndex: state.pageIndex + 1 }
      case PaginationActions.GO_TO_PREV_PAGE:
         return { ...state, pageIndex: state.pageIndex - 1 }
      case PaginationActions.GO_TO_FIRST_PAGE:
         return { ...state, pageIndex: 1 }
      case PaginationActions.GO_TO_LAST_PAGE:
         return { ...state, pageIndex: action.payload }
      case PaginationActions.CHANGE_PAGE_SIZE:
         return { ...state, pageSize: action.payload }
   }
}

export default function useServerPagination(): [PaginationStateType, PaginationHandler] {
   const [serverPaginationState, dispatch] = useReducer(reducer, intialState)
   const state = serverPaginationState ?? intialState
   return [state, dispatch]
}
