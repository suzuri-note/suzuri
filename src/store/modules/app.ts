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
    timeoutID?: number;
}

export interface IStatusBar {
    hidden: boolean;
}

@Module({ dynamic: true, store, name: 'app', namespaced: true})
class App extends VuexModule implements IAppState {
    public status: IStatus = {
        level: StatusLevel.None,
        message: '',
        timeoutID: undefined,
    };
    public statusbar: IStatusBar = {
        hidden: true,
    };

    @Action
    public setStatus(status: IStatus): void {
        clearTimeout(this.status.timeoutID); // 自動非表示のためのタイマーを無効化

        this.SET_STATUS(status); // StatusBarに値が入る
        this.SHOW_STATUS_BAR(); // StatusBarが表示される

        if (status.level === StatusLevel.Info) {
            // 3秒後に自動非表示
            this.status.timeoutID = setTimeout(() => {
                this.resetStatus()
            }, 3000);
        }
    }

    @Action
    public resetStatus(): void {
        this.HIDE_STATUS_BAR(); // StatusBarが300ms秒かけて隠れる（ref. StatusBarのhidden class）
        setTimeout(()=> {
            this.RESET_STATUS(); // 300ms秒後にStatusBarから値が消える
        }, 300);
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
