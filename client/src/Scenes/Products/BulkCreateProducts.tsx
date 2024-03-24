import { useState } from "react";
import BackButton from "../../shared/BackButton";
import { useDropzone } from "react-dropzone";
import { fileToDataURL } from "../../shared/constants";
import { BsFileExcel } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { GoCheck } from "react-icons/go";
function BulkCreateProducts() {
	const dropzoneStyles = {
		border: "2px solid #cccccc",
		borderRadius: "4px",
		padding: "20px",
		backgroundColor: "#ffffff",
		textAlign: "center",
		cursor: "pointer",
	} as React.CSSProperties;

	const [files, setFiles] = useState<any[]>([]);

	const onDrop = (acceptedFiles: File[]) => {
		const validFiles = acceptedFiles.filter(
			(file) => file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
		);
		const newFiles = validFiles.map((file) => ({
			url: URL.createObjectURL(file),
			data: fileToDataURL(file),
			name: file.name,
		}));

		setFiles((prev) => [...prev, ...newFiles]);
	};

	const removeFile = (index: number) => {
		const updatedFiles = [...files];
		updatedFiles.splice(index, 1);
		setFiles(updatedFiles);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	const uploadFiles = () => {
		const submittableFiles = files.map((doc) => doc.data);
		console.log("submit", submittableFiles);
		setFiles([]);
	};
	return (
		<div>
			<BackButton />
			<div className="my-10">
				<div {...getRootProps()} style={dropzoneStyles}>
					<input {...getInputProps()} />
					<div className="flex justify-center w-full">
						<BsFileExcel className="my-4 w-14 h-14" />
					</div>
					<p className="my-6 text-xs font-bold">Drag & drop Browse</p>
				</div>
				<div className="flex flex-col items-center w-full gap-2 my-2 ">
					{files.map((file, index) => (
						<div key={index} className="flex justify-center w-full ">
							<div className="flex items-center gap-3 basis-1/2 ">
								<div className="flex items-center w-full gap-3 px-4 py-1 border-2 border-gray-300 rounded-md">
									<BsFileExcel className="w-4 h-4 my-4 text-emerald-700" />
									<p className="text-xs"> {file.name}</p>
								</div>
								<button
									className="flex gap-2 text-pink-900"
									onClick={() => removeFile(index)}>
									<MdOutlineCancel />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center w-full">
					<button
						type="button"
						onClick={() => uploadFiles()}
						className="flex gap-3 px-4 py-1 my-2 text-xs text-white bg-teal-900 rounded-sm">
						Submit <GoCheck />
					</button>
				</div>
			</div>
		</div>
	);
}

export default BulkCreateProducts;
