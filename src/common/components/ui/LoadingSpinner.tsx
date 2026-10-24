import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
	return (
		<div className="loading-spinner" role="status" aria-label="로딩 중">
			<div className="loading-spinner__bars">
				<span className="loading-spinner__bar" />
				<span className="loading-spinner__bar" />
				<span className="loading-spinner__bar" />
				<span className="loading-spinner__bar" />
			</div>
			<p className="loading-spinner__text">Loading...</p>
		</div>
	);
};

export default LoadingSpinner;
