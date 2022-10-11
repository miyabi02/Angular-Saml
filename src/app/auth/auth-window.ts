export declare type ResultType = 'success' | 'failed';
export declare type Metrics = { width:number, height: number};
export declare type CallbackFunction = (result: ResultType) => void;
export declare type AuthEvent = {result: ResultType} & Event;
export const DEFAULT_WIDTH = 600;
export const DEFAULT_HEIGHT = 340;
export declare type AuthenticationParams = {
  url: string,
  target?: string
  metrics?: Metrics
  callback: CallbackFunction
};

interface WindowEventMap {
  'authResult': CustomEvent<ResultType>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof WindowEventMap>(type: K, linstener: (this: Window, ev: WindowEventMap[K]) => void): void;
  }
}

export const showAuthWindow = (params: AuthenticationParams) => {
  const target = params.target || '__AUTH_WINDOW__'
  const screenSize = window.screen;

  // ダイアログのサイズ設定
  const width = params.metrics ? params.metrics.width : DEFAULT_WIDTH;
  const height = params.metrics ? params.metrics.height : DEFAULT_HEIGHT;

  // ダイアログの描画位置を中央に設定
  const left = (screenSize.width - width) / 2;
  const top = (screenSize.height - height) / 2;

  const feature = `left=${left}, top=${top}, width=${width}, height=${height}`;

  const authWindow = window.open(params.url, target, feature);
  authWindow?.addEventListener('authResult', (ev) => {
    console.log("EventListener: showAuthWindow");
    params.callback(ev.detail);
    authWindow?.close();
  });
};

export const sendResult = (result: ResultType) => {
  console.log("Callback: sendResult");
  const event = new CustomEvent<ResultType>('authResult', {detail: result});
  window.opener?.dispatchEvent(event);
};
