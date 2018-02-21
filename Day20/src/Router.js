// @flow

type Handler = (context: Object, variable: ?string) => mixed;

export default class Router {
  handlerList: {[string]: Handler} = {};
  addRoute(pattern: string, handler: Function) {
    this.handlerList[pattern] = handler;
  }
  handleRequest(
    path: string,
    context: Object,
    errorHandler: Function = () => {},
  ) {
    let handler = null;
    let variable = null;
    for (let key of Object.keys(this.handlerList)) {
      if (path.startsWith(key)) {
        handler = this.handlerList[key];
        variable = path.slice(key.length);
      }
    }
    if (handler) {
      handler(context, variable);
    } else {
      errorHandler(context);
    }
  }
}
