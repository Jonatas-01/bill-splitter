'use client';

import { useState } from "react";
import UploadPhoto from "@/components/UploadPhoto";
import ReviewBill from "@/components/ReviewBill";
import AddPeople from "@/components/AddPeople";
import AssignDishes from "@/components/AssignDishes";
import type { ExtractedBill } from "@/types/bill";
import type { Person } from "@/types/person";


export default function Home() {
    const [currentView, setCurrentView] = useState<"upload" | "review" | "addPeople" | "assignDishes" | "summary">("upload");
    const [billItems, setBillItems] = useState<ExtractedBill | null>(null);
    const [people, setPeople] = useState<Person[]>([]);

    return (
        <main className="px-3 sm:max-w-md flex flex-col items-center justify-center w-full mx-auto">
            {/* <ReviewBill bill={{
                "restaurantName": "Pizza Express",
                "items": [
                    { "id": "1", "name": "Mushroom Pizza", "price": 12.99 },
                    { "id": "2", "name": "French Fries", "price": 4.50 },
                    { "id": "3", "name": "Pesto & Tomato Pasta", "price": 11.99 },
                    { "id": "4", "name": "Red Wine", "price": 16.50 },
                    { "id": "5", "name": "Mushroom Pizza", "price": 12.99 },
                    { "id": "6", "name": "French Fries", "price": 4.50 },
                    { "id": "7", "name": "Pesto & Tomato Pasta", "price": 11.99 },
                ],
                "serviceChargePercent": 12.5,
                "currency": "£"}} /> */}

            {currentView === "upload" && (
                <UploadPhoto
                    onSuccess={(bill) => {
                        setBillItems(bill);
                        setCurrentView("review");
                    }}
                />
            )}

            {currentView === "review" && billItems && (
                <ReviewBill
                    bill={billItems}
                    onConfirm={(updatedBill) => {
                        setBillItems(updatedBill)
                        setCurrentView("addPeople");
                    }}
                    onTryAgain={() => {
                        setBillItems(null);
                        setCurrentView("upload");
                    }}
                />
            )}

            {currentView === "addPeople" && (
                <AddPeople
                    getPeople={people}
                    onBack={() => setCurrentView("review")}
                    onNext={(people) => {
                        setPeople(people);
                        setCurrentView("assignDishes");
                    }}
                />
            )}

            {currentView === "assignDishes" && billItems && people.length > 0 && (
                <AssignDishes
                    people={people}
                    bill={billItems}
                    onUpdateBill={(updatedBill) => {
                        setBillItems(updatedBill);
                        console.log(updatedBill);
                    }}
                    onBack={() => setCurrentView("addPeople")}
                    onNext={() => setCurrentView("summary")}
                />
            )}
        </main>
    );
}
