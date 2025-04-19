import TextInput from "../components/ui/TextInput.tsx";
import {useForm} from "react-hook-form";
import {Logo} from "../components/ui/Logo.tsx";
import {Button} from "../components/ui/Button.tsx";
import {useLogin} from "../hooks/useLogin.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Loading} from "../components/ui/Loading.tsx";
import {AuthResponse} from "../types/login.ts";
import {useUser} from "../context/UserContext.tsx";


export function Login() {
    const {checkLogin, isLoading } =useLogin();
    const {loginUser} =useUser();
    const methods =useForm();
    const { control ,handleSubmit ,reset} = methods;
    const navigate = useNavigate();
    
    const onSubmit = (data :any ) => {
        checkLogin({email: data.email , password : data.password} ,{
            onSuccess:(data :AuthResponse )=> {
                toast.success(`Welcome back ${data.userDTO.firstName} ${data.userDTO.lastName}`);
                loginUser(data.userDTO);
                reset();
                navigate('/dashboard');
            },
            onError:()=>{
                toast.error("Something went wrong. Please try again.");
                reset();
            } 
        })
    };
    
    if(isLoading) return <Loading />;
    
    return (
        <div className="bg-gray-700 h-screen flex justify-center items-center font-slab p-5">
            <div className="bg-white z-1000 rounded-3xl shadow-lg m-auto w-full lg:w-1/4 p-10">
                <Logo />
                <div className="border-b-2 border-basic mb-5 p-2 text-center">
                    <h1 className="text-3xl font-bold text-secondary ">Login</h1>
                    <p className="text-gray-500 "> please Enter Your credentials </p>
                </div>
                <form className="flex flex-col space-y-6 justify-between" onSubmit={handleSubmit(onSubmit)}>
                <TextInput control={control} name="email" placeholder="Email" required />
                 <TextInput    control={control}
                               label="Password"
                               name="password"
                               placeholder="Password"/>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
}
