import { useState, useEffect} from "react";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";


const PrescriberDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientSummary, setPatientSummary] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [prescription, setPrescription] = useState([]);
    const [medicationName, setMedicationName] = useState("");
    const [frequency, setFrequency] = useState("");
    const [duration, setDuration] = useState("")
    const [interactionWarnings, setInteractionWarnings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState({ name: "", frequency: "", duration: "" });

    // Helper function to calculate age from date_of_birth
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };
    // Fetch patients from the backend

        const fetchPatients = async () => {
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                let token = localStorage.getItem("accessToken");

                 // Refresh token if needed
                if (refreshToken) {
                    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });
                    token = response.data.access;
                    localStorage.setItem("accessToken", token);
            }
                const response = await axios.get("http://localhost:8000/api/patients/fetch-patients/?page_size=10", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the Bearer token
                    },
            });
                const patientData = response.data.map((patient) => ({
                    ...patient,
                    age: calculateAge(patient.date_of_birth),
                }));
                setPatients(patientData);
                console.log("Patients state after fetch:", patientData);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        useEffect(() => {
        fetchPatients();
    }, []);

     // Fetch prescriptions for selected patient
     const fetchPrescription = async (patientId) => {
        try {
            let token = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
    
            // Refresh token if it exists
            if (refreshToken) {
                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                    refresh: refreshToken,
                });
                token = response.data.access;
                localStorage.setItem("accessToken", token);
            }
    
            // Fetch prescription using the valid token
            const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}/prescriptions/`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the Bearer token
                },
            });
    
            setPrescription(response.data);
            console.log("I am working");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching prescription:", error);
        }
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setPatientSummary("");
        setDiagnosis("");
        setPrescription([]);
        setInteractionWarnings([]);
    };

    const handleAddMedication = () => {
        if (medicationName && frequency && duration) {
            const newPrescription = {
                name: medicationName,
                frequency: frequency,
                duration: duration,
            };

            setPrescription([...prescription, newPrescription]);

            setMedicationName('');
            setFrequency('');
            setDuration('');

            // checkDrugInteractions(updatedPrescription);
        } else {
            alert("Please enter a medication details!");
        }
    };

    const checkDrugInteractions = async (medications) => {
        setIsLoading(true);
        try {
            const warnings = medications.includes("Aspirin")
                ? ["Aspirin interacts with warfarin"]
                : [];
            setInteractionWarnings(warnings);
        } catch (error) {
            console.error("Error checking drug interactions:", error);
        } finally {
            setIsLoading(false);
        }
    };

   // Handle submitting updated prescription to backend
   const handleSubmit = async () => {
    if (!selectedPatient) return;

    setIsLoading(true);
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        let token = localStorage.getItem("accessToken");

        // Refresh the access token if expired
        if (refreshToken) {
            const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });
            token = response.data.access;
            localStorage.setItem("accessToken", token);
        }

        // Set the Authorization header with the valid token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the Bearer token
            },
        };
        // const prescriptionData = {
        //     patient: selectedPatient.id,
        //     medication_name: prescription.medicationName,
        //     frequency: prescription.frequency,
        //     duration: prescription.duration,
        //     summary: prescription.summary,
        //     diagnosis: prescription.diagnosis
        // };
        const prescriptionData = {
            patient: selectedPatient.id,
            medication_name: medicationName,
            frequency: frequency,
            duration: duration,
            summary: patientSummary,
            diagnosis: diagnosis
        };
        console.log("Submitting prescription data:", prescriptionData);
        console.log("Selected Patient:", selectedPatient);
        
        // Make the API call to submit the prescription
        const response = await axios.post(`http://localhost:8000/api/patients/${selectedPatient.id}/prescriptions/`, prescriptionData, config);
        alert("Prescription submitted successfully!");

        // Optionally, fetch the updated prescription
        fetchPrescription(selectedPatient.id);

    } catch (error) {
        alert("Error submitting prescription.");
        
    } finally {
        setIsLoading(false);
    }
};

    // Handle editing medication details
    const handleEditMedication = (index) => {
        setEditIndex(index);
        setEditValue({ ...prescription[index] });
    };

    // Save the edited medication
    const handleSaveMedication = (index) => {
        const updatedPrescription = [...prescription];
        updatedPrescription[index] = editValue;
        setPrescription(updatedPrescription);
        setEditIndex(null);
        setEditValue({ name: "", frequency: "", duration: "" });
    };

    // Handle deleting medication
    const handleDeleteMedication = (index) => {
        const updatedPrescription = prescription.filter((_, i) => i !== index);
        setPrescription(updatedPrescription);
    };

    // Handle selecting a patient
    // const handleSelectPatient = (patient) => {
    //     setSelectedPatient(patient);
    //     fetchPrescription(patient.id); // Fetch prescriptions for the selected patient
    // };

    return (
        <div className=" h-screen">
            <Header />
            <main className="flex-1 overflow-auto">
                <div className="h-screen p-8 bg-gray-200">
                    <h1 className="text-3xl font-bold mb-6 text-center">Doctor- Dashboard</h1>
                    <div className="grid grid-cols-12 gap-1 h-full">
                        <div className="col-span-3 bg-blue-950 p-1 rounded-lg shadow-md overflow-y-auto">
                            <h2 className="text-2xl text-white font-bold p-1 mb-4">Queued Patients</h2>
                            <ul className="space-y-2">
                                {patients.map((patient) => (
                                    <li
                                        key={patient.id}
                                        className={` text-white p-3  rounded-md cursor-pointer ${
                                            selectedPatient?.id === patient.id ? "bg-blue-200" : ""
                                        }`}
                                        onClick={() => handleSelectPatient(patient)}
                                    >
                                        {patient.first_name} (Age: {patient.age})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-6 bg-white p-0 rounded-lg shadow-md">
                            {selectedPatient ? (
                                <>
                                    <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
                                    <p className="mb-4">
                                        <strong>Patient's Biodata:</strong>
                                        {` ${selectedPatient.first_name} ${selectedPatient.sur_name}, DOB: ${selectedPatient.date_of_birth},
                                         Gender: ${selectedPatient.gender}, Contact: ${selectedPatient.contact}, Address: ${selectedPatient.address}, Email: ${selectedPatient.email}`}
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 mb-4">
                                        <Input
                                            type="text"
                                            placeholder="Patient Summary"
                                            value={patientSummary}
                                            onChange={(e) => setPatientSummary(e.target.value)}
                                            className="p-2 border rounded-md w-full h-40"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Diagnosis"
                                            value={diagnosis}
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                            className="p-2 border rounded-md w-full h-20"
                                        />
                                    </div>
                                    <div className="flex gap-4 mb-4">
                                        <Input
                                            type="text"
                                            placeholder="Medication Name"
                                            value={medicationName}
                                            onChange={(e) => setMedicationName(e.target.value)}
                                            className="p-2 border rounded-md flex-1"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Frequency"
                                            value={frequency}
                                            onChange={(e) => setFrequency(e.target.value)}
                                            className="p-2 border rounded-md flex-1"
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Duration"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="p-2 border rounded-md flex-1"
                                        />
                                        <Button
                                            onClick={handleAddMedication}
                                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <ul className="mb-4">
                                        {console.log("this -> Prescription data:", prescription)}
                                        {prescription.map((med, index) => (
                                            <li key={index} className="p-2 border rounded-md flex items-center justify-between">
                                                {editIndex === index ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            placeholder="Medication"
                                                            value={editValue.name}
                                                            onChange={(e) =>
                                                                setEditValue({ ...editValue, name: e.target.value })
                                                            }
                                                            className="p-2 border rounded-md w-full"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Frequency"
                                                            value={editValue.frequency}
                                                            onChange={(e) =>
                                                                setEditValue({ ...editValue, frequency: e.target.value })
                                                            }
                                                            className="p-2 border rounded-md w-full"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Duration"
                                                            value={editValue.duration}
                                                            onChange={(e) =>
                                                                setEditValue({ ...editValue, duration: e.target.value })
                                                            }
                                                            className="p-2 border rounded-md w-full"
                                                        />
                                                        <div className="ml-auto flex space-x-2">
                                                            <Button
                                                                 onClick={() => handleSaveMedication(index)}
                                                                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setEditIndex(null);
                                                                    setEditValue({ name: "", frequency: "", duration: "" });
                                                                }}
                                                                className="bg-green-500 text-white p-2 rounded-md hover:bg-gray-700"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex w-full items-center">
                                                        <div className="flex-1">
                                                            <span>
                                                                <strong>Name:</strong> {med.name} | <strong>Frequency:</strong> {med.frequency} | <strong>Duration:</strong> {med.duration}
                                                            </span>
                                                            <div className="ml-30 items-center space-x-2 flex">
                                                                <Button
                                                                    onClick={() => handleEditMedication(index)}
                                                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleDeleteMedication(index)}
                                                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-red-700"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        onClick={handleSubmit}
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 mt-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Processing..." : "Submit Prescription"}

                                    </Button>
                                </>
                            ) : (
                                <div className="text-center">
                                    <img src="/Background_Image_2.jpg" alt="doctor on computer" className="bg-cover inset-0 bg-center opaque-50" />
                                    <p className="text-center font-semibold">Select a patient to proceed.</p>
                                    <ul className="list-none mb-4">
                                        {patients.map((patient) => (
                                            <li key={patient.id} className="cursor-pointer hover:bg-gray-100 p-2" onClick={() => handleSelectPatient(patient)}>
                                                {patient.first_name} {patient.sur_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="col-span-3 bg-blue-200 p-4 rounded-lg shadow-md overflow-y-auto">
                            <h2 className="text-2xl font-semibold mb-4">Interaction checks</h2>
                            {interactionWarnings.length > 0 ? (
                                <ul className="list-disc list-inside space-y-22 bg-yellow-50 p-4 rounded-md">
                                    {interactionWarnings.map((warning, index) => (
                                        <li key={index} className="text-yellow-700 font-medium flex items-center">
                                            <svg
                                                className="w-5 h-5 mr-2 text-yellow-600"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zml-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm0 6a1 1 0 10-2 0V2a1 1 0 102 0V-2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {warning}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-green-600">No drug interactions found</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrescriberDashboard;