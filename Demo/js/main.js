let name = "Nguyễn Văn A";
console.log("name: ", name);

let age = 20;
console.log("age: ", age);

// setTimeout: chờ trong 1 khoảng thời gian mới thực hiện code
setTimeout(() => {
    // logic cần xử lý sẽ chạy sau 1000ms
    console.log("ok");
}, 1000);

console.log("after setTimeout");

// callback function

// promise: có 3 trạng thái - pending, resolve(success), reject(fail)
// promise: sử dụng khi có những api, những tác vụ riêng lẻ đơn giản
let number = 10;
const myPromise = new Promise((resolve, reject) => {
    // thực thi các tác vụ bất đồng bộ (call api )
    setTimeout(() => {
        if (number > 10) {
            reject("fail");
        }

        resolve("true");
    }, 1000);
});

myPromise
    .then((response) => {
        // khi success chạy vào then
        console.log("response: ", response);
    })
    .catch((error) => {
        // fail chạy vào cacth

        console.log("error: ", error);
    });

// promise giải quyết vấn đề callback hell
// Khi có nhiều api phụ thuộc vào nhau
// promise chaning
function doSomething() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Other things to do before completion of the promise
            console.log("Did something");
            // The fulfillment value of the promise
            resolve("https://example.com/");
        }, 200);
    });
}

// doSomething, doSomethingElse, doThirdThing: những promise
// doSomething()
//     .then(function (result) {
//         // result: tại đây là kết quả trả về của doSomething
//         return doSomethingElse(result);
//     })
//     .then(function (newResult) {
//         // newResult: kết quả trả về của doSomethingElse
//         return doThirdThing(newResult);
//     })
//     .then(function (finalResult) {
//         // finalResult: kết quả trả về của doThirdThing
//         console.log(`Got the final result: ${finalResult}`);
//     })
//     .catch(failureCallback);

// khi có nhiều api không phụ thuộc vào nhau và cần request cùng lúc => Promise.all

// ES7: async await
// Khi có nhiều api phụ thuộc vào nhau và giúp cho code trở nên đồng bộ, dễ hiểu
async function fetchData() {
    try {
        // API 1
        const response = await fetch(
            "https://65fc26b514650eb2100ba786.mockapi.io/produc"
        );
        const data = response.json();
        console.log("data: ", data);

        // API2: chờ data từ API1 để xử lý tiếp
        const response2 = await fetch(
            "https://65fc26b514650eb2100ba786.mockapi.io/products"
        );
        const data2 = response.json();
        console.log("data2: ", data2);
    } catch (error) {
        console.log("error: ", error);
    }
}
fetchData();
