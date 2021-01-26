import React, { useEffect } from "react";
import MaterialTable from "material-table";
import _ from 'lodash';
import { connect } from "react-redux";
import { fetchCashbacks } from '../actions/cashbacksActions';
import { RootState } from '../store';
import { Cashback } from "../models/cashbacks";

export interface RulesetProps {
    cashbacks: Cashback[];
    fetchCashbacks: () => void;
};


const CashbackComponent: React.FC<RulesetProps> = props => {
    const { cashbacks, fetchCashbacks } = props;
    
    useEffect(() => {
        fetchCashbacks();
    }, []);

    return (
        <div>
            <MaterialTable
                title="Cashback List"
                columns={[
                    { title: 'id', field: '_id', editable: 'never' },
                    { title: 'Transaction Id', field: 'transactionId' },
                    { title: 'Amount', field: 'amount' }
                ]}
                data={cashbacks}
            />
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        cashbacks: _.values(state.cashbacks.items)
    }
}

export default connect(
    mapStateToProps,
    { fetchCashbacks }
)(CashbackComponent);