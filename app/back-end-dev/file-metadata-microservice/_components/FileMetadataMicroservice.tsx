import React, { useState, ChangeEvent, FormEvent } from "react";

const FileMetadataMicroservice = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileMetadata, setFileMetadata] = useState<{
        name: string;
        type: string;
        size: number;
    } | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.set("upfile", file);

        try {
            const response = await fetch("/api/analyze-file", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setFileMetadata(result);
            } else {
                alert("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error uploading file.");
        }
    };

    return (
        <div className="tw-class flex items-center justify-center flex-col h-screen w-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center">
                File Metadata Microservice
            </h1>
            <div className="mt-4 border p-5 w-[80%] min-w-64 max-w-[600px] bg-white rounded-lg shadow-md">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                >
                    <label className="mb-4" htmlFor="inputfield">
                        Upload your file below:
                    </label>
                    <input
                        id="inputfield"
                        type="file"
                        name="upfile"
                        className="w-full m-2 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none"
                        onChange={handleFileChange}
                    />
                    <input
                        id="button"
                        type="submit"
                        value="Upload"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </form>
                {fileMetadata && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                        <h2 className="text-lg font-semibold">
                            File Metadata:
                        </h2>
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(fileMetadata, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileMetadataMicroservice;
