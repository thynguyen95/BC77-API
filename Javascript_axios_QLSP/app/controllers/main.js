import Product from "../models/product.js";
import { productServices } from "../services/productServices.js";
import { getEle } from "../util/util.js";
import { kiemTraRong, kiemTraSo } from "../util/validation.js";

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

const getInfo = () => {
    let id = getEle("#MaSP").value;
    let name = getEle("#TenSP").value;
    let price = getEle("#GiaSP").value;
    let image = getEle("#HinhSP").value;
    let description = getEle("#MotaSP").value;

    console.log({ id, name, price, image, description });

    return new Product(id, name, price, image, description);
};

const resetForm = () => {
    getEle("#MaSP").value = "";
    getEle("#TenSP").value = "";
    getEle("#GiaSP").value = "";
    getEle("#HinhSP").value = "";
    getEle("#MotaSP").value = "";
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

// disable btn cập nhật khi làm chức năng thêm mới
getEle("#btnThemSP").onclick = () => {
    getEle("#btnCapNhat").disabled = true;
};

// thêm sp
const addProduct = () => {
    // lấy thông tin từ form
    const product = getInfo();
    console.log("product: ", product);

    // boolean + &&
    // true && true => true
    // true && false => falsse

    // a = a + b => a+=b
    // isValid = isValid && xxx => isValid&=
    // true = false & true => false

    // kiểm tra tên sp
    let isValid = kiemTraRong(
        product.name,
        "#errTenSP",
        "Tên sản phẩm không được để trống !"
    );

    // kiểm tra giá không được để rỗng và chỉ được nhập số
    isValid &=
        kiemTraRong(product.price, "#errGiaSP", "Giá không được để rỗng") &&
        kiemTraSo(product.price, "#errGiaSP", "chỉ được nhập số");
    // true      && false => false

    console.log("isValid: ", isValid);

    if (isValid) {
        productServices
            .addProduct(product)
            .then((response) => {
                console.log("response: ", response);

                fetchProductList();

                // reset form
                resetForm();

                $("#myModal").modal("hide");

                // trả lại trạng thái bình thường cho btn cập nhật sau khi thêm thành công
                getEle("#btnCapNhat").disabled = false;
            })
            .catch((error) => {
                console.error("error: ", error);
            });
    }
};

window.addProduct = addProduct;

// chức năng edit
// click btn edit => hiển thị form có chứa thông tin của item
// click btn => call api để lấy thông tin item cần edit dựa theo id => hiển thị lên form => bật form lên
// lấy thông sp cần sửa show lên form
const editProduct = (id) => {
    productServices
        .getProductByID(id)
        .then((response) => {
            console.log("response: ", response.data);
            const sp = response.data;

            // hiển thị thông tin lên modal
            getEle("#MaSP").value = sp.id;
            getEle("#TenSP").value = sp.name;
            getEle("#GiaSP").value = sp.price;
            getEle("#HinhSP").value = sp.image;
            getEle("#MotaSP").value = sp.description;

            // disable btn thêm
            getEle("#btnThem").disabled = true;
            getEle("#btnCapNhat").disabled = false;

            // mở modal
            $("#myModal").modal("show");
        })
        .catch((error) => {
            console.error("error: ", error);
        });
};

window.editProduct = editProduct;

// Lấy thông tin từ form sau khi đã edit để cập nhật
const updateProduct = () => {
    const sp = getInfo();
    console.log("sp: ", sp);

    productServices
        .updateProduct(sp.id, sp)
        .then((response) => {
            console.log("response: ", response);

            // reset form
            resetForm();

            // tắt modal sau khi update thành công
            $("#myModal").modal("hide");

            // lấy data mới nhất
            fetchProductList();

            // bật lại btn Thêm
            getEle("#btnThem").disabled = false;
        })
        .catch((error) => {
            console.error("error: ", error);
        });
};

window.updateProduct = updateProduct;

// search sản phẩm theo tên
const searchProductByName = () => {
    const keyword = getEle("#txtSearch").value.trim().toLowerCase();

    productServices
        .getProduct()
        .then((response) => {
            console.log("response: ", response);

            // array data
            const productList = response.data;

            // tìm kiếm keyword mà ng dùng nhập
            // includes: kiểm tra chuỗi có chứa chuỗi được truyền vào hay ko
            const result = productList.filter((sp) => {
                return sp.name.toLowerCase().includes(keyword);
            });

            if (result.length > 0) {
                renderProductList(result);
            } else {
                console.log("sp này không tồn tại");
            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
};

window.searchProductByName = searchProductByName;
