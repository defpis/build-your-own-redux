function renderTitle(newTitle: any, oldTitle: any = {}): void {
  if (newTitle === oldTitle) {
    return;
  }
  const titleDOM = document.getElementById('title');
  if (!titleDOM) {
    return;
  }
  console.log('render title...');
  titleDOM.innerHTML = newTitle.text;
  titleDOM.style.color = newTitle.color;
}

function renderContent(newContent: any, oldContent: any = {}): void {
  if (newContent === oldContent) {
    return;
  }
  const contentDOM = document.getElementById('content');
  if (!contentDOM) {
    return;
  }
  console.log('render content...');
  contentDOM.innerHTML = newContent.text;
  contentDOM.style.color = newContent.color;
}

function renderApp(newAppState: any, oldAppState: any = {}): void {
  if (newAppState === oldAppState) {
    return;
  }
  console.log('render app...');
  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function stateChanger(state: any, action: any): any {
  if (!state) {
    return {
      title: {
        text: 'React.js 小书',
        color: 'red',
      },
      content: {
        text: 'React.js 小书内容',
        color: 'blue',
      },
    };
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text,
        },
      };
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color,
        },
      };
    default:
      return state;
  }
}

function createStore(stateChanger: any): any {
  let state: any = null;
  const listeners: any[] = [];
  const getState = (): any => state;
  const dispatch = (action: any): void => {
    state = stateChanger(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener: any): any => {
    listeners.push(listener);
    const unsubscribe = (): void => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
    return unsubscribe;
  };
  dispatch({});
  return { getState, dispatch, subscribe };
}

const store = createStore(stateChanger);
let oldAppState = store.getState();
const unsubscribe = store.subscribe(() => {
  const newAppState = store.getState();
  renderApp(newAppState, oldAppState);
  oldAppState = newAppState;
});

renderApp(store.getState());
setTimeout(() => {
  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' });
  // unsubscribe();
  setTimeout(() => {
    store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' });
  }, 1000);
}, 1000);
