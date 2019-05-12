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
    statusbar: IStatusBar;
}

export interface IStatus {
    level: StatusLevel;
    message: string;
}

export interface IStatusBar {
    hidden: boolean;
}

@Module({ dynamic: true, store, name: 'app', namespaced: true})
class App extends VuexModule implements IAppState {
    public status: IStatus = {
        level: StatusLevel.None,
        message: '',
    };
    public statusbar: IStatusBar = {
        hidden: false,
    };

    @Action
    public setStatus(status: IStatus): void {
        this.SET_STATUS(status);
        setTimeout(() => {
            this.showStatusBar();
        }, 300);
        this.showStatusBar();
        switch (status.level) {
            case StatusLevel.Info:
                setTimeout(() => {
                    this.resetStatus()
                }, 3000);
                break;
            case StatusLevel.Warning:
                setTimeout(() => {
                    this.resetStatus()
                }, 5000);
                break;
            case StatusLevel.Error:
            default:
                break;
        }
    }

    @Action
    public resetStatus(): void {
        this.hideStatusBar();
        setTimeout(() => {
            this.RESET_STATUS();
        }, 300);
    }

    @Action
    public showStatusBar(): void {
        this.SHOW_STATUS_BAR();
    }

    @Action
    public hideStatusBar(): void {
        this.HIDE_STATUS_BAR();
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

    @Mutation
    private SHOW_STATUS_BAR(): void {
        this.statusbar.hidden = false;
    }

    @Mutation
    private HIDE_STATUS_BAR(): void {
        this.statusbar.hidden = true;
    }
}

export default getModule(App);
