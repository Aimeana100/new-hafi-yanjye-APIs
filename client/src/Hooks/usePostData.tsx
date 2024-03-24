import { useState } from "react";
import { error } from "../shared/types";
import instance from "../API";
import toast from "react-hot-toast";

const usePostData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<error | null>(null);
	const postData = async <T,>(url: string, data: T) => {
		setIsLoading(true);
		await instance
			.post(`${url}`, data)
			.then((res) => {
				console.log("res", res);
				toast.success("Success !!!");
			})
			.catch((err) => {
				console.log("this is the error", err);
				toast.error(err.code);

				setError({ status: true, message: "error !!!" });
				const errorConstant = err.response.data.message;
				if (Array.isArray(errorConstant)) {
					toast.error(errorConstant[0]);
				} else {
					toast.error(errorConstant);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return { postData, isLoading, error };
};

export default usePostData;
