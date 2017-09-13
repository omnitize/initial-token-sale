import * as React from 'react';
import { ETxStatus } from '../../models';

export getTxStatusIcon(status: ETxStatus, confirmations: number): JSX.Element {
	switch(status) {
		case ETxStatus.PENDING:
			return (
			);
		case ETxStatus.CONFIRMED:
			return (
			);
		case ETxStatus.PAID:
			return (
			);
	}
}
