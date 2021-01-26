import React, { useEffect } from "react";
import MaterialTable from "material-table";
import _ from 'lodash';
import { connect } from "react-redux";
import { fetchTransactions, addTransaction, deleteTransaction } from '../actions/transactionsActions';
import { RootState } from '../store';
import { Transaction } from "../models/transaction";

export interface TransactionProps {
    transactions: Transaction[];
    fetchTransactions: () => void;
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (rulesetId: String) => void;
};


const TransactionComponent: React.FC<TransactionProps> = props => {
    const { transactions, fetchTransactions, addTransaction, deleteTransaction } = props;
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [addTransaction, deleteTransaction]);

    return (
        <div>
            <MaterialTable
                title="Transaction List"
                columns={[
                    { title: 'id', field: '_id', editable: 'never' },
                    { title: 'Date', field: 'date' },
                    { title: 'Transaction Id', field: 'id' },
                    { title: 'Customer Id', field: 'customerId' }
                ]}
                data={transactions}
                editable={{
                    onRowAdd: transaction =>
                        new Promise(resolve => {
                            addTransaction(transaction);
                            resolve(fetchTransactions());
                        }),
                    onRowDelete: transaction =>
                        new Promise((resolve, reject) => {
                            deleteTransaction(transaction._id);
                            resolve(fetchTransactions())
                        }),
                }}
            />
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        transactions: _.values(state.transactions.items)
    }
}

export default connect(
    mapStateToProps,
    { fetchTransactions, addTransaction, deleteTransaction }
)(TransactionComponent);
