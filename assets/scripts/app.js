const data = Array.from({ length: 100 })
    .map((_, i) => `Item ${(i + 1)}`);

let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage)
}

const html = {
    get(element) {
        return document.querySelector(element);
    }
}

const controls = {
    next() {
        state.page++;
        const lastPage = state.page > state.totalPage;
        if (lastPage) {
            state.page--;
        }
    },
    prev() {
        state.page--;
        const firstPage = state.page < 1;
        if (firstPage) {
            state.page++;
        }
    },
    goTo(page) {
        state.page = page;
        const lasttPage = state.page > state.totalPage;
        const firstPage = state.page < 1;

        if (lasttPage) {
            state.page = state.totalPage;
        }

        if (firstPage) {
            state.page = 1;
        }
    },
    createListners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1);
            update();
            console.log('Entrou')
        });

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage);
            update();
        });

        html.get('.next').addEventListener('click', () => {
            controls.next();
            update();
        });

        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update();
        });
    }
}

const list = {
    create(item){
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = item;
        
        html.get('.list').appendChild(div);
    },
    update(){
        html.get(`.list`).innerHTML = "";
        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;

        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(list.create)
    }
}

function update() {
    list.update();
};

function init(){
    list.update();
    controls.createListners();
}

init();

console.log(state.page);
controls.goTo(-22);
console.log(state.page + " de " + state.totalPage);
