import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index.ts'
import type { FilterState } from '../../types'

const initialState: FilterState = {
  searchTerm: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state: { searchTerm: any }, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setSearchTerm } = filterSlice.actions
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm
export default filterSlice.reducer
