export interface RulesetState {
    items: any;
    loading: boolean;
    error: String | any;
};

export interface Ruleset {
    _id: string;
    startDate: string;
    endDate: string;
    cashback: number;
    redemptionLimit: number;
    minTransactions: number;
    budget: number;
}

export interface Rulesets {
    [_id: string]: Ruleset;
}
