// axios
// console.log("axios", axios()); // axios trả về 1 cái promise
// axios({
//     url: "https://65fc26b514650eb2100ba786.mockapi.io/products",
//     method: "GET",
// })
//     .then((response) => {
//         console.log("response: ", response);
//     })
//     .catch((err) => {
//         console.log("err: ", err);
//     });
// khi nào là promise mới .then, .catch
const BASE_URL = "https://65fc26b514650eb2100ba786.mockapi.io/productList";

export const productServices = {
    // lấy data về để hiển thị lên giao diện
    getProduct: () => {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },

    // xóa sp
    delProduct: (id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        });
    },

    // thêm sản phẩm
    addProduct: (product) => {
        return axios({
            url: BASE_URL,
            method: "POST",
            data: product,
        });
    },

    // lấy item theo id
    getProductByID: (id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "GET",
        });
    },

    // cập nhật product theo id
    updateProduct: (id, product) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: product,
        });
    },
};
