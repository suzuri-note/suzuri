export default interface ILocale {
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