
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
    private _tagsHistory: string[] = []

    public constructor() { }

    public get tagsHistory() {
        return [...this._tagsHistory]
    }

    public searchTag(tag: string) {
        this._tagsHistory.unshift(tag)
    }
}