import React from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
	return (
		<div>
			sidebar
			{/* 자식들이 Outlet로 마치 컴포넌트 처럼 들어오게 된다. */}
			<Outlet />
		</div>
	);
};

export default AppLayout;
