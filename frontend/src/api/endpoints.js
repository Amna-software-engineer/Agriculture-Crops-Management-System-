export const AuthEndPoints = {
    login: "/auth/login",
    register: "/auth/register",
};
export const CropEndPoints = {
    crop:"/crops"
};
export const OrderEndPoints = {
    order:"/order"
};
export const UserEndPoints = {
    user:"/user",
    editUser:(id)=>`/user/${id}`,
    deleteUser:(id)=>`/user/${id}`,  
};
