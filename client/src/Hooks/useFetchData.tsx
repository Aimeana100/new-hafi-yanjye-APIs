//jshint esversion:9
import { useState, useEffect } from "react";
import instance from "../API";

interface usefetchreturn {
	data: any;
	loading: boolean;
	error: any;
}

const useFetchData = (url: string): usefetchreturn => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchData = async (url:string) => {
		
				 await instance.get(url).then((response)=>{
						if (response.data) {
							setData(response.data);
						}
				 }).catch((err)=>{
				setError(err);

				 }).finally(()=>{
						setLoading(false);
				 });
				
			
		};

		fetchData(url);
	}, [url]);

	return { data, loading, error };
};

export default useFetchData;
