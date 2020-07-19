import {createStore} from "redux";

const initialState = {
    selectedTab: 'online',
    cart: [],
    cartCounter: 0,
}

const reducer = (state = initialState, action) => {    
    // console.log(action);
    switch (action.type) {
        case "online":
            return Object.assign({}, state, {selectedTab: "online"});

        case "meeting":
            return Object.assign({}, state, {selectedTab: "meeting"});
            
        case "cart-add-item":
            let cart = [...state.cart];
            const item_existance = cart.filter(item => item.frm_id == action.item.frm_id);
            if(item_existance.length == 0){
                cart.push(action.item);
                action.notify("Formation ajoutée au panier");
            }
            localStorage.setItem('mcs-cart', JSON.stringify(cart));
            return Object.assign({}, state, { cart: cart, cartCounter: cart.length });
            
        case "cart-remove-item":
            let cart2 = [...state.cart];
            const item_index = cart2.map(i => i.frm_id).indexOf(action.frm_id);
            cart2.splice(item_index, 1);
            localStorage.setItem('mcs-cart', JSON.stringify(cart2));
            return Object.assign({}, state, { cart: cart2, cartCounter: cart2.length });

        case "remove-all-from-cart":
            localStorage.setItem('mcs-cart', JSON.stringify([]));
            return Object.assign({}, state, { cart: [], cartCounter: 0 });

        default:
            let cart3 = localStorage.getItem('mcs-cart');
            if(cart3 != null){
                cart3 = JSON.parse(cart3);
                state.cart = cart3;
                state.cartCounter = cart3.length;
            }
            return state;
    }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;