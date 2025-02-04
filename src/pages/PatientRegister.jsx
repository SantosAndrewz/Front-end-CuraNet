import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios"; // Axios for making API requests

const PatientRegister = ({ fetchPatients }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        sur_name: "",
        date_of_birth: "",
        gender: "Male",
        contact: "",
        address: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!e.target.reportValidity()) {
            alert("Please fill in all required fields!");
            return;
        }
    
        setIsLoading(true);
        setErrorMessage("");
    
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            let token = localStorage.getItem("accessToken");
    
            // Refresh token if needed
            if (refreshToken) {
                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });
                token = response.data.access;
                localStorage.setItem("accessToken", token);
            }
    
            if (!token) {
                throw new Error("You are not logged in. Please log in and try again.");
            }
    
            const response = await axios.post(
                "http://127.0.0.1:8000/api/patients/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Refetch all patients
            if (typeof fetchPatients === "function") {
                fetchPatients();
            } else {
                console.error("fetchPatients is not a function");
            }

            console.log("Biodata submitted:", response.data);
            alert("Patient registered successfully!");
            setFormData({
                first_name: "",
                sur_name: "",
                date_of_birth: "",
                gender: "",
                contact: "",
                address: "",
                email: "",
            });
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.detail || "Failed to register the patient.");
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <Header
                clinicName="Santos Dental Care"
                userName="Dr. Santos"
                systemName="CuraNet"
            />

            <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative">
                <div className="absolute inset-0 bg-black opacity-60">
                    <img
                        src="Background_Image_1.jpg"
                        alt="a nurse at triage"
                        className="w-full h-full object-cover mix-blend-multiply"
                    />
                </div>
                <div className="flex-grow relative bg-white p-4 rounded-md shadow-lg w-full max-w-3xl z-8 h-auto">
                    <h1 className="text-3xl font-bold text-primary text-center mb-4">
                        Patient Biodata:
                    </h1>
                    {errorMessage && (
                        <div className="text-red-600 text-center mb-4">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium mb-2">First Name:</label>
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Enter First Name"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Surname:</label>
                            <input
                                id="sur_name"
                                type="text"
                                name="sur_name"
                                value={formData.sur_name}
                                onChange={handleChange}
                                placeholder="Enter Surname"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Date of Birth:</label>
                            <input
                                id="date_of_birth"
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md p-1 text-gray-700"
                                required
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Telephone Number:</label>
                            <input
                                id="contact"
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="+256-700-123-456"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Physical Address:</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Email Address:</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="filled"
                            color="primary"
                            size="lg"
                            className="w-full mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Register Patient"}
                        </Button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PatientRegister;
