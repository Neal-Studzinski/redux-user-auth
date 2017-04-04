import { createStore } from 'redux'
import Server from './server.js'
export default function app() {

const storeDispatchProcessor = function (state,action) {



}

const store = createStore(storeDispatchProcessor);
const server = new Server(store)
  //const views = new Views(store)

  server.queryServer();


}
