import { useReducer } from "react";

import CartContext from "./cart.context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const ACTIONS = {
	ADD: "ADD_ITEM",
	REMOVE: "REMOVE_ITEM",
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD:
			const newTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;

			const existingCartItemIndex = state.items.findIndex(
				(item) => item.id === action.item.id
			);
			const existingCartItem = state.items[existingCartItemIndex];
			let updatedItems;

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = state.items.concat(action.item);
			}
			return {
				items: updatedItems,
				totalAmount: newTotalAmount,
			};
		case ACTIONS.REMOVE:
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === action.id
			);
			const existingItem = state.items[existingItemIndex];
			const updatedTotalAmount = state.totalAmount - existingItem.price;
			let updatedItemsList;
			if (existingItem.amount === 1) {
				updatedItemsList = state.items.filter((item) => item.id !== action.id);
			} else {
				const updatedCartItem = {
					...existingItem,
					amount: existingItem.amount - 1,
				};
				updatedItemsList = [...state.items];
				updatedItemsList[existingItemIndex] = updatedCartItem;
			}
			return {
				items: updatedItemsList,
				totalAmount: updatedTotalAmount,
			};
		default:
			return defaultCartState;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: ACTIONS.ADD, item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: ACTIONS.REMOVE, id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
