import { Mutation, MutationAction, Action, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';

export enum StatusLevel {
    None,
    Info,
    Warning,
    Error,
}

export interface IAppState {
    status: IStatus;
}

export interface IStatus {
    level: StatusLevel;
    message: string;
}

@Module({ dynamic: true, store, name: 'app', namespaced: true})
class App extends VuexModule implements IAppState {
    public status: IStatus = {
        level: StatusLevel.None,
        message: '',
    };

    @Action
    public setStatus(status: IStatus): void {
        this.SET_STATUS(status);
        if (status.level !== StatusLevel.Error) {
            setTimeout(() => {
                this.resetStatus()
            }, 3000);
        }
    }

    @Action
    public resetStatus(): void {
        this.RESET_STATUS();
    }

    @Mutation
    private SET_STATUS(status: IStatus): void {
        this.status.level = status.level;
        this.status.message = status.message;
    }

    @Mutation
    private RESET_STATUS(): void {
        this.status.level = StatusLevel.None;
        this.status.message = '';
    }
}

export default getModule(App);
