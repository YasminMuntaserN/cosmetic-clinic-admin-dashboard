import React, {useState, useRef, useEffect} from "react";
import {ImageUp} from "lucide-react";

type ImageUploaderProps = {
    onFileSelected: (file: File) => void;
    name: string;
    defaultImage?:string;
};

export function ImageUploader({onFileSelected ,name="Profile" ,defaultImage}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (defaultImage) {
            setPreview(defaultImage);
        }
    }, [defaultImage]);
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file));
            onFileSelected(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file));
            onFileSelected(file);
        }
    };

    return (
        <>
            <label className={StyledLabel}>{name} Image</label>
            <div
                className="m-5 border-2 border-dashed border-basic rounded-xl p-6 text-center cursor-pointer transition-all"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-h-48 object-cover mx-auto rounded-md"
                    />
                ) : (
                    <button className="text-gray-400 flex justify-center items-center flex-col">
                        <ImageUp size={36} className="text-basic"/>
                      <p>  Drag & drop an image here or click to select</p>
                    </button>
                )}
            </div>
        </>
    );
}

const StyledLabel = "block text-sm m-2 mt-4";