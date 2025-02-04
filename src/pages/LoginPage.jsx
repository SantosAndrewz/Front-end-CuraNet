import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shake, setShake] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username,
                password,
            });

            const { access, refresh, group} = response.data;

            // Store tokens in localStorage
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('group', response.data.group);

            // Navigate based on user roles (you may want to customize this)
            if (group === "Triage_nurse") {
                navigate("/triage");
            } else if (group === "Prescriber") {
                navigate("/prescriber");
            } else if (group === "Pharmacist") {
                navigate("/pharmacy");
            } else if (group === "Admin") {
                navigate("/admin");
            }
        } catch (error) {
            setError("Incorrect username or password");
            setShake(true);
            setTimeout(() => setShake(false), 300);
        }
    };

    return (
        <section className="relative h-screen">
            <div className="absolute inset-0 z-0 ">
                <img src="/Background_Image.jpg" alt="IT health practitioner background" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 z-10 bg-black-200 opacity-80 flex justify-center items-center">
                <div className="relative bg-white p-8 rounded-lg shadow-lg w-98">
                    <h2 className="text-2xl font-bold text-center mb-4 ">Login</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <form onSubmit={handleLogin} className={shake ? "shake" : ""}>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full p-3 mb-4 border border-gray-300 rounded"
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="p-3 border rounded-md w-full border-gray-300"
                            required
                        />
                        <Button
                            type="submit"
                            variant="filled"
                            color="primary"
                            size="lg"
                            className="w-full"
                            required
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Input from "../components/Input";
// import Button from "../components/Button";

// const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [shake, setShake] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         if (username === "admin" && password === "adminPassword") {
//             navigate("/admin-dashboard");
//         } else if (username === "triageUser" && password === "triagePassword") {
//             navigate("/triage");
//         } else if (username === "doctorUser" && password === "doctorPassword") {
//             navigate("/prescriber");
//         } else if (username === "pharmacistUser" && password === "pharmacistPassword") {
//             navigate("/pharmacy");
//         } else {
//             setError("Incorrect username or password");
//             setShake(true);
//             setTimeout(() => setShake(false), 300);
//         }
//     };

//     return (
//         <section className="relative h-screen">
//             <div className="absolute inset-0 z-0 ">
//                 <img src="/Background_Image.jpg" alt="IT health practitioner background" className="w-full h-full object-cover" />
//             </div>
//             <div className="absolute inset-0 z-10 bg-black-200 opacity-80 flex justify-center items-center">
//                 <div className="relative bg-white p-8 rounded-lg shadow-lg w-98">
//                     <h2 className="text-2xl font-bold text-center mb-4 ">Login</h2>
//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                     <form onSubmit={handleLogin} className={shake ? "shake" : ""}>
//                         <Input
//                             type="text"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             placeholder="Enter username"
//                             className="w-full p-3 mb-4 border border-gray-300 rounded"
//                             required
//                         />
//                         <Input
//                         type="password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter password"
//                         className="p-3 border rounded-md w-full border-gray-300"
//                         required
//                         />
//                         <Button
//                             type="submit"
//                             variant="filled"
//                             color="primary"
//                             size="lg"
//                             className="w-full"
//                             required
//                         >
//                             Login
//                         </Button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default LoginPage;