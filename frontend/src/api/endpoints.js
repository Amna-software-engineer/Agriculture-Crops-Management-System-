export const AuthEndPoints = {
    login: "/auth/login",
    register: "/auth/register",
};
export const CropEndPoints = {
    crop: "/crops",
    editCropStuts: (id) => `/crops/status/${id}`,
    editCrop: (id) => `/crops/${id}`,
    deleteCrop: (id) => `/crops/${id}`,
};
export const OrderEndPoints = {
    order: "/order",
    editOrderStuts: (id) => `/order/status/${id}`,
};
export const UserEndPoints = {
    user: "/user",
    editUser: (id) => `/user/${id}`,
    deleteUser: (id) => `/user/${id}`,
};
