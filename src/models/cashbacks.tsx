export interface CashbackState {
    items: any;
    loading: boolean;
    error: String | any;
};

export interface Cashback {
    _id: string;
    transactionId: number;
    amount: number;
}

export interface Cashbacks {
    [_id: string]: Cashback;
}
