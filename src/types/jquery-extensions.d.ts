// types/jquery-extensions.d.ts
import 'jquery';

declare module 'jquery' {
  interface JQuery<TElement = HTMLElement> {
    init_formConditions(options?: { conditions?: any }): JQuery<TElement>;
    apply_conditions(element: any): any;
  }
  interface JQuery {
    initFxbConditions(options: Partial<FxbOptions>): JQuery;
  }

  interface JQueryStatic {
    fn: any; // Explicitly declare `fn` to avoid "any" errors.
  }
}
