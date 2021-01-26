export interface TransactionState {
    items: any;
    loading: boolean;
    error: String | any;
};

export interface Transaction {
    _id: string;
    transactionId: number;
    amount: number;
}

export interface Transactions {
    [_id: string]: Transaction;
}
