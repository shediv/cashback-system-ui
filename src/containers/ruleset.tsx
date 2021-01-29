import React, { useEffect } from "react";
import MaterialTable from "material-table";
import _ from 'lodash';
import { connect } from "react-redux";
import { fetchRulesets, addRuleset, deleteRuleset } from '../actions/rulesetsActions';
import { RootState } from '../store';
import { Ruleset } from "../models/rulesets";

export interface RulesetProps {
    rulesets: Ruleset[];
    fetchRulesets: () => void;
    addRuleset: (ruleset: Ruleset) => void;
    editRuleset: (ruleset: Ruleset) => void;
    deleteRuleset: (rulesetId: String) => void;
};


const RulesetComponent: React.FC<RulesetProps> = props => {
    const { rulesets, fetchRulesets, addRuleset, editRuleset, deleteRuleset } = props;
    
    useEffect(() => {
        fetchRulesets();
    }, []);

    useEffect(() => {
        fetchRulesets();
    }, [addRuleset, deleteRuleset]);

    return (
        <div>
            <MaterialTable
                title="Ruleset List"
                columns={[
                    { title: 'id', field: '_id', editable: 'never' },
                    { title: 'Start Date', field: 'startDate' },
                    { title: 'End Date', field: 'endDate' },
                    { title: 'Cashback', field: 'cashback', type: 'numeric' },
                    { title: 'RedemptionLimit', field: 'redemptionLimit', type: 'numeric' },
                    { title: 'Min Transactions', field: 'minTransactions', type: 'numeric' },
                    { title: 'Budget', field: 'budget', type: 'numeric' },
                ]}
                data={rulesets}
                editable={{
                    onRowAdd: ruleset =>
                        new Promise(resolve => {
                            addRuleset(ruleset);
                            resolve(fetchRulesets());
                        }),
                    onRowDelete: ruleset =>
                        new Promise((resolve, reject) => {
                            deleteRuleset(ruleset._id);
                            resolve(fetchRulesets())
                        }),
                }}
            />
        </div>
    )
};

const mapStateToProps = (state: RootState) => {
    return {
        rulesets: _.values(state.rulesets.items)
    }
}

export default connect(
    mapStateToProps,
    { fetchRulesets, addRuleset, deleteRuleset }
)(RulesetComponent);
