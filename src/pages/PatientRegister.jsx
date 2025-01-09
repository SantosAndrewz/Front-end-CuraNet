import { useState} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PatientRegister = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        surname: "",
        age: "",
        gender: "male",
        contact: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        if (!form.reportValidity()) {
            alert("Please fill in all the required fields!");
        } else {
            setIsLoading(true);
            setTimeout(() => {
                console.log("Biodata submitted:", formData);
                setIsLoading(false);
            }, 1500);
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
                    <img src="Background_Image_1.jpg" alt="a nurse at triage" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow relative bg-white p-4 rounded-md shadow-lg w-full max-w-3xl z-8 h-auto ">
                    <h1 className="text-3xl font-bold text-primary text-center mb-4">
                        Patient Biodata:
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium mb-2">
                                First Name:
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter First Name"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">
                                Surname:
                            </label>
                            <input
                                id="surname"
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="Enter Surname"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">
                                Age:
                            </label>
                            <input
                                id="gender"
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter age in years"
                                min="0"
                                className="w-full p-1 border-gray-300 rounded-md text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-md p-1 text-gray-700"
                                required
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">
                                Telephone Number:
                            </label>
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
                            <label className="block text-lg font-medium mb-2">
                                Physical Address:
                            </label>
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
            <Footer/>
        </>
    );
};

export default PatientRegister;