'use client';

import { useState } from "react";
import UploadPhoto from "@/components/UploadPhoto";
import type { ExtractedBill } from "@/types/bill";


export default function Home() {
    const [currentView, setCurrentView] = useState<"upload" | "review">("upload");
    const [billData, setBillData] = useState<ExtractedBill | null>(null);

    return (
        <main className="mx-2">
            {currentView === "upload" && (
                <UploadPhoto
                    onSuccess={(bill) => {
                        setBillData(bill);
                        setCurrentView("review");
                    }}
                />
            )}
            
            {currentView === "review" && billData && (
                <div>
                    <h1>Review Bill Data</h1>
                </div>
            )}
        </main>
    );
}
