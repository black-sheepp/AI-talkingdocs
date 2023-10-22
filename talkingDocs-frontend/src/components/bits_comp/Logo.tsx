import Styles from "./Logo.module.css";

const Logo = () => {
	return (
		<div className={Styles.loader}>
			<div className={Styles.circle} />
		</div>
	);
};

export default Logo;
