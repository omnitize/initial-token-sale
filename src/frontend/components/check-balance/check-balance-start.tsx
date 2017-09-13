import * as React from 'react';
import { ProveYouAreHuman} from '../../common/prove-you-are-human';
import { checkBalanceStartCaptchaSuccess } from '../../state/index';
import { State } from '../../models';

interface ICheckBalanceStartProps {
    state?: State
}

export class CheckBalanceStart extends React.Component<ICheckBalanceStartProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div className="its-content-section">
                <ProveYouAreHuman onSuccess={ CheckBalanceStart.handleCaptchaSuccess }/>
            </div>
        );
    }

    static handleCaptchaSuccess(sessionToken: string) {
        checkBalanceStartCaptchaSuccess(sessionToken);
    }
}
