export function Avatar({role}:{role?:string }) {
    return (
            <img
                src={role=== "Admin" ? "/Admin.png" : role=== "Doctor" ? "/Doctor.png" :"/Patient.jpg" }
                alt="role"
                className="w-10 h-10 rounded-full"
            />
                
    );
}