import React from "react";
import Styles from "./PDFLoader.module.css";

const PDFLoader = () => {
	return (
		<div className="flex justify-center">
			<div className={Styles.spinner}>
				<div className={Styles.inner}>
                    <p className={Styles.innermsg}> Uploading PDF</p>
                </div>
			</div>
		</div>
	);
};

export default PDFLoader;
