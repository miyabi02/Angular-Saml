export declare type ResultType = 'success' | 'failed';
export declare type Metrics = { width: number; height: number };
// export declare type CallbackFunction = (result: ResultType) => void;
export declare type CallbackFunction = (result: AuthResult) => void;
// ! メモ: AuthEventの使い方がわからない。
export declare type AuthEvent = { result: ResultType } & Event;
export declare type AuthResult = {
  result: ResultType;
  data: Record<string, string>;
};
export const DEFAULT_WIDTH = 600;
export const DEFAULT_HEIGHT = 340;
export declare type AuthenticationParams = {
  url: string;
  target?: string;
  metrics?: Metrics;
  callback: CallbackFunction;
};

interface WindowEventMap {
  authResult: CustomEvent<AuthResult>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof WindowEventMap>(
      type: K,
      linstener: (this: Window, ev: WindowEventMap[K]) => void
    ): void;
  }
}

export const showAuthWindow = (params: AuthenticationParams) => {
  const target = params.target || '__AUTH_WINDOW__';
  const screenSize = window.screen;

  // ダイアログのサイズ設定
  const width = params.metrics ? params.metrics.width : DEFAULT_WIDTH;
  const height = params.metrics ? params.metrics.height : DEFAULT_HEIGHT;

  // ダイアログの描画位置を中央に設定
  const left = (screenSize.width - width) / 2;
  const top = (screenSize.height - height) / 2;

  const feature = `left=${left}, top=${top}, width=${width}, height=${height}`;

  const authWindow = window.open(params.url, target, feature);
  window.addEventListener('authResult', (ev) => {
    console.log('showAuthWindow Event=authResult Fire');
    params.callback(ev.detail);
    authWindow?.close();

    // 認証ウィンドウを呼び出すたびに、listenerが増えるため削除（サンプルのため横着）
    window.removeAllListeners!('authResult');
  });
};

export const sendResult = (data: AuthResult) => {
  console.log('sendResult begin'); // 子画面で実行するので出力されても見えない
  const event = new CustomEvent<AuthResult>('authResult', { detail: data });
  window.opener?.dispatchEvent(event);
};
