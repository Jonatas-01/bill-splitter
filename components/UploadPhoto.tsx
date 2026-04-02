import { MdReceiptLong, MdLightbulbOutline } from "react-icons/md";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import { RxRowSpacing } from "react-icons/rx";
import { BsShadows } from "react-icons/bs";
import { useState } from "react";
import type { ExtractedBill } from "@/types/bill";
import ReviewBillLoading from "./loadings/ReviewBillLoading";

interface UploadPhotoProps {
    onSuccess: (bill: ExtractedBill) => void;
}

export default function UploadPhoto({ onSuccess }: UploadPhotoProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            handleImageUpload(file);
        };
    }

    const handleImageUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("/api/extract", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to extract bill");
            }

            const bill: ExtractedBill = await response.json();
            onSuccess(bill);

        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }

    }

    if (isLoading) {
        return <ReviewBillLoading />;
    }

    return (
        <div>
            <div className="flex justify-center w-full mb-6">
                <h1 className="main-title">Add Bill</h1>
            </div>

            <div className="flex justify-center w-full flex-col items-center gap-3">
                <div className="border-2 p-8 rounded-full border-[var(--color-primary)] bg-[var(--color-primary-dark)]">
                    <MdReceiptLong color="#e9b935" size={182} />
                </div>
                <div className="text-lg text-center gap-2 flex flex-col">
                    <h2>Upload or take a photo</h2>
                    <p>Our scanner will automatically detect the items and prices on your bill.</p>
                </div>
            </div>

            <div className="flex justify-center w-full mt-10 flex-col gap-2">
                <label className="primary-button">
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        disabled={isLoading}
                    />
                    <HiOutlineCamera size={30} /> Take a photo
                </label>

                <label className="secondary-button">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        disabled={isLoading}
                    />
                    <IoImagesOutline size={30} /> Upload from Gallery
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="m-4 text-red-500">
                    {error}
                </div>
            )}

            <div className="flex justify-center w-full my-10 flex-col gap-3">
                <h3 className="font-bold text-center">Tips for better results</h3>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <MdLightbulbOutline color="var(--color-primary)" size={24} /><p>Ensure good lighting</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <RxRowSpacing color="var(--color-primary)" size={24} /><p>Place receipt on flat surface</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <BsShadows color="var(--color-primary)" size={24} /><p>Avoid shadows and blur</p>
                </div>
            </div>
        </div>
    )
}