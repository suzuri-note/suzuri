declare module 'javascript-time-ago' {
    export = JavascriptTimeAgo;
}

declare module 'javascript-time-ago/locale/en' {
    var i: ILocales;

    export = i;
}

declare class JavascriptTimeAgo {
    constructor(locales: string | string[]);

    format(input: Date | number, style?: IStyle | string): string;
    formatValue(value: number, unit: string, localeData: ILocales | ILocaleData): string;
    getRule(value: number, unit: string, localeData: ILocales | ILocaleData): string;
    formatNumber(number: number): string;
    getFormatter(flavor: string): any; // `Intl.RelativeTimeFormat` instance
    getLocaleData(flavor: string | string[]): IFlavour;

    static getDefaultLocale(): string;
    static setDefaultLocale(locale: string): void;
    static addLocale(localeData: ILocales | ILocaleData): void;
}

interface IStyle {
    flavour: IFlavour;
    now?: number;
    custom?(value: ICustomArgs): void;
    units?: string[];
    gradation?: IGradation[];
}

interface IFlavour {
    flavour: string;
    localeData: ILocaleData;
}

interface ICustomArgs {
    now: number;
    date: Date | number;
    time: number;   
    elapsed: number;
    locale: string;
}

interface IGradation {
    unit: string;
    factor: number;
    threshold: number;
    granularity?: number;
    format?(input: Date | number, locale: string): string;
}

interface ILocales {
    locale: string;
    long: ILocaleData;
    short: ILocaleData;
    narrow: ILocaleData;
    quantify(value: number): string;
    'short-time'?: ILocaleData;
    'short-convenient'?: ILocaleData;
    'long-time'?: ILocaleData;
    'long-convenient'?: ILocaleData;
    'tiny'?: ILocaleData;
}

interface ILocaleData {
    quarter: IDateExpression;
    month: IDateExpression;
    week: IDateExpression;
    day: IDateExpression;
    hour: ITimeExpression;
    minute: ITimeExpression;
    second: ITimeExpression;
}

interface IDateExpression {
    previous: string;
    current: string;
    next: string;
    past: INounFormOneOther;
    future: INounFormOneOther;
}

interface ITimeExpression {
    current: string;
    past: INounFormOneOther;
    future: INounFormOneOther;
}

interface INounFormOneOther {
    one: string;
    other: string;
}