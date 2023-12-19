import { Gif } from './../interfaces/gifs.interfaces';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

    private _apiKey = 'gUfoKCTmLTgRs0hqvoaFmqT5Onz0dKG4'
    private _baseUrl = 'https://api.giphy.com/v1/gifs/'
    private _tagsHistory: string[] = []

    public gifsList: Gif[] = []
    public constructor(private _httpClient: HttpClient) { }

    public get tagsHistory() {
        return [...this._tagsHistory]
    }

    public searchTag(tag: string): void {
        if (tag.length === 0) {
            return
        }
        this.organizeHistory(tag)
        const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('q', tag)
            .set('limit', '10')
        this._httpClient.get<SearchResponse>(
            `${this._baseUrl}search`,
            { params, },)
            .subscribe(
                resp => this.gifsList = resp.data,
            )
    }

    private organizeHistory(tag: string) {
        const limitOfTags = 10
        tag = tag.toLowerCase()

        if (this.tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter(e => e !== tag)
        }
        this._tagsHistory.unshift(tag)
        this._tagsHistory = this._tagsHistory.splice(0, limitOfTags)
        this.saveInLocalStorage()
    }

    private saveInLocalStorage() {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }
}