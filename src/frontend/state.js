export var UserFlow;
(function (UserFlow) {
    UserFlow[UserFlow["CONTRIBUTE"] = 0] = "CONTRIBUTE";
    UserFlow[UserFlow["CHECK_BALANCE"] = 1] = "CHECK_BALANCE";
})(UserFlow || (UserFlow = {}));
;
export var TxStatus;
(function (TxStatus) {
    TxStatus[TxStatus["PENDING"] = 0] = "PENDING";
    TxStatus[TxStatus["VERIFIED"] = 1] = "VERIFIED";
    TxStatus[TxStatus["FINAL"] = 2] = "FINAL";
})(TxStatus || (TxStatus = {}));
;
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    return Transaction;
}());
export { Transaction };
var State = /** @class */ (function () {
    function State() {
    }
    return State;
}());
export { State };
;
export var state = new State();
//# sourceMappingURL=state.js.map