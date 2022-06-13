import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart.context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((currNum, item) => {
		return currNum + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnIsHightlighted && classes.bump}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHightlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHightlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onShowCart}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
