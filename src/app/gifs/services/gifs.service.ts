
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
    private _apiKey = 'gUfoKCTmLTgRs0hqvoaFmqT5Onz0dKG4'
    private _tagsHistory: string[] = []

    public constructor() { }

    public get tagsHistory() {
        return [...this._tagsHistory]
    }

    public searchTag(tag: string) {
        if (tag.length === 0) {
            return
        }
        this.organizeHistory(tag)
    }

    private organizeHistory(tag: string) {
        const limitOfTags = 10
        tag = tag.toLowerCase()
        
        if (this.tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter(e => e !== tag)
        }
        this._tagsHistory.unshift(tag)
        this._tagsHistory = this._tagsHistory.splice(0,limitOfTags)
    }
}