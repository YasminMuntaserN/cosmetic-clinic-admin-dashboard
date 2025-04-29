import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Doctors} from './pages/Doctors';
import {Patients} from './pages/Patients';
import {Appointments} from './pages/Appointments';
import {Products} from './pages/Products';
import {Treatments} from "./pages/Treatments.tsx";
import {Schedule} from "./pages/Schedule.tsx";
import {ChatProvider} from "./context/ChatContext.tsx";
import ChatPanel from "./components/Chat/ChatPanel.tsx";
import {SignalRProvider} from "./context/SignalRContext.tsx";
import {Toaster} from "react-hot-toast";
import {DoctorProfile} from "./pages/DoctorProfile.tsx";
import {PatientProfile} from "./pages/PatientProfile.tsx";
import {ProductProfile} from "./pages/ProductProfile.tsx";
import {TreatmentProfile} from "./pages/TreatmentProfile.tsx";
import {Settings} from "./pages/Settings.tsx";
import {Login} from "./pages/Login.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {useEffect, useState} from "react";
import {UserProvider} from "./context/UserContext.tsx";
import {ProtectedRoute} from "./pages/ProtectedRoute.tsx";
import {PageNotFound} from "./pages/PageNotFound.tsx";
import {Reports} from "./pages/Reports.tsx";
import {getTokens} from "./services/AuthService.ts";
import Unauthorized from "./components/ui/Unauthorized.tsx";
import {Permission} from "./types/Permission.ts";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const {accessToken} = getTokens();
        setIsAuthenticated(!!accessToken);
    }, []);

    return (
        <Router>
            <UserProvider>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{margin: "8px"}}
                    toastOptions={{
                        success: {duration: 3000},
                        error: {duration: 5000},
                        style: {
                            fontSize: '16px',
                            maxWidth: '500px',
                            padding: '16px 24px',
                            border: "#FBD909",
                        },
                    }}
                />
                <Routes>
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"}/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/doctors" element={<Doctors/>}/>
                        <Route path="/doctorProfile/:doctorId" element={<DoctorProfile/>}/>
                        <Route path="/patients" element={<Patients/>}/>
                        <Route path="/patientProfile/:patientId" element={<PatientProfile/>}/>
                        <Route path="/appointments" element={<Appointments/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/productProfile/:productId" element={<ProductProfile/>}/>
                        <Route path="/treatments" element={<Treatments/>}/>
                        <Route path="/treatmentProfile/:treatmentId" element={<TreatmentProfile/>}/>
                        <Route path="/schedule" element={<Schedule/>}/>
                        <Route path="/reports" element={<Reports/>}/>
                        <Route path="/chat/:userId" element={
                            <Unauthorized permission={Permission.MangeChats}>
                                <SignalRProvider>
                                    <ChatProvider>
                                        <ChatPanel/>
                                    </ChatProvider>
                                </SignalRProvider>
                            </Unauthorized>
                        }/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </UserProvider>
        </Router>
    );
}

export default App;
