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
    getProduct: () => {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },
    delProduct: (id) => {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        });
    },
};
