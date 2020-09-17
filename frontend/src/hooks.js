import { useEffect } from "react";
import Moment from "moment";

export const useMoment = () => {
	const updateTime = () => {
		const time = document.getElementById("clock__Time");
		const now = Moment();
		const ticking = now.format("h:mm:ss a");
		time.innerHTML = ticking;
	};
	useEffect(() => {
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);
};

export const useResponse = (a, b, c, x, y, z) => {
	useEffect(() => {
		if (x === "already in favorites") {
			a(true);
		} else if (x === "added") {
			a(true);
			b(false);
			c("");
		} else if (y === "invalid symbol") {
			b(false);
			a(true);
		} else if (y === "no data") {
			b(false);
			a(true);
		}
	}, [x, y, z]);
};

export const useAuth = (x) => {
	useEffect(() => {
		if (!x) {
			window.location.href = "/";
		}
	}, [x]);
};

export const useQuote = (x, y) => {
	useEffect(() => {
		if (x.symbol) {
			y(true);
		}
	}, [x]);
};
