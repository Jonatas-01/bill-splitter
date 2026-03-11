import { MdReceiptLong, MdLightbulbOutline } from "react-icons/md";
import { HiOutlineCamera } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import { RxRowSpacing } from "react-icons/rx";
import { BsShadows } from "react-icons/bs";

export default function UploadPhoto() {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-center w-full mb-10">
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
                <button className="primary-button">
                    <HiOutlineCamera size={30}/> Take a photo
                </button>
                <button className="secondary-button">
                    <IoImagesOutline size={30}/> Upload from Gallery
                </button>
            </div>

            <div className="flex justify-center w-full my-10 flex-col gap-3">
                <h3 className="font-bold text-center">Tips for better results</h3>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <MdLightbulbOutline color="var(--color-primary)" size={24}/><p>Ensure good lighting</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <RxRowSpacing color="var(--color-primary)" size={24}/><p>Place receipt on flat surface</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-[var(--color-bg-tertiary)] p-2 rounded-md">
                    <BsShadows color="var(--color-primary)" size={24}/><p>Avoid shadows and blur</p>
                </div>
            </div>
        </div>
    )
}