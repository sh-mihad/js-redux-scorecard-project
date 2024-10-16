//select the element
const matchContainer = document.getElementById("match-container");
const addAnotherMatchEL = document.getElementById("add-match");

// action name
const ADD_ANOTHER_MATCH = "addANotherMatch";
const DELETE_Match = "deleteMatch";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";

// action creator func
const addAnotherAction = () => {
  return {
    type: ADD_ANOTHER_MATCH,
  };
};
const deleteMatchAction = (id) => {
  return {
    type: DELETE_Match,
    payload: {
      id: id,
    },
  };
};
const incrementAction = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id,
      value,
    },
  };
};
const decrementAction = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id,
      value,
    },
  };
};
const resetAction = () => {
  return {
    type: RESET,
  };
};

// initial state
const initialState = [
  {
    id: 1,
    value: 0,
  },
  {
    id: 2,
    value: 0,
  },
];

// reducer function
const scorecardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANOTHER_MATCH:
      const newMatch = {
        id: state.length + 1,
        value: 0,
      };
      return [...state, newMatch];
    case DELETE_Match:
      return state.filter((match) => match.id !== action.payload.id);
    case INCREMENT:
      return state.map((item) => {
        if (item?.id === action.payload.id) {
          return { ...item, value: item?.value + action.payload.value };
        } else {
          return item;
        }
      });
    case DECREMENT:
      return state.map((item) => {
        if (item?.id === action.payload.id) {
          return { ...item, value: item?.value - action.payload.value };
        } else {
          return item;
        }
      });
    case RESET:
      return state.map((item) => {
        return { ...item, value: 0 };
      });
    default:
      return state;
  }
};

const store = Redux.createStore(scorecardReducer);
const render = () => {
  const dynamicHtml = store.getState().map(
    (item) => `
         <div class="match">
          <div class="wrapper">
            <button class="lws-delete" id="delete-${item.id}">
              <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">Match ${item?.id}</h3>
          </div>
          <div class="inc-dec">
            <form class="incrementForm">
              <h4>Increment</h4>
              <input type="number" name="increment" class="lws-increment" />
            </form>
            <form class="decrementForm">
              <h4>Decrement</h4>
              <input type="number" name="decrement" class="lws-decrement" />
            </form>
          </div>
          <div class="numbers">
            <h2 class="lws-singleResult">${item?.value}</h2>
          </div>
        </div>
        `
  );

  matchContainer.innerHTML = dynamicHtml;

  store.getState().forEach((item) => {
    const deleteButtonEl = document.getElementById(`delete-${item?.id}`);
    deleteButtonEl.addEventListener("click", () => {
      store.dispatch(deleteMatchAction(item?.id));
    });
  });
};

store.subscribe(render);

render();

addAnotherMatchEL.addEventListener("click", () => {
  store.dispatch(addAnotherAction());
});
