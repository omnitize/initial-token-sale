import * as React from 'react';
import { ProveYouAreHuman} from '../../../common/prove-you-are-human';
import { incrementStep, setState } from '../../../state';
import { State } from '../../../models';

interface IProps {
    state?: State
}

export class CheckBalanceStart extends React.Component<IProps, any> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <div>
                <ProveYouAreHuman onSuccess={ CheckBalanceStart.onCaptchaSuccess }/>
            </div>
        );
    }

    static onCaptchaSuccess(sessionToken: string) {
        setState( { sessionToken });
        incrementStep();
    }
}
