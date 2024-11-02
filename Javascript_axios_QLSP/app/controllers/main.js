import { productServices } from "../services/productServices.js";

const renderProductList = (arrProduct) => {
    console.log("arrProduct: ", arrProduct);

    // cách 1 : dùng for
    // let content = "";

    // for (let index = 0; index < arrProduct.length; index++) {
    //     let product = arrProduct[index];
    //     const { id, name, price, image, description } = product;

    //     let contentTr = `
    //         <tr>
    //             <td>${id}</td>
    //             <td>${name}</td>
    //             <td>${price}</td>
    //             <td>
    //                 <img src="${image}" />
    //             </td>
    //             <td>${description}</td>
    //             <td>
    //                 <button type="button" class="btn btn-warning" onclick="editProduct('${id}')">Edit</button>
    //                 <button type="button" class="btn btn-danger" onclick="delProduct('${id}')">Xóa</button>
    //             </td>
    //         </tr>
    //     `;

    //     content += contentTr;
    // }

    // cách 2: dùng map
    const content = arrProduct
        .map(
            ({ id, name, price, image, description }) => `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>
                <img src="${image}" width="200" />
            </td>
            <td>${description}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick="editProduct('${id}')">Edit</button>
                <button type="button" class="btn btn-danger" onclick="delProduct('${id}')">Xóa</button>
            </td>
        </tr>
    `
        )
        .join(""); // join to concatenate all rows into a single string

    document.querySelector("#tblDanhSachSP").innerHTML = content;
};

const fetchProductList = () => {
    productServices
        .getProduct()
        .then((response) => {
            console.log("response: ", response.data);

            renderProductList(response.data);
        })
        .catch((error) => {
            console.error("error: ", error);
        });
};

fetchProductList();

// xóa sản phẩm
const delProduct = (id) => {
    productServices
        .delProduct(id)
        .then((response) => {
            console.log("response: ", response);

            fetchProductList();
        })
        .catch((err) => {
            console.log("err: ", err);
        });
};

window.delProduct = delProduct;
