function populateList() {
    const data = Array.from({ length: 100 })
        .map((_, i) => `<div class="item">Item ${(i + 1)}</div>`);

    // for(let i = 0; i < 100; i++ ){
    //     data.push(`<div class="item">Item ${(i + 1)}</div>`);
    // }

    const list = document.querySelector('#paginate .list');
    list.innerHTML = data.join("");

    return data;
}

const data = populateList();

let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage)
}


const controls = {
    next() {
        state.page++;
        const lastPage = state.page > state.totalPage;
        if (lastPage) {
            state.page--;
        }
    },
    prev() { },
    goTo() { }
}

console.log(state.totalPage);
controls.next(state.page);
console.log(state.totalPage);
