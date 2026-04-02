import { BsPlusLg } from "react-icons/bs";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

export default function ReviewBillLoading() {
    const rows = Array.from({ length: 5 });

    return (
        <div>
            <div className="flex justify-center w-full mb-2">
                <h1 className="main-title">Processing Bill..</h1>
            </div>

            <div className="text-center mb-3 flex justify-center">
                <div className="loading-skeleton h-5 w-44 rounded-md mb-3" />
            </div>

            <div className="flex flex-col gap-3 mb-40">
                {rows.map((_, index) => (
                    <div
                        key={index}
                        className="main-card grid grid-cols-2 items-center"
                    >
                        <div className="inner-loading-skeleton h-6 w-40 rounded-md" />

                        <div className="flex items-center justify-evenly gap-2">
                            <span className="inner-loading-skeleton h-6 w-3 rounded-sm" />
                            <span className="inner-loading-skeleton h-6 w-14 rounded-md" />
                            <span className="inner-loading-skeleton h-8 w-18 rounded-full" />
                        </div>
                    </div>
                ))}

                <div className="border-2 border-dashed border-[#e9b93548] rounded-2xl text-[#e9b93548] text-lg  font-bold py-4 px-4 flex items-center justify-center gap-2">
                    <BsPlusLg size={22} /> Add Item
                </div>
            </div>

            <div className="bottom-menu md:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="h-6 w-20 rounded-md font-bold text-[#919191]">Subtotal</span>
                    <span className="inner-loading-skeleton h-6 w-18 rounded-md"></span>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="tertiary-button-loading h-16 w-full rounded-[var(--border-radius)]">
                        <LuMoveLeft size={26} /> Try Again
                    </div>
                    <div className="primary-button-loading h-16 w-full rounded-[var(--border-radius)]">
                        Confirm <LuMoveRight size={26} />
                    </div>
                </div>
            </div>
        </div>
    );
}