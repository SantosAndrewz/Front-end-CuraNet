import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { FaPrescriptionBottleAlt, FaListAlt, FaExclamationCircle, FaWarehouse } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PharmacistDashboard = () => {
    const [selectedSection, setSelectedSection] = useState("prescriptions");
    const [prescriptions, setPrescriptions] = useState([
        {id: 1, patientName: "Raph Gray", medication: "Aspirin", status: "Pending" },
        {id: 2, patientName: "Martha Gray", medication: "Ibuprofen", status: "Pending" },
    ]);
    const [inventory, setInventory] = useState([
        {id: 1, medication: "Aspirin", stock: 10, expiryDate: "2025-01-01" },
        {id: 2, medication: "Ibuprofen", stock: 2, expiryDate: "2025-02-01" },
    ]);
    const [interactionWarnings, setInteractionWarnings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleProcessPrescription = (prescriptionId) => {
        setPrescriptions((prevPrescriptions) =>
            prevPrescriptions.map((prescription) =>
                prescription.id === prescriptionId
                    ? { ...prescription, status: "Processed" }
                    : prescription
            )
        );
        alert("Prescription processed successfully!");
    };
    const checkDrugInteractions = async (medication) => {
        setIsLoading(true);
        try {
            const warnings = medication === "Aspirin" ? ["Aspirin Interacts with warfarin"] : [];
            setInteractionWarnings(warnings);
        } catch (error) {
            console.error("Error checking drug interactions:", error);
        } finally {
            setIsLoading(false);
        }

    };
    const handleInventoryUpdate = (medicationId, change) => {
        setInventory((prevInventory) =>
            prevInventory.map((item) =>
                item.id === medicationId
                    ? { ...item, stock: item.stock + change }
                    : item
            )
        );
    };
    return (
        <div className="h-screen">
            <Header />
            <main className="flex-1 overflow-auto-hidden">
            <div className="h-screen p-8 bg-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-center">Pharmacy - Dashboard</h1>
                <div className="grid grid-cols-12 gap-0 h-full">
                    <div className="col-span-3 bg-blue-950 p-4 rounded-lg shadow-md">
                        <div className="flex flex-col items-center space-y-6">
                            <Button
                                onClick={() => setSelectedSection("prescriptions")}
                                className="flex flex-col items-center w-300 p-8 bg-blue-200 text-white rounded-full hover:bg-blue-700"
                            >
                                <FaPrescriptionBottleAlt size={30} />
                                <span className="text-xs mt-1">Prescriptions</span>
                            </Button>
                            <Button
                                onClick={() => setSelectedSection("inventory")}
                                className="flex flex-col items-center p-3 bg-green-500 text-white rounded-full hover:bg-green-700"
                            >
                                <FaWarehouse size={30} />
                                <span className="text-xs mt-1">Inventory</span>
                            </Button>
                            <Button
                                onClick={() => setSelectedSection("interactions")}
                                className="flex flex-col items-center w-70GGGGGG p-8 bg-yellow-500 text-white rounded-full hover:bg-yellow-700"
                            >
                                <FaListAlt size={30} />
                                <span className="text-xs mt-1">Interactions</span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-6 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
                        {selectedSection === "prescription" && (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
                                <ul className="space-y-4">
                                    {prescriptions.map((prescription) => (
                                        <li key={prescription.id} className="p-3 border rounded-md">
                                            <div className="flex justify-between items-center">
                                                <span>{prescription.patientName} - {prescription.medication}</span>
                                                <Button
                                                    onClick={() => handleProcessPrescription(prescription.id)}
                                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                                                >
                                                    Process
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {selectedSection === "inventory" && (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
                                <ul className="space-y-4">
                                    {inventory.map((item) => (
                                        <li key={item.id}>
                                            <div className="flex justify-between items-center">
                                                <span>{item.medication} - stock: {item.stock} (Expiry: {item.expiryDate})</span>
                                                <div className="ml-auto flex space-x-2">
                                                    <Button
                                                        onClick={() => handleInventoryUpdate(item.id, 1)}
                                                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                                                    >
                                                        Add stock
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleInventoryUpdate(item.id, -1)}
                                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                                                    >
                                                        Remove Stock
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {selectedSection === "interactions" && (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">Drug Interaction Checks</h2>
                                {interactionWarnings.length > 0 ? (
                                    <ul className="list-disc list-inside text-red-100 ">
                                        {interactionWarnings.map((warning, index) => (
                                            <li key={index}>{warning}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No interactions detected</p>
                                )}
                            </>
                        )}
                    </div>
                    <div className="col-span-3 bg-blue-200 p-3 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-">Notifications</h2>
                        <div>
                            <h3 className="text-xl font-semibold ">Stock Expiries</h3>
                            <ul className="list-disc list-inside mt-2 color-red">
                                {inventory
                                    .filter((item) => new Date(item.expiryDate) < new Date())
                                    .map((item) => (
                                        <li key={item.id}>{item.medication} has expired!</li>
                                    ))}
                            </ul>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Stockouts and Overstocks</h3>
                            <ul className="list-disc list-inside mt-2">
                                {inventory
                                    .filter((item) => item.stock === 0)
                                    .map((item) => (
                                        <li key={item.id}>{item.medication} is out of stock!</li>
                                    ))}
                                {inventory
                                    .filter((item) => item.stock > 20)
                                    .map((item) => (
                                        <li key={item.id}>{item.medication} is overstocked!</li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PharmacistDashboard;