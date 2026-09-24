// State مرکزی + subscription + setState


const initialState = {

    status: 'adie',

    //seating

    language: 'fa',
    duration:'30',
    theme: 'light',
    sound: 'on',

    //text

    Text:'',
    chars:[],
    input:'',
    currentindex:0,

    //charts

    correct: 0,
    wrong: 0,
    wpm: 0,
    cpm: 0,
    accuracy: 0,

    //time

    startedAt: null,
    remaining: 30,

    //history

    history: [],

};


let state ={...initialState}
let listeners =[]

export function getState(){

    return {...state}
};


export function setState(patch) {

  state = { ...state, ...patch };

  listeners.forEach((callback) => {

    try {
      callback(state);
    } catch (error) {
      console.error('Listener error:', error);
    }
  });
};



export function subscribe(callback){
    listeners.push(callback)

    return function unsubscribe(){
        listeners = listeners.filter((cb) => cb != callback);

    }
};

export function resetState(){

    const  {theme , language,duration, sound, history} = state
     state ={
        ...initialState,
        theme,
        language,
        duration,
        sound,
        history
     };

     listeners.forEach((callback) =>callback(state))

};