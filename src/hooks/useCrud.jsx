import React, {useReducer} from 'react'
function useCrud  (initialItems, id)  {
	const itemsReducer = (state, action) =>{
		console.log('action', action)
			switch(action.type){
				case 'ADD':
					return state.concat(action.new)
				case 'DELETE':
						return state.filter((item)=>!action.selected.some((deleted) =>item[id] ===deleted[id] ))
				case 'EDIT':
						return state.map((item)=> item[id] === action.old[id] ?action.new : item)
				case 'EDIT_SELECTED':
						return state.map((item)=> 
							action.oldValues.includes(item)
							? Object.keys(item).reduce((o,key)=>({...o,  [key]: Object.hasOwn(action.changes,key) ?action.changes[key] : item[key]}) ,{})
							: item
						)
			}
	}
	const [items, dispatchItems] = useReducer(itemsReducer, initialItems)
	const add = (added) => dispatchItems({
		type:'ADD',
		new: added
	})
	const edit = (updated,old) => dispatchItems({
		type:'EDIT',
		old: old,
		new: updated,
	})
	const deleteSelected = (selected) =>dispatchItems({
		type:'DELETE',
		selected: selected,
	})
	const editSelected = (changes,oldValues) =>dispatchItems({
		type:'EDIT_SELECTED',
		oldValues: oldValues,
		changes: changes
	})
	return (
		[items, add,edit,deleteSelected,editSelected]
	)
}
export default useCrud;