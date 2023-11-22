import { Injectable } from "@angular/core";
import { SideBarData } from "../core/models/SideBarData";
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from "rxjs";

export interface SidebarState {
    FOREX: SideBarData[];
    STOCKS: SideBarData[];
    CRYPTOCURRENCY: SideBarData[];

}

@Injectable()
export class SymboleStore extends ComponentStore<SidebarState> {

    constructor(){
        super({FOREX : [],STOCKS : [], CRYPTOCURRENCY : []})
    }
    
    readonly stocks$: Observable<SideBarData[]> = this.select(state => state.STOCKS);
    readonly crypto$: Observable<SideBarData[]> = this.select(state => state.CRYPTOCURRENCY);
    readonly forex$: Observable<SideBarData[]> = this.select(state => state.FOREX);

    readonly updateState = this.updater((state, data : SidebarState) => data);
}