import { FaCheck } from "react-icons/fa6";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";
import type { Person } from "@/types/person";
import type { ExtractedBill } from "@/types/bill";
import { useState, useEffect } from "react";

interface AssignDishesProps {
    people: Person[];
    bill: ExtractedBill;
    onUpdateBill: (bill: ExtractedBill) => void;
    onBack: () => void;
    onNext: () => void;
}
export default function AssignDishes({ people, bill, onUpdateBill, onBack, onNext }: AssignDishesProps) {
    const [error, setError] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    function handleSelectedItem(itemId: string) {
        if (!selectedPerson) {
            setError("Select a person first.");
            return;
        }
        setError(null);

        const updatedItems = bill.items.map((i) => {
            if (i.id === itemId) {
                const currentAssigned = i.assignedTo ?? [];
                const nextAssigned = currentAssigned.includes(selectedPerson.name)
                    ? currentAssigned
                    : [...currentAssigned, selectedPerson.name];

                return { ...i, assignedTo: nextAssigned };
            }
            return i;
        });

        onUpdateBill({ ...bill, items: updatedItems });
    }

    function handleUnassignItem(itemId: string) {
        if (!selectedPerson) {
            setError("Select a person first.");
            return;
        }
        setError(null);

        const updatedItems = bill.items.map((i) => {
            if (i.id === itemId) {
                const currentAssigned = i.assignedTo ?? [];
                const nextAssigned = currentAssigned.filter((name) => name !== selectedPerson.name);
                return { ...i, assignedTo: nextAssigned };
            }
            return i;
        });

        onUpdateBill({ ...bill, items: updatedItems });
    }

    function handleOnNext() {
        const unassignedItems = bill.items.filter((item) => !item.assignedTo || item.assignedTo.length === 0);
        if (unassignedItems.length > 0) {
            setError("Assign all items to a person.");
            return;
        }

        const unassignedPeople = people.filter((person) => {
            const isAssigned = bill.items.some((item) => item.assignedTo?.includes(person.name));
            return !isAssigned;
        });

        if (unassignedPeople.length > 0) {
            setError("Assign at least one item to each person.");
            return;
        }

        setError(null);
        onNext();
    }

    const subtotal = bill.items.reduce(
        (acc, item) => acc + item.price,
        0
    );

    const assignedItemsTotal = bill.items.reduce((acc, item) => {
        if (item.assignedTo && item.assignedTo.length > 0) {
            return acc + item.price;
        }
        return acc;
    }, 0);

    useEffect(() => {
        if (!error) return;

        const timeoutId = setTimeout(() => {
            setError(null);
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [error]);

    return (
        <div className="w-full pb-50">
            <div className="flex justify-center w-full mb-2">
                <h1 className="main-title">Assign Dishes</h1>
            </div>

            <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none">
                <div
                    className={` max-w-md rounded-full border border-red-900 bg-red-950 p-3 px-5 text-center text-sm font-bold text-red-100 shadow-lg transition-all duration-300 ${error ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </div>
            </div>

            <div className="pb-3 border-b border-[var(--color-text-tertiary)] mb-4">
                <h3 className="font-bold text-xl mb-2">Assign to:</h3>

                <div className="flex gap-1 mt-2 overflow-x-auto scroll-smooth py-2 hide-scrollbar">
                    {people.map((person) => (
                        <button
                            className={`flex items-center flex-col rounded-xl border-2 p-2 transition-colors ${selectedPerson?.id === person.id
                                ? "bg-[#ca8a04]/20 border-[var(--color-primary)]"
                                : "border-transparent"
                                }`} key={person.id}
                            onClick={() => setSelectedPerson(person)}
                        >
                            <span
                                className={`text-black font-bold rounded-full w-20 h-20 flex items-center justify-center text-2xl ${selectedPerson?.id === person.id ? "border-4 border-[#0f0b09] ring-2 ring-[#eab308]" : ""}`}
                                style={{ backgroundColor: person.color }}
                            >
                                {person.name.trim().charAt(0).toUpperCase()}
                            </span>
                            <span className={`text-lg mt-3 ${selectedPerson?.id === person.id ? "text-[#eab308]" : ""}`}>{person.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-2">Items from &#34;{bill.restaurantName}&#34;</h3>

                <div className="flex flex-col gap-3">
                    {bill.items.map((item) => {
                        const isSelectedAssigned = selectedPerson
                            ? (item.assignedTo ?? []).includes(selectedPerson.name)
                            : false;

                        return (
                            <div key={item.id} className="main-card flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-lg">{item.name}</h4>
                                    <p className="text-[var(--color-text-secondary)] flex">
                                        <span className="mr-3">{bill.currency} {item.price.toFixed(2)}</span>
                                        {item.assignedTo?.map((name) => {
                                            const assignedPerson = people.find((person) => person.name === name);

                                            return (
                                                <span
                                                    key={name}
                                                    className="text-black font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm"
                                                    style={{ backgroundColor: assignedPerson?.color ?? "var(--color-primary-dark)" }}
                                                >
                                                    {name.trim().charAt(0).toUpperCase()}
                                                </span>
                                            );
                                        })}
                                    </p>
                                </div>

                                {isSelectedAssigned && (
                                    <button
                                        className="bg-[var(--color-primary)] rounded-lg w-10 h-10 flex items-center justify-center"
                                        onClick={() => handleUnassignItem(item.id)}
                                    >
                                        <FaCheck color="black" size={24} />
                                    </button>
                                )}

                                {!isSelectedAssigned && (
                                    <button
                                        className="border border-[var(--color-text-tertiary)] rounded-lg w-10 h-10 flex items-center justify-center"
                                        disabled={!selectedPerson}
                                        onClick={() => handleSelectedItem(item.id)}
                                    >

                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 bottom-menu sm:max-w-md w-full fixed bottom-0 left-0 right-0 mx-auto px-3 py-4">
                <h3 className="text-xl font-bold">Assigned Total</h3>

                <div className="my-2">
                    <span className="text-[var(--color-primary)] font-bold text-4xl mr-2">{bill.currency}{assignedItemsTotal.toFixed(2)}</span>
                    <span className="text-[var(--color-text-secondary)] font-bold">/ {bill.currency}{subtotal.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-6 items-center my-1">
                    <button className="tertiary-button" onClick={onBack}>
                        <LuMoveLeft size={26} /> Back
                    </button>
                    <button className="primary-button" onClick={handleOnNext}>
                        Next <LuMoveRight size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}