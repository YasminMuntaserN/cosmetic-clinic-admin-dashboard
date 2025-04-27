export function Avatar({role , src}:{role?:string ,src?:string }) {
    return (
            <img
                src={src ?src : role=== "Admin" ? "/Admin.png" : role=== "Doctor" ? "/Doctor.png" :"/Patient.jpg" }
                alt="role"
                className="w-10 h-10 rounded-full"
            />
                
    );
}